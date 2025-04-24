import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { KhachhangService } from '../../services/khachhang.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-khachhang',
  imports: [CommonModule,RouterLink],
  templateUrl: './khachhang.component.html',
  styleUrl: './khachhang.component.css'
})
export class KhachhangComponent {
 khachHangs: any[] = [];

  // Inject the service in the constructor
  constructor(private KhachhangService: KhachhangService) {}

  ngOnInit(): void {
    // Load products when the component initializes
    this.loadKhachHang();
  }

  loadKhachHang(): void {
    this.KhachhangService.getKhachHangs().subscribe({
      next: (data) => {
        console.log('Fetched data:', data); 
        this.khachHangs = Array.isArray(data) ? data : []; // Ensure data is an array
      },
      error: (err) => {
        console.error('Error fetching KhachHangs:', err);
      }
    });
  }
  xoaKhachHang(id: string) {
    Swal.fire({
      title: 'Xác nhận xoá',
      text: `Bạn có chắc chắn xoá ${id} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.KhachhangService.deleteKhachHang(id).subscribe(() => {
          this.loadKhachHang(); // Load lại danh sách
          Swal.fire(
            'Đã xoá!',
            'Khách hàng đã được xoá thành công.',
            'success'
          );
        }, error => {
          Swal.fire(
            'Lỗi!',
            'Đã có lỗi xảy ra khi xoá.',
            'error'
          );
        });
      }
    });
  }
}
