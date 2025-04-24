import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KhachhangService } from '../../services/khachhang.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private khachHangservice: KhachhangService, private router: Router) {}

  onLogin() {
    if (this.email === 'admin' && this.password === '1') {
      localStorage.setItem('username', 'Admin');
      localStorage.setItem('isAdmin', 'true');
      this.router.navigate(['/admin/dashboard']);
      return;
    }
  
    this.khachHangservice.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Login response:', res);  
        // Kiểm tra trạng thái trước khi cho đăng nhập
        if (res.trangthai !== 'Đã xác nhận') {
          this.errorMessage = 'Tài khoản chưa xác nhận';
          setTimeout(() => {
            this.errorMessage = '';
          }, 1000);
          return;
        }
  
        // Nếu đã xác nhận thì tiếp tục đăng nhập
        localStorage.setItem('username', res.hoTen);
        localStorage.setItem('isAdmin', 'false');
        this.router.navigate([`/trang-chu/${res.iD_KhachHang}`]);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = err.error?.message || 'Đăng nhập thất bại!';
      }
    });
  }
  
}
