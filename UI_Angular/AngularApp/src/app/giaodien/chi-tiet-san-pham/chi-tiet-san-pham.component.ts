import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chi-tiet-san-pham',
  imports: [CommonModule],
  templateUrl: './chi-tiet-san-pham.component.html',
  styleUrls: ['./chi-tiet-san-pham.component.css']
})
export class ChiTietSanPhamComponent implements OnInit {
  product: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private sanphamService: ProductService,
    private cartService: CartService 
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

  addToCart(): void {
    if (this.product && this.product.soLuongTon > 0) {
      this.cartService.addToCart({
        id: this.product.idSanPham, 
        image: 'data:image/jpeg;base64,' + this.product.anh,
        name: this.product.ten,
        price: this.product.gia,
        quantity: 1  
      });
      console.log('Sản phẩm đã được thêm vào giỏ hàng');
    } else {
      console.log('Sản phẩm hết hàng');
    }
  }
}
