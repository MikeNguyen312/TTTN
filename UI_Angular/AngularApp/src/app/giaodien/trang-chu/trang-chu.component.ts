import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { KhuyenmaiService } from '../../services/khuyenmai.service';

@Component({
  selector: 'app-trang-chu',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  selectedSortOption: string = '';
  sanPhams: any[] = [];
  giayNam: any[] = [];
  giayNu: any[] = [];
  searchQuery: string = '';
  
  // Khuyến mãi
  danhSachKhuyenMai: any[] = [];
  selectedKhuyenMai: string = '';
  sanPhamKhuyenMai: any[] = [];
  isLoading: boolean = true;
  
  constructor(
    private sanphamService: ProductService,
    private router: Router,
    private cartService: CartService,
    private route: ActivatedRoute,
    private khuyenmaiService: KhuyenmaiService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['search'] || '';
      this.searchQuery = searchTerm; 
      this.loadSanPhamsAndKhuyenMai(searchTerm);
    });
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

  sortProducts(): void {
    switch (this.selectedSortOption) {
      case 'price-asc':
        this.sanPhams.sort((a, b) => a.gia - b.gia);
        this.giayNam.sort((a, b) => a.gia - b.gia);
        this.giayNu.sort((a, b) => a.gia - b.gia);
        break;
      case 'price-desc':
        this.sanPhams.sort((a, b) => b.gia - a.gia);
        this.giayNam.sort((a, b) => b.gia - a.gia);
        this.giayNu.sort((a, b) => b.gia - a.gia);
        break;
      case 'name-asc':
        this.sanPhams.sort((a, b) => a.ten.localeCompare(b.ten));
        this.giayNam.sort((a, b) => a.ten.localeCompare(b.ten));
        this.giayNu.sort((a, b) => a.ten.localeCompare(b.ten));
        break;
      case 'name-desc':
        this.sanPhams.sort((a, b) => b.ten.localeCompare(a.ten));
        this.giayNam.sort((a, b) => b.ten.localeCompare(a.ten));
        this.giayNu.sort((a, b) => b.ten.localeCompare(a.ten));
        break;
      case 'discount-desc':
        this.sanPhams.sort((a, b) => (b.phanTramGiam || 0) - (a.phanTramGiam || 0));
        this.giayNam.sort((a, b) => (b.phanTramGiam || 0) - (a.phanTramGiam || 0));
        this.giayNu.sort((a, b) => (b.phanTramGiam || 0) - (a.phanTramGiam || 0));
        break;
      default:
        this.loadSanPhamsAndKhuyenMai(this.searchQuery);
    }
  }

  loadSanPhamsAndKhuyenMai(searchTerm: string = ''): void {
    this.isLoading = true;
    this.sanphamService.getSanPhams().subscribe({
      next: (data) => {
        console.log('Dữ liệu sản phẩm: ', data);
        const allSanPhams = Array.isArray(data) ? data : [];
        
        let filteredSanPhams = allSanPhams;
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filteredSanPhams = allSanPhams.filter((sp: any) =>
            sp.ten.toLowerCase().includes(term)
          );
        }
        
        this.sanPhams = filteredSanPhams.map((sp: any) => ({
          ...sp,
          soLuongTon: sp.soLuong || 0,
        }));
        
        this.khuyenmaiService.getDSKhuyenMai().subscribe({
          next: (khuyenMaiData) => {
            this.danhSachKhuyenMai = Array.isArray(khuyenMaiData) ? khuyenMaiData : [];
            this.loadSanPhamsKhuyenMai();
          },
          error: (err) => {
            console.error('Lỗi khi tải danh sách khuyến mãi:', err);
            this.isLoading = false;
            this.setupInitialProducts();
          },
        });
      },
      error: (err) => {
        console.error('Lỗi khi tải danh sách sản phẩm:', err);
        this.isLoading = false;
      },
    });
  }
  
  loadSanPhamsKhuyenMai(): void {
    if (this.selectedKhuyenMai) {
      this.khuyenmaiService.getSanPhamKhuyenMai(this.selectedKhuyenMai).subscribe({
        next: (data) => {
          this.sanPhamKhuyenMai = Array.isArray(data) ? data : [];
          this.processSanPhamKhuyenMai();
        },
        error: (err) => {
          console.error('Lỗi khi tải sản phẩm khuyến mãi theo ID:', err);
          this.sanPhamKhuyenMai = [];
          this.processSanPhamKhuyenMai();
        },
      });
    } else {
      this.khuyenmaiService.getAllSanPhamKhuyenMai().subscribe({
        next: (data) => {
          this.sanPhamKhuyenMai = Array.isArray(data) ? data : [];
          this.processSanPhamKhuyenMai();
        },
        error: (err) => {
          console.error('Lỗi khi tải tất cả sản phẩm khuyến mãi:', err);
          this.sanPhamKhuyenMai = [];
          this.processSanPhamKhuyenMai();
        },
      });
    }
  }
  
  processSanPhamKhuyenMai(): void {
    const allSanPhamWithKhuyenMai = this.sanPhamKhuyenMai.map((kmSp) => {
      const fullSanPham = this.sanPhams.find((sp) => sp.idSanPham === kmSp.idSanPham);
      if (fullSanPham) {
        const phanTramGiam = kmSp.phanTramGiam || kmSp.khuyenMai?.phanTramKm || 0;
        return {
          ...fullSanPham,
          phanTramGiam: phanTramGiam,
          giaGoc: this.getGiaGoc(fullSanPham.gia || 0, phanTramGiam),
          gia: fullSanPham.gia,
          // * (1 - phanTramGiam / 100)
          soLuongTon: fullSanPham.soLuong || 0,
        };
      }
      return null;
    }).filter(Boolean);

    const khuyenMaiIds = allSanPhamWithKhuyenMai.map(sp => sp.idSanPham);
    
    const sanPhamWithoutKhuyenMai = this.sanPhams.filter(
      (sp) => !khuyenMaiIds.includes(sp.idSanPham)
    );
    
    this.sanPhams = [...allSanPhamWithKhuyenMai, ...sanPhamWithoutKhuyenMai];
    
    this.giayNam = this.sanPhams.filter((sp) => sp.loai === 'Nam');
    this.giayNu = this.sanPhams.filter((sp) => sp.loai === 'Nữ');
    
    if (this.selectedSortOption) {
      this.sortProducts();
    }
    
    this.isLoading = false;
  }
  
  setupInitialProducts(): void {
    this.giayNam = this.sanPhams.filter((sp) => sp.loai === 'Nam');
    this.giayNu = this.sanPhams.filter((sp) => sp.loai === 'Nữ');
  }
  
  getGiaGoc(gia: number, phanTramGiam: number): number {
    if (!phanTramGiam || phanTramGiam <= 0) return gia;
    return Math.round(gia / (1 - phanTramGiam / 100));
  }

  getDiscount(sp: any): number {
    return sp.phanTramGiam || sp.khuyenMai?.phanTramKm || 0;
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