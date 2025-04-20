import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-giaynam',
  imports: [CommonModule],
  templateUrl: './giaynam.component.html',
  styleUrl: './giaynam.component.css'
})
export class GiaynamComponent {
  constructor(
    private sanphamService: ProductService,
    private router: Router
  ) {}
  
    sanPhams: any[] = [];
    giayNam: any[] = [];
    giayNu: any[] = [];
  
    ngOnInit(): void {
      this.loadSanPhams();
    }
  
    loadSanPhams(): void {
      this.sanphamService.getSanPhams().subscribe({
        next: (data) => {
          console.log('Fetched data:', data); 
          this.sanPhams = Array.isArray(data) ? data : [];
          this.giayNam = this.sanPhams.filter(sp => sp.loai === 'Nam');
          this.giayNu = this.sanPhams.filter(sp => sp.loai === 'Nữ');
        },
        error: (err) => {
          console.error('Error fetching SanPhams:', err);
        }
      });
    }
    viewProductDetail(productId: string): void {
      this.router.navigate(['/chi-tiet-san-pham', productId]);
    }
}
