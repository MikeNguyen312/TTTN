import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { KhachhangService } from '../../services/khachhang.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-khachhang',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './khachhang.component.html',
  styleUrl: './khachhang.component.css'
})
export class KhachhangComponent {
  khachHangsDaXacNhan: any[] = [];
  khachHangsChoXacNhan: any[] = [];

  constructor(private KhachhangService: KhachhangService) {}

  ngOnInit(): void {
    this.loadKhachHang();
  }

  loadKhachHang(): void {
    this.KhachhangService.getKhachHangs().subscribe({
      next: (data) => {
        console.log('Fetched data:', data);
        const danhSach = Array.isArray(data) ? data : [];
        this.khachHangsDaXacNhan = danhSach.filter(kh => kh.trangthai === 'Đã xác nhận');
        this.khachHangsChoXacNhan = danhSach.filter(kh => kh.trangthai === 'Chờ xác nhận');
      },
      error: (err) => {
        console.error('Lỗi khi tải khách hàng:', err);
      }
    });
  }

  xoaKhachHang(id: string) {
    Swal.fire({
      title: 'Xác nhận xoá',
      text: `Bạn có chắc chắn muốn xoá khách hàng ${id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.KhachhangService.deleteKhachHang(id).subscribe(() => {
          this.loadKhachHang();
          Swal.fire('Đã xoá!', 'Khách hàng đã được xoá thành công.', 'success');
        }, error => {
          Swal.fire('Lỗi!', 'Đã xảy ra lỗi khi xoá.', 'error');
        });
      }
    });
  }

  xacNhan(id: string) {
    this.KhachhangService.updateTrangThai(id, 'Đã xác nhận').subscribe(() => {
      Swal.fire('Thành công!', 'Đã xác nhận khách hàng.', 'success');
      this.loadKhachHang();
    });
  }
}
