import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { KhuyenmaiService } from '../../services/khuyenmai.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ctkm',
  imports: [CommonModule,RouterLink],
  templateUrl: './ctkm.component.html',
  styleUrl: './ctkm.component.css',
})
export class CtkmComponent {
  danhSachKhuyenMai: any[] = [];
  thongbaoXoaThanhCong = false;

  constructor(private khuyenmaiService: KhuyenmaiService) {}

  ngOnInit(): void {
    this.loadKhuyenMai();
  }

  loadKhuyenMai(): void {
    this.khuyenmaiService.getDSKhuyenMai().subscribe({
      next: (data) => {
        this.danhSachKhuyenMai = data;
        console.log('Dữ liệu khuyến mãi:', data);
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách khuyến mãi:', err);
      },
    });
  }

  xoaKhuyenMai(idKhuyenMai: string): void {
    Swal.fire({
      title: 'Xác nhận xoá?',
      text: 'Bạn có chắc chắn muốn xoá khuyến mãi này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.khuyenmaiService.xoaKhuyenMai(idKhuyenMai).subscribe(
          (response: any) => {
            Swal.fire('Thành công!', 'Khuyến mãi đã được xoá.', 'success');
            this.danhSachKhuyenMai = this.danhSachKhuyenMai.filter(km => km.idkhuyenmai !== idKhuyenMai);
          },
          (error: any) => {
            if (error.status === 400) {
              Swal.fire('Lỗi!', error.error || 'Khuyến mãi vẫn còn sản phẩm, không thể xoá.', 'error');
            } else {
              Swal.fire('Lỗi!', 'Không thể xoá khuyến mãi.', 'error');
            }
          }
        );
      }
    });
  }
}
