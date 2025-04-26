import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { KhoService, PhieuKho } from '../../services/kho.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kho',
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './kho.component.html',
  styleUrl: './kho.component.css'
})
export class KhoComponent {
  
  hienForm = false;

  phieuKhos: any[] = [];
  formModel: PhieuKho = {
    idPhieuKho: '',
    ngayLap: ''
  };
  
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
          // Hiển thị thông báo xác nhận trước khi xóa
          Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa không?',
            text: 'Hành động này không thể hoàn tác!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
          }).then((result) => {
            if (result.isConfirmed) {
              // Gửi yêu cầu xóa Phiếu Kho
              this.phieuKhoService.xoaPhieuKho(idPhieuKho).subscribe({
                next: () => {
                  Swal.fire('Thành công!', 'Phiếu Kho đã được xóa.', 'success');
                  setTimeout(() => {
                    this.loadPhieuKho(); // Reload lại danh sách
                  }, 2000);
                },
                error: (error) => {
                  console.error('Lỗi khi xóa Phiếu Kho:', error);
                  Swal.fire('Lỗi!', 'Xóa Phiếu Kho thất bại!', 'error');
                }
              });
            }
          });
        } else {
          Swal.fire('Thông báo!', 'Phiếu Kho vẫn còn sản phẩm, không thể xóa!', 'info');
        }
      });
    }
    

    taoPhieuKho(): void {
      // Hiển thị hộp thoại xác nhận tạo phiếu kho
      Swal.fire({
        title: 'Bạn có muốn tạo phiếu kho mới?',
        text: 'Thông tin sẽ được lưu trữ sau khi xác nhận!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Tạo',
        cancelButtonText: 'Hủy'
      }).then((result) => {
        if (result.isConfirmed) {
          // Gửi yêu cầu tạo phiếu kho
          this.phieuKhoService.taoPhieuKho(this.formModel).subscribe({
            next: () => {
              Swal.fire('Thành công!', 'Phiếu kho mới đã được tạo.', 'success');
              this.hienForm = false;
              this.formModel = { idPhieuKho: '', ngayLap: '' }; // Đặt lại form
              this.loadPhieuKho(); // Tải lại danh sách phiếu kho
            },
            error: (err) => {
              console.error('Lỗi khi tạo phiếu kho:', err);
              Swal.fire('Thất bại!', 'Tạo phiếu kho không thành công.', 'error');
            }
          });
        } else {
          Swal.fire('Đã hủy!', 'Phiếu kho không được tạo.', 'info');
        }
      });
    }
    
}
