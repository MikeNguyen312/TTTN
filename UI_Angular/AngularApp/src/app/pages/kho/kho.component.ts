import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { KhoService } from '../../services/kho.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-kho',
  imports: [CommonModule,RouterLink],
  templateUrl: './kho.component.html',
  styleUrl: './kho.component.css'
})
export class KhoComponent {
  phieuKhos: any[] = [];
  
    // Inject the service in the constructor
    constructor(private phieuKhoService: KhoService) {}
  
    ngOnInit(): void {
      // Load products when the component initializes
      this.loadPhieuKho();
    }
  
    loadPhieuKho(): void {
      this.phieuKhoService.getPhieuKho().subscribe({
        next: (data) => {
          console.log('Fetched data:', data); 
          this.phieuKhos = Array.isArray(data) ? data : []; // Ensure data is an array
        },
        error: (err) => {
          console.error('Error fetching PhieuKho:', err);
        }
      });
    }
    xoaPhieuKho(idPhieuKho: string): void {
      // Kiểm tra Phiếu Kho có sản phẩm hay không
      this.phieuKhoService.getSanPhamsByPhieuKho(idPhieuKho).subscribe(sanPhams => {
        if (sanPhams.length === 0) {
          // Gửi yêu cầu xóa Phiếu Kho
          this.phieuKhoService.xoaPhieuKho(idPhieuKho).subscribe({
            next: () => {
              alert('Đã xóa Phiếu Kho!');
              this.loadPhieuKho(); // Reload lại danh sách
            },
            error: (error) => {
              console.error('Lỗi khi xóa Phiếu Kho:', error);
              alert('Xóa Phiếu Kho thất bại!');
            }
          });
        } else {
          alert('Phiếu Kho vẫn còn sản phẩm, không thể xóa!');
        }
      });
    }
}
