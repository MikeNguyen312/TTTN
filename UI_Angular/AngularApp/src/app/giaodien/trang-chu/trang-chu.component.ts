import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-trang-chu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trang-chu.component.html',
  styleUrls: ['./trang-chu.component.css'],
})
export class TrangChuComponent implements OnInit, OnDestroy {
  slides = [
    {
      image: 'assets/slide/anh1.jpg',
      subtitle: 'Sneaker Collection',
      title: 'GOOD SHOES TAKE YOU GOOD PLACES',
      buttonText: 'Shop Now',
    },
    {
      image: 'assets/slide/anh2.jpg',
      subtitle: 'New Arrivals',
      title: 'STEP INTO STYLE',
      buttonText: 'Explore Now',
    },
    {
      image: 'assets/slide/anh3.jpg',
      subtitle: 'Limited Edition',
      title: 'GRAB YOURS TODAY',
      buttonText: 'Buy Now',
    },
  ];

  currentSlide = 0;
  slideInterval: any;

  sanPhams: any[] = [];
  giayNam: any[] = [];
  giayNu: any[] = [];

  constructor(
    private sanphamService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadSanPhams();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  prevSlide(): void {
    this.currentSlide =
      this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  nextSlide(): void {
    this.currentSlide =
      this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  startAutoSlide(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  stopAutoSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  loadSanPhams(): void {
    this.sanphamService.getSanPhams().subscribe({
      next: (data) => {
        this.sanPhams = Array.isArray(data) ? data : [];
        this.giayNam = this.sanPhams
          .filter((sp) => sp.loai === 'Nam')
          .map((sp) => ({
            ...sp,
            soLuongTon: sp.soLuong || 0,
            hetHang: (sp.soLuong || 0) <= 0,
          }));

        this.giayNu = this.sanPhams
          .filter((sp) => sp.loai === 'Nữ')
          .map((sp) => ({
            ...sp,
            soLuongTon: sp.soLuong || 0,
            hetHang: (sp.soLuong || 0) <= 0,
          }));
      },
      error: (err) => {
        console.error('Lỗi khi tải danh sách sản phẩm:', err);
      },
    });
  }

  addToCart(sp: any): void {
    this.cartService.addToCart({
      id: sp.idSanPham,
      image: 'data:image/jpeg;base64,' + sp.anh,
      name: sp.ten,
      price: sp.gia,
      quantity: 1,
    });
  }

  viewProductDetail(productId: string): void {
    this.router.navigate(['/chi-tiet-san-pham', productId]);
  }
}
