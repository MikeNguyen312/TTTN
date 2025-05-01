import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DonhangService } from '../../../services/donhang.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chitietdh',
  standalone: true,
  imports: [CommonModule,RouterLink],  // CommonModule là đủ ở đây
  templateUrl: './chitietdh.component.html',
  styleUrls: ['./chitietdh.component.css']  // Chỉnh lại styleUrls
})
export class ChitietdhComponent implements OnInit {
  idDonHang: string = '';
  chiTietDonHang: any = [];

  constructor(
    private route: ActivatedRoute,
    private donhangService: DonhangService
  ) {}

  ngOnInit(): void {
    this.idDonHang = this.route.snapshot.paramMap.get('id') || '';
    if (this.idDonHang) {
      this.layChiTietDonHang(this.idDonHang);
    }
  }

  layChiTietDonHang(id: string): void {
    this.donhangService.getChiTietDonHang(id).subscribe({
      next: (data) => {
        this.chiTietDonHang = data;
      },
      error: (err) => {
        console.error('Lỗi khi lấy chi tiết đơn hàng:', err);
      }
    });
  }
  xoaSanPhamDonHang(idSanPham: string): void {
    Swal.fire({
      title: 'Xác nhận xoá?',
      text: 'Bạn có chắc chắn muốn xoá sản phẩm này khỏi đơn hàng?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.donhangService.xoaSanPhamDonHang(this.idDonHang, idSanPham).subscribe({
          next: () => {
            Swal.fire('Đã xoá!', 'Sản phẩm đã được xoá khỏi đơn hàng.', 'success');
            this.chiTietDonHang = this.chiTietDonHang.filter((item: any) => item.idSanPham !== idSanPham);
          },
          error: (err) => {
            Swal.fire('Lỗi!', err.error || 'Không thể xoá sản phẩm.', 'error');
          }
        });
      }
    });
  }
  
  
}
