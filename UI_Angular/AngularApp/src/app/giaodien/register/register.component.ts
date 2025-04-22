import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KhachhangService } from '../../services/khachhang.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  khachHangForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private khachHangService: KhachhangService) {
    this.khachHangForm = this.fb.group({
      IdKhachHang: ['', Validators.required],
      HoTen: ['', Validators.required],
      SoDienThoai: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      Email: ['', [Validators.required, Validators.email]],
      Passwords: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.khachHangForm.valid) {
      this.khachHangService.addKhachHang(this.khachHangForm.value).subscribe({
        next: () => {
          this.successMessage = 'Khách hàng đã được thêm thành công!';
          this.errorMessage = null;
          this.khachHangForm.reset();
        },
        error: (err) => {
          this.errorMessage = 'Có lỗi xảy ra khi thêm khách hàng.';
          this.successMessage = null;
          console.error('API Error:', err);
        }
      });
    }
  }
}
