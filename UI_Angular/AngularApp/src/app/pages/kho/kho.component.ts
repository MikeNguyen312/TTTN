import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { KhoService } from '../../services/kho.service';

@Component({
  selector: 'app-kho',
  imports: [CommonModule],
  templateUrl: './kho.component.html',
  styleUrl: './kho.component.css'
})
export class KhoComponent {
  phieuKhos: any[] = [];
  
    // Inject the service in the constructor
    constructor(private phieuKhoService: KhoService) {}
  
    ngOnInit(): void {
      // Load products when the component initializes
      this.loadPhieuKho();
    }
  
    loadPhieuKho(): void {
      this.phieuKhoService.getPhieuKho().subscribe({
        next: (data) => {
          console.log('Fetched data:', data); 
          this.phieuKhos = Array.isArray(data) ? data : []; // Ensure data is an array
        },
        error: (err) => {
          console.error('Error fetching PhieuKho:', err);
        }
      });
    }
}
