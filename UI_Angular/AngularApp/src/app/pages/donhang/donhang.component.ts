import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DonhangService } from '../../services/donhang.service';

@Component({
  selector: 'app-donhang',
  imports: [CommonModule],
  templateUrl: './donhang.component.html',
  styleUrl: './donhang.component.css'
})
export class DonhangComponent {
donHangs: any[] = [];

  // Inject the service in the constructor
  constructor(private donhangService: DonhangService) {}

  ngOnInit(): void {
    // Load products when the component initializes
    this.loadDonHang();
  }

  loadDonHang(): void {
    this.donhangService.getDonHangs().subscribe({
      next: (data) => {
        console.log('Fetched data:', data); 
        this.donHangs = Array.isArray(data) ? data : []; // Ensure data is an array
      },
      error: (err) => {
        console.error('Error fetching DonHang:', err);
      }
    });
  }
}
