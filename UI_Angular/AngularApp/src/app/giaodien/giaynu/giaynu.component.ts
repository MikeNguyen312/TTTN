import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { KhuyenmaiService } from '../../services/khuyenmai.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-giaynu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './giaynu.component.html',
  styleUrls: ['./giaynu.component.css'],
})
export class GiaynuComponent implements OnInit {
  sanPhams: any[] = [];
  giayNu: any[] = [];
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

        // Lọc sản phẩm Nữ và theo từ khóa tìm kiếm
        this.giayNu = this.sanPhams
          .filter((sp) => sp.loai === 'Nữ')
          .filter((sp) =>
            sp.ten.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
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
    const sanPhamKhuyenMaiNu = this.sanPhamKhuyenMai.filter((sp) =>
      this.sanPhams.some((allSp) => allSp.idSanPham === sp.idSanPham && allSp.loai === 'Nữ')
    ).map((sp) => {
      const fullSanPham = this.sanPhams.find((allSp) => allSp.idSanPham === sp.idSanPham);
      return {
        ...fullSanPham,
        phanTramGiam: sp.phanTramGiam || sp.khuyenMai?.phanTramKm || 0,
        giaGoc: this.getGiaGoc(fullSanPham?.gia || 0, sp.phanTramGiam || sp.khuyenMai?.phanTramKm || 0),
        gia: fullSanPham?.gia,
        //  * (1 - (sp.phanTramGiam || sp.khuyenMai?.phanTramKm || 0) / 100)
        soLuongTon: fullSanPham?.soLuong || 0,
      };
    });

    // Lấy danh sách sản phẩm giày nữ thông thường (không có trong khuyến mãi)
    const sanPhamThongThuongNu = this.sanPhams
      .filter((sp) => sp.loai === 'Nữ' && !sanPhamKhuyenMaiNu.some(kmSp => kmSp.idSanPham === sp.idSanPham))
      .filter((sp) => sp.ten.toLowerCase().includes(this.searchQuery.toLowerCase()))
      .map(sp => ({
        ...sp,
        soLuongTon: sp.soLuong || 0,
      }));

    // Kết hợp cả sản phẩm khuyến mãi và sản phẩm thông thường vào giayNu
    this.giayNu = [...sanPhamKhuyenMaiNu, ...sanPhamThongThuongNu];
    this.sortProducts(); // Gọi lại sắp xếp sau khi kết hợp
  }

  getGiaGoc(gia: number, phanTramGiam: number): number {
    if (!phanTramGiam || phanTramGiam <= 0) return gia;
    return Math.round(gia / (1 - phanTramGiam / 100));
  }

  getDiscount(sp: any): number {
    return sp.phanTramGiam || sp.khuyenMai?.phanTramKm || 0;
  }

  sortProducts(): void {
    switch (this.selectedSortOption) {
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
      case 'discount-desc':
        this.giayNu.sort((a, b) => (b.phanTramGiam || 0) - (a.phanTramGiam || 0));
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