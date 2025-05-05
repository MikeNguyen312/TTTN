import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service'; 
import { CommonModule } from '@angular/common';
import { KhuyenmaiService } from '../../services/khuyenmai.service';

@Component({
  selector: 'app-chi-tiet-san-pham',
  standalone: true, // Add standalone property
  imports: [CommonModule],
  templateUrl: './chi-tiet-san-pham.component.html',
  styleUrls: ['./chi-tiet-san-pham.component.css']
})
export class ChiTietSanPhamComponent implements OnInit {
  product: any;
  loading = true;
  phanTramGiam = 0;
  giaGoc: number = 0;
  soLuongTon: number = 0;
  
  // Manage selected options
  selectedSize: number | null = null;
  selectedColor: string | null = null;
  
  // Available options
  availableSizes = [38, 39, 40, 41, 42];
  availableColors = [
    { name: 'Beige', code: '#c2b49a' },
    { name: 'Black', code: '#000000' },
    { name: 'Blue', code: '#3a5ba0' },
    { name: 'Yellow', code: '#eacb53' }
  ];

  constructor(
    private route: ActivatedRoute,
    private sanphamService: ProductService,
    private cartService: CartService,
    private khuyenmaiService: KhuyenmaiService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProductWithPromotion(productId);
    }
  }
  
  selectSize(size: number): void {
    this.selectedSize = this.selectedSize === size ? null : size;
  }
  
  selectColor(colorCode: string): void {
    this.selectedColor = this.selectedColor === colorCode ? null : colorCode;
  }
  
  loadProductWithPromotion(productId: string): void {
    // First load the product details
    this.sanphamService.getSanPhamById(productId).subscribe({
      next: (data) => {
        this.product = data;
        
        // Store the stock quantity
        this.soLuongTon = this.product.soLuong || 0;
        
        // Then check if this product has any promotions
        this.khuyenmaiService.getAllSanPhamKhuyenMai().subscribe({
          next: (kmData) => {
            // Find if this product is in any promotion
            const productPromotion = Array.isArray(kmData) ? 
              kmData.find(km => km.idSanPham === productId) : null;
            
            if (productPromotion) {
              // Get discount percentage from promotion
              this.phanTramGiam = productPromotion.phanTramGiam || 
                                  (productPromotion.khuyenMai ? productPromotion.khuyenMai.phanTramKm : 0);
              
              if (this.phanTramGiam > 0) {
                // Calculate original price (before discount)
                this.giaGoc = this.getGiaGoc(this.product.gia, this.phanTramGiam);
              }
            }
            
            this.loading = false;
          },
          error: (err) => {
            console.error('Error fetching promotions:', err);
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error fetching product:', err);
        this.loading = false;
      }
    });
  }

  getGiaGoc(gia: number, phanTramGiam: number): number {
    if (!phanTramGiam || phanTramGiam <= 0) return gia;
    return Math.round(gia / (1 - phanTramGiam / 100));
  }

  addToCart(): void {
    if (this.product && this.soLuongTon > 0) {
      // Check if size and color are selected
      if (!this.selectedSize || !this.selectedColor) {
        console.log('Vui lòng chọn kích thước và màu sắc');
        return;
      }
      
      this.cartService.addToCart({
        id: this.product.idSanPham, 
        image: 'data:image/jpeg;base64,' + this.product.anh,
        name: this.product.ten,
        price: this.product.gia,
        quantity: 1,
      });
      console.log('Sản phẩm đã được thêm vào giỏ hàng');
    } else {
      console.log('Sản phẩm hết hàng');
    }
  }
}