import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-giaynu',
  imports: [CommonModule,FormsModule],
  templateUrl: './giaynu.component.html',
  styleUrl: './giaynu.component.css',
})
export class GiaynuComponent {
  sanPhams: any[] = [];
  giayNu: any[] = [];selectedSortOption: string = '';
  constructor(private sanphamService: ProductService, private router: Router) {}
  ngOnInit(): void {
    this.loadSanPhams();
  }

  sortProducts(): void {
    switch(this.selectedSortOption) {
      case 'price-asc':
        this.giayNu.sort((a, b) => a.gia - b.gia);
        break;
      case 'price-desc':
        this.giayNu.sort((a, b) => b.gia - a.gia);
        break;
      case 'name-asc':
        this.giayNu.sort((a, b) => a.ten.localeCompare(b.ten));
        break;
      case 'name-desc':
        this.giayNu.sort((a, b) => b.ten.localeCompare(a.ten));
        break;
      default:
        this.loadSanPhams();
    }
  }

  loadSanPhams(): void {
    this.sanphamService.getSanPhams().subscribe({
      next: (data) => {
        console.log('Fetched data:', data);
        this.sanPhams = Array.isArray(data) ? data : [];
        

        this.giayNu = this.sanPhams
          .filter((sp) => sp.loai === 'Nữ')
          .map((sp) => ({
            ...sp,
            soLuongTon: sp.soLuong || 0,
          }));
      },
      error: (err) => {
        console.error('Error fetching SanPhams:', err);
      },
    });
  }
  viewProductDetail(productId: string): void {
    this.router.navigate(['/chi-tiet-san-pham', productId]);
  }
}
