import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { KhachhangService } from '../../../services/khachhang.service';

@Component({
  selector: 'app-form-themkh',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './form-themkh.component.html',
  styleUrl: './form-themkh.component.css'
})
export class FormThemkhComponent {
  khachHang: any = {};

  constructor(private khachHangService: KhachhangService, private router: Router) {}

  themKhachHang() {
    this.khachHangService.addKhachHang(this.khachHang).subscribe(() => {
      alert('Thêm thành công!');
      this.router.navigate(['/admin/khachhang']); // điều hướng về trang danh sách
    });
  }
}
