import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { KhuyenmaiService } from '../../services/khuyenmai.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-giaynam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './giaynam.component.html',
  styleUrls: ['./giaynam.component.css'],
})
export class GiayNamComponent implements OnInit {
  sanPhams: any[] = [];
  giayNam: any[] = [];
  selectedSortOption: string = '';
  danhSachKhuyenMai: any[] = [];
  selectedKhuyenMai: string = '';
  sanPhamKhuyenMai: any[] = [];
  isLoading: boolean = true;
  searchQuery: string = '';
  
  constructor(
    private sanphamService: ProductService,
    private router: Router,
    private cartService: CartService,
    private route: ActivatedRoute,
    private khuyenmaiService: KhuyenmaiService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.loadSanPhamsAndKhuyenMai();
    });
  }

  loadSanPhamsAndKhuyenMai(): void {
    this.isLoading = true;
    this.sanphamService.getSanPhams().subscribe({
      next: (data) => {
        this.sanPhams = Array.isArray(data) ? data : [];

        // Lọc sản phẩm Nam (không áp dụng tìm kiếm ở đây)
        const allGiayNam = this.sanPhams
          .filter((sp) => sp.loai === 'Nam')
          .map((sp) => ({
            ...sp,
            soLuongTon: sp.soLuong || 0,
          }));

        this.khuyenmaiService.getDSKhuyenMai().subscribe({
          next: (khuyenMaiData) => {
            this.danhSachKhuyenMai = Array.isArray(khuyenMaiData) ? khuyenMaiData : [];
            this.loadSanPhamsKhuyenMai();
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Lỗi khi tải danh sách khuyến mãi:', err);
            this.isLoading = false;
          },
        });
      },
      error: (err) => {
        console.error('Lỗi khi tải SanPhams:', err);
        this.isLoading = false;
      },
    });
  }

  loadSanPhamsKhuyenMai(): void {
    this.isLoading = true;
    if (this.selectedKhuyenMai) {
      this.khuyenmaiService.getSanPhamKhuyenMai(this.selectedKhuyenMai).subscribe({
        next: (data) => {
          this.sanPhamKhuyenMai = Array.isArray(data) ? data : [];
          this.filterAndMapSanPhamKhuyenMai();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Lỗi khi tải sản phẩm khuyến mãi theo ID:', err);
          this.sanPhamKhuyenMai = [];
          this.filterAndMapSanPhamKhuyenMai();
          this.isLoading = false;
        },
      });
    } else {
      this.khuyenmaiService.getAllSanPhamKhuyenMai().subscribe({
        next: (data) => {
          this.sanPhamKhuyenMai = Array.isArray(data) ? data : [];
          this.filterAndMapSanPhamKhuyenMai();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Lỗi khi tải tất cả sản phẩm khuyến mãi:', err);
          this.sanPhamKhuyenMai = [];
          this.filterAndMapSanPhamKhuyenMai();
          this.isLoading = false;
        },
      });
    }
  }

  filterAndMapSanPhamKhuyenMai(): void {
    // Lọc các sản phẩm khuyến mãi thuộc loại Nam
    const sanPhamKhuyenMaiNam = this.sanPhamKhuyenMai.filter((sp) => {
      const fullSanPham = this.sanPhams.find((allSp) => allSp.idSanPham === sp.idSanPham);
      // Kiểm tra xem sản phẩm có thuộc loại Nam không
      return fullSanPham && fullSanPham.loai === 'Nam';
    }).map((sp) => {
      const fullSanPham = this.sanPhams.find((allSp) => allSp.idSanPham === sp.idSanPham);
      return {
        ...fullSanPham,
        phanTramGiam: sp.phanTramGiam || sp.khuyenMai?.phanTramKm || 0,
        giaGoc: this.getGiaGoc(fullSanPham?.gia || 0, sp.phanTramGiam || sp.khuyenMai?.phanTramKm || 0),
        gia: fullSanPham?.gia * (1 - (sp.phanTramGiam || sp.khuyenMai?.phanTramKm || 0) / 100),
        soLuongTon: fullSanPham?.soLuong || 0,
        hasDiscount: true, // Thêm flag để kiểm tra sản phẩm có khuyến mãi
      };
    });

    // Lấy danh sách sản phẩm giày nam thông thường (không có trong khuyến mãi)
    const sanPhamThongThuongNam = this.sanPhams
      .filter((sp) => sp.loai === 'Nam' && !sanPhamKhuyenMaiNam.some(kmSp => kmSp.idSanPham === sp.idSanPham))
      .map(sp => ({
        ...sp,
        soLuongTon: sp.soLuong || 0,
        hasDiscount: false, // Thêm flag để kiểm tra sản phẩm không có khuyến mãi
      }));

    // Kết hợp tất cả sản phẩm (khuyến mãi và thông thường)
    const allGiayNam = [...sanPhamKhuyenMaiNam, ...sanPhamThongThuongNam];
    
    // Lọc theo tìm kiếm - áp dụng cho CẢ sản phẩm khuyến mãi và thông thường
    this.giayNam = allGiayNam.filter(sp => 
      sp.ten.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    this.sortProducts(); // Sắp xếp sau khi lọc
  }

  getGiaGoc(gia: number, phanTramGiam: number): number {
    if (!phanTramGiam || phanTramGiam <= 0) return gia;
    return Math.round(gia / (1 - phanTramGiam / 100));
  }

  getDiscount(sp: any): number {
    return sp.phanTramGiam || sp.khuyenMai?.phanTramKm || 0;
  }

  // Kiểm tra sản phẩm có khuyến mãi không
  hasDiscount(sp: any): boolean {
    return sp.hasDiscount || this.getDiscount(sp) > 0;
  }

  sortProducts(): void {
    switch (this.selectedSortOption) {
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
      case 'discount-desc':
        this.giayNam.sort((a, b) => (b.phanTramGiam || 0) - (a.phanTramGiam || 0));
        break;
    }
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