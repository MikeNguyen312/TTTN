import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service'; // Adjust the path if needed

@Component({
  selector: 'app-product',
  standalone: true,  // Mark as standalone component
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],  // Fixed typo from styleUrl to styleUrls
})
export class ProductComponent implements OnInit {
  sanPhams: any[] = [];

  // Inject the service in the constructor
  constructor(private sanphamService: ProductService) {}

  ngOnInit(): void {
    // Load products when the component initializes
    this.loadSanPhams();
  }

  loadSanPhams(): void {
    this.sanphamService.getSanPhams().subscribe({
      next: (data) => {
        console.log('Fetched data:', data); 
        this.sanPhams = Array.isArray(data) ? data : []; // Ensure data is an array
      },
      error: (err) => {
        console.error('Error fetching SanPhams:', err);
      }
    });
  }
}
