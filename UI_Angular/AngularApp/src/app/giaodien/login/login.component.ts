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
  rememberMe = false;
  constructor(private khachHangservice: KhachhangService, private router: Router) {}

onLogin() {
  if (this.rememberMe) {
    localStorage.setItem('keepLoggedIn', 'true');
  }
  if (this.email === 'admin' && this.password === '1') {
    localStorage.setItem('username', 'Admin');
    localStorage.setItem('isAdmin', 'true');
    localStorage.setItem('userId', 'admin'); 
    this.router.navigate(['/admin/dashboard']);
    return;
  }

  this.khachHangservice.login(this.email, this.password).subscribe({
    next: (res) => {
      console.log('Login response:', res);  
      if (res.trangthai !== 'Đã xác nhận') {
        this.errorMessage = 'Tài khoản chưa xác nhận';
        setTimeout(() => {
          this.errorMessage = '';
        }, 1000);
        return;
      }

      localStorage.setItem('username', res.hoTen);
      localStorage.setItem('isAdmin', 'false');
      localStorage.setItem('userId', res.iD_KhachHang.toString()); // Add this
      this.router.navigate([`/trang-chu/${res.iD_KhachHang}`]);
    },
    error: (err) => {
      console.error('Login failed:', err);
      this.errorMessage = err.error?.message || 'Đăng nhập thất bại!';
    }
  });
}
  
}
