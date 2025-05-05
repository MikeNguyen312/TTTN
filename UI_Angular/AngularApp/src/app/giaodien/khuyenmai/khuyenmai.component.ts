import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { KhuyenmaiService } from '../../services/khuyenmai.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-khuyenmai',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './khuyenmai.component.html',
  styleUrls: ['./khuyenmai.component.css'],
})
export class KhuyenmaiComponent implements OnInit {
  danhSachKhuyenMai: any[] = [];
  sanPhamKhuyenMai: any[] = [];
  filteredSanPhamKhuyenMai: any[] = []; // Add filtered products array
  selectedKhuyenMai: string = '';
  selectedSortOption: string = '';
  isLoading: boolean = false;
  searchQuery: string = '';

  constructor(
    private khuyenMaiService: KhuyenmaiService,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute // Add ActivatedRoute for query params
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    
    // Subscribe to query params to get search value
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.loadKhuyenMai();
      this.loadAllSanPhamKhuyenMai();
    });
  }

  loadKhuyenMai(): void {
    this.khuyenMaiService.getDSKhuyenMai().subscribe({
      next: (data) => {
        console.log('Fetched promotions:', data);
        this.danhSachKhuyenMai = Array.isArray(data) ? data : [];
      },
      error: (err) => {
        console.error('Error fetching promotions:', err);
      },
    });
  }

  loadAllSanPhamKhuyenMai(): void {
    this.isLoading = true;
    this.khuyenMaiService.getAllSanPhamKhuyenMai().subscribe({
      next: (data) => {
        console.log('Fetched all promotion products:', data);
        if (Array.isArray(data)) {
          this.sanPhamKhuyenMai = data.map(product => ({
            ...product,
            giaGoc: this.calculateOriginalPrice(product.gia, product.khuyenMai.phanTramKm)
          }));
          
          if (this.sanPhamKhuyenMai.length > 0) {
            const productPromises = this.sanPhamKhuyenMai.map((sp, index) => 
              new Promise<void>((resolve) => {
                this.productService.getSanPhamById(sp.idSanPham).subscribe({
                  next: (productDetail) => {
                    if (productDetail) {
                      this.sanPhamKhuyenMai[index] = {
                        ...this.sanPhamKhuyenMai[index],
                        anh: productDetail.anh,
                        soLuongTon: productDetail.soLuong || 0
                      };
                    }
                    resolve();
                  },
                  error: () => resolve()
                });
              })
            );
            
            Promise.all(productPromises).then(() => {
              this.applyFilters(); // Apply filters after loading products
              this.isLoading = false;
            });
            
          } else {
            this.applyFilters(); // Apply filters even if no products
            this.isLoading = false;
          }
        } else {
          this.sanPhamKhuyenMai = [];
          this.applyFilters();
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Error fetching all promotion products:', err);
        this.sanPhamKhuyenMai = [];
        this.applyFilters();
        this.isLoading = false;
      }
    });
  }

  loadSanPhamsKhuyenMai(): void {
    this.isLoading = true;
    if (!this.selectedKhuyenMai) {
      this.loadAllSanPhamKhuyenMai();
      return;
    }

    this.khuyenMaiService.getSanPhamKhuyenMai(this.selectedKhuyenMai).subscribe({
      next: (data) => {
        console.log('Fetched promotion products:', data);
        if (Array.isArray(data)) {
          const selectedPromo = this.danhSachKhuyenMai.find(km => km.idkhuyenmai === this.selectedKhuyenMai);
          const phanTram = selectedPromo ? selectedPromo.phanTram : 0;
          
          this.sanPhamKhuyenMai = data.map(product => ({
            ...product,
            khuyenMai: {
              idKhuyenMai: this.selectedKhuyenMai,
              phanTramKm: phanTram
            },
            giaGoc: this.calculateOriginalPrice(product.gia, phanTram)
          }));
          
          if (this.sanPhamKhuyenMai.length > 0) {
            const productPromises = this.sanPhamKhuyenMai.map((sp, index) => 
              new Promise<void>((resolve) => {
                this.productService.getSanPhamById(sp.idSanPham).subscribe({
                  next: (productDetail) => {
                    if (productDetail) {
                      this.sanPhamKhuyenMai[index] = {
                        ...this.sanPhamKhuyenMai[index],
                        anh: productDetail.anh,
                        soLuongTon: productDetail.soLuong || 0
                      };
                    }
                    resolve();
                  },
                  error: () => resolve()
                });
              })
            );
            
            Promise.all(productPromises).then(() => {
              this.applyFilters(); // Apply filters after loading products
              this.isLoading = false;
            });
            
          } else {
            this.applyFilters(); // Apply filters even if no products
            this.isLoading = false;
          }
        } else {
          this.sanPhamKhuyenMai = [];
          this.applyFilters();
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Error fetching promotion products:', err);
        this.sanPhamKhuyenMai = [];
        this.applyFilters();
        this.isLoading = false;
      },
    });
  }

  applyFilters(): void {
    // Filter products by search query
    if (this.searchQuery) {
      this.filteredSanPhamKhuyenMai = this.sanPhamKhuyenMai.filter(product => 
        product.ten.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredSanPhamKhuyenMai = [...this.sanPhamKhuyenMai];
    }

    // Apply sorting
    if (this.selectedSortOption) {
      this.sortProducts();
    }
  }

  search(): void {
    this.applyFilters();
  }

  calculateOriginalPrice(currentPrice: number, discountPercent: number): number {
    if (!currentPrice || !discountPercent) return currentPrice;
    return Math.round(currentPrice / (1 - (discountPercent / 100)));
  }

  getDiscount(product: any): number {
    return product.khuyenMai?.phanTramKm || 0;
  }

  sortProducts(): void {
    switch(this.selectedSortOption) {
      case 'price-asc':
        this.filteredSanPhamKhuyenMai.sort((a, b) => a.gia - b.gia);
        break;
      case 'price-desc':
        this.filteredSanPhamKhuyenMai.sort((a, b) => b.gia - a.gia);
        break;
      case 'name-asc':
        this.filteredSanPhamKhuyenMai.sort((a, b) => a.ten.localeCompare(b.ten));
        break;
      case 'name-desc':
        this.filteredSanPhamKhuyenMai.sort((a, b) => b.ten.localeCompare(a.ten));
        break;
      case 'discount-desc':
        this.filteredSanPhamKhuyenMai.sort((a, b) => this.getDiscount(b) - this.getDiscount(a));
        break;
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