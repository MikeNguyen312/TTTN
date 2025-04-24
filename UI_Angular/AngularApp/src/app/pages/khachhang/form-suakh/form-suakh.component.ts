import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { KhachhangService } from '../../../services/khachhang.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-suakh',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './form-suakh.component.html',
  styleUrl: './form-suakh.component.css'
})
export class FormSuakhComponent implements OnInit {
  khachHang: any = {};
  thongBaoThanhCong = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private khachHangService: KhachhangService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.khachHangService.getKhachHangs().subscribe(data => {
      this.khachHang = data.find(x => x.idKhachHang == id);
    });
  }

  capNhatKhachHang() {
    this.khachHangService.udpateKhachhang(this.khachHang).subscribe(() => {
      this.thongBaoThanhCong = true;
        setTimeout(() => {
          this.thongBaoThanhCong = false;
          this.router.navigate(['/admin/khachhang']); // Chuyển về trang danh sách Phiếu Kho
        }, 2000);
    });
  }
}
