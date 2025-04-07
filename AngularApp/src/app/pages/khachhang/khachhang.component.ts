import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { KhachhangService } from '../../services/khachhang.service';

@Component({
  selector: 'app-khachhang',
  imports: [CommonModule],
  templateUrl: './khachhang.component.html',
  styleUrl: './khachhang.component.css'
})
export class KhachhangComponent {
 khachHangs: any[] = [];

  // Inject the service in the constructor
  constructor(private KhachhangService: KhachhangService) {}

  ngOnInit(): void {
    // Load products when the component initializes
    this.loadKhachHang();
  }

  loadKhachHang(): void {
    this.KhachhangService.getKhachHangs().subscribe({
      next: (data) => {
        console.log('Fetched data:', data); 
        this.khachHangs = Array.isArray(data) ? data : []; // Ensure data is an array
      },
      error: (err) => {
        console.error('Error fetching KhachHangs:', err);
      }
    });
  }
}
