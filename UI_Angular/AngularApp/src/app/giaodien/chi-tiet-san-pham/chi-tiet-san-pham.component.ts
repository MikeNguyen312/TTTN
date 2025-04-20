import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SanPhamService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-chi-tiet-san-pham',
  imports: [CommonModule],
  templateUrl: './chi-tiet-san-pham.component.html',
  styleUrl: './chi-tiet-san-pham.component.css'
})
export class ChiTietSanPhamComponent implements OnInit{
  product: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private sanphamService: SanPhamService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.sanphamService.getSanPhamById(productId).subscribe({
        next: (data) => {
          this.product = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching product:', err);
          this.loading = false;
        }
      });
    }
  }
}
