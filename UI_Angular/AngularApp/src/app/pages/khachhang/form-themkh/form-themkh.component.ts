import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { KhachhangService } from '../../../services/khachhang.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-themkh',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './form-themkh.component.html',
  styleUrl: './form-themkh.component.css'
})
export class FormThemkhComponent {
  khachHang: any = {
    idKhachHang: '',
    hoTen: '',
    soDienThoai: '',
    email: '',
    password: '',
    trangthai: 'Chờ xác nhận',  // Gán mặc định luôn từ đầu
    roleWeb: 'user'             // Gán mặc định luôn từ đầu
  };

  constructor(private khachHangService: KhachhangService, private router: Router) {}

  themKhachHang() {
    // Đảm bảo trước khi gọi API, giá trị vẫn đúng
    this.khachHang.trangthai = 'Chờ xác nhận';
    this.khachHang.roleWeb = 'user';
    console.log('Dữ liệu gửi:', this.khachHang);
    
    this.khachHangService.addKhachHang(this.khachHang).subscribe({
      next: () => {
        Swal.fire('Thành công!', 'Khách hàng mới đã được tạo.', 'success');
        this.router.navigate(['/admin/khachhang']);
      },
      error: () => {
          Swal.fire('Thất bại!', 'Tạo Thất Bại.', 'success');
      }
    });
  }
}
