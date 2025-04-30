import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { KhuyenmaiService } from '../../services/khuyenmai.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

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
  allSanPhamKhuyenMai: any[] = []; // Store all promo products when no specific promo is selected
  selectedKhuyenMai: string = '';
  selectedSortOption: string = '';

  constructor(
    private khuyenMaiService: KhuyenmaiService,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadKhuyenMai();
    this.loadAllSanPhamKhuyenMai();
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
    // Reset array
    this.allSanPhamKhuyenMai = [];
    
    // Get all promotions first
    this.khuyenMaiService.getDSKhuyenMai().subscribe({
      next: (promotions) => {
        if (!Array.isArray(promotions) || promotions.length === 0) {
          this.sanPhamKhuyenMai = [];
          return;
        }
        
        // For each promotion, get its products
        const promises = promotions.map(promo => {
          return new Promise<any[]>(resolve => {
            this.khuyenMaiService.getSanPhamKhuyenMai(promo.idkhuyenmai).subscribe({
              next: (products) => {
                if (Array.isArray(products)) {
                  // Add discount info to each product
                  const productsWithPromo = products.map(product => ({
                    ...product,
                    khuyenMaiId: promo.idkhuyenmai,
                    phanTramKm: promo.phanTram,
                    giaGoc: this.calculateOriginalPrice(product.gia, promo.phanTram)
                  }));
                  resolve(productsWithPromo);
                } else {
                  resolve([]);
                }
              },
              error: () => resolve([])
            });
          });
        });
        
        // When all promises are resolved, combine all products
        Promise.all(promises).then(productsArrays => {
          this.allSanPhamKhuyenMai = productsArrays.flat();
          
          // Get additional product details like images
          if (this.allSanPhamKhuyenMai.length > 0) {
            this.allSanPhamKhuyenMai.forEach((sp, index) => {
              this.productService.getSanPhamById(sp.idSanPham).subscribe({
                next: (productDetail) => {
                  if (productDetail) {
                    this.allSanPhamKhuyenMai[index] = {
                      ...this.allSanPhamKhuyenMai[index],
                      anh: productDetail.anh,
                      soLuongTon: productDetail.soLuong || 0
                    };
                  }
                },
                error: (err) => {
                  console.error(`Error fetching details for product ${sp.idSanPham}:`, err);
                }
              });
            });
          }
          
          // Set as default displayed products
          this.sanPhamKhuyenMai = [...this.allSanPhamKhuyenMai];
          
          // Apply sorting if needed
          if (this.selectedSortOption) {
            this.sortProducts();
          }
        });
      },
      error: (err) => {
        console.error('Error fetching all promotions:', err);
        this.sanPhamKhuyenMai = [];
      }
    });
  }

  loadSanPhamsKhuyenMai(): void {
    if (!this.selectedKhuyenMai) {
      // Show all promotional products
      this.sanPhamKhuyenMai = [...this.allSanPhamKhuyenMai];
      if (this.selectedSortOption) {
        this.sortProducts();
      }
      return;
    }

    this.khuyenMaiService.getSanPhamKhuyenMai(this.selectedKhuyenMai).subscribe({
      next: (data) => {
        console.log('Fetched promotion products:', data);
        if (Array.isArray(data)) {
          // Find the promotion details to calculate original prices
          const selectedPromo = this.danhSachKhuyenMai.find(km => km.idkhuyenmai === this.selectedKhuyenMai);
          const phanTram = selectedPromo ? selectedPromo.phanTram : 0;
          
          this.sanPhamKhuyenMai = data.map(product => ({
            ...product,
            khuyenMaiId: this.selectedKhuyenMai,
            phanTramKm: phanTram,
            giaGoc: this.calculateOriginalPrice(product.gia, phanTram)
          }));
          
          // Get additional product details like images
          if (this.sanPhamKhuyenMai.length > 0) {
            this.sanPhamKhuyenMai.forEach((sp, index) => {
              this.productService.getSanPhamById(sp.idSanPham).subscribe({
                next: (productDetail) => {
                  if (productDetail) {
                    this.sanPhamKhuyenMai[index] = {
                      ...this.sanPhamKhuyenMai[index],
                      anh: productDetail.anh,
                      soLuongTon: productDetail.soLuong || 0
                    };
                  }
                },
                error: (err) => {
                  console.error(`Error fetching details for product ${sp.idSanPham}:`, err);
                }
              });
            });
          }
          
          // Apply sorting if needed
          if (this.selectedSortOption) {
            this.sortProducts();
          }
        } else {
          this.sanPhamKhuyenMai = [];
        }
      },
      error: (err) => {
        console.error('Error fetching promotion products:', err);
        this.sanPhamKhuyenMai = [];
      },
    });
  }

  calculateOriginalPrice(currentPrice: number, discountPercent: number): number {
    if (!currentPrice || !discountPercent) return currentPrice;
    return Math.round(currentPrice / (1 - (discountPercent / 100)));
  }

  getDiscount(product: any): number {
    return product.phanTramKm || 0;
  }

  sortProducts(): void {
    switch(this.selectedSortOption) {
      case 'price-asc':
        this.sanPhamKhuyenMai.sort((a, b) => a.gia - b.gia);
        break;
      case 'price-desc':
        this.sanPhamKhuyenMai.sort((a, b) => b.gia - a.gia);
        break;
      case 'name-asc':
        this.sanPhamKhuyenMai.sort((a, b) => a.ten.localeCompare(b.ten));
        break;
      case 'name-desc':
        this.sanPhamKhuyenMai.sort((a, b) => b.ten.localeCompare(a.ten));
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