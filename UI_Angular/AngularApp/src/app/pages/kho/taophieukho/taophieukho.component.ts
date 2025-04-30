import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { KhoService } from '../../../services/kho.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tao-phieu-kho',
  imports: [FormsModule, CommonModule],
  templateUrl: './taophieukho.component.html',
  styleUrls: ['./taophieukho.component.css']
})
export class TaoPhieuKhoComponent {

  formModel = {
    idPhieuKho: '',
    ngayLap: ''
  };

  constructor(
    private phieuKhoService: KhoService,
    private router: Router
  ) {}

  taoPhieuKho(): void {
    this.phieuKhoService.taoPhieuKho(this.formModel).subscribe({
      next: () => {
        setTimeout(() => {
          Swal.fire({
            title: 'Thành công!',
            text: 'Phiếu kho mới đã được tạo.',
            icon: 'success',
            confirmButtonText: 'Đóng'
          });
          this.router.navigate(['/admin/kho']); // Chuyển về trang danh sách Phiếu Kho
        }, 2000);
      },
      error: (err) => {
        console.error('Error creating Phieu Kho:', err);
        Swal.fire({
          title: 'Lỗi!',
          text: 'Trùng ID hoặc dữ liệu không hợp lệ.',
          icon: 'error',
          confirmButtonText: 'Thử lại'
        });
      }
    });
  }

}