import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-giaynam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './giaynam.component.html',
  styleUrls: ['./giaynam.component.css'],
})
export class GiaynamComponent {
  constructor(private sanphamService: ProductService, private router: Router,private cartService: CartService) {}

  sanPhams: any[] = [];
  giayNam: any[] = [];
  selectedSortOption: string = '';

  ngOnInit(): void {
    this.loadSanPhams();
  }

  loadSanPhams(): void {
    this.sanphamService.getSanPhams().subscribe({
      next: (data) => {
        console.log('Fetched data:', data);
        this.sanPhams = Array.isArray(data) ? data : [];

        this.giayNam = this.sanPhams
          .filter((sp) => sp.loai === 'Nam')
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

  sortProducts(): void {
    switch(this.selectedSortOption) {
      case 'price-asc':
        this.giayNam.sort((a, b) => a.gia - b.gia);
        break;
      case 'price-desc':
        this.giayNam.sort((a, b) => b.gia - a.gia);
        break;
      case 'name-asc':
        this.giayNam.sort((a, b) => a.ten.localeCompare(b.ten));
        break;
      case 'name-desc':
        this.giayNam.sort((a, b) => b.ten.localeCompare(a.ten));
        break;
      default:
        this.loadSanPhams();
    }
  }

  
  addToCart(sp: any): void {
    this.cartService.addToCart({
      id: sp.idSanPham,              
      image: 'data:image/jpeg;base64,' + sp.anh,
      name: sp.ten,
      price: sp.gia,
      quantity: 1
    });
  }
  
  viewProductDetail(productId: string): void {
    this.router.navigate(['/chi-tiet-san-pham', productId]);
  }
}