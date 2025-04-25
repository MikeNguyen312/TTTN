import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { KhuyenmaiService } from '../../../services/khuyenmai.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chitiet-ctkm',
  imports: [CommonModule,RouterLink],
  templateUrl: './chitiet-ctkm.component.html',
  styleUrl: './chitiet-ctkm.component.css'
})
export class ChitietCtkmComponent {
  idKhuyenMai: string = '';
  danhSachSanPham: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private khuyenmaiService: KhuyenmaiService
  ) {}

  ngOnInit(): void {
    // Lấy idKhuyenMai từ URL
    this.idKhuyenMai = this.route.snapshot.paramMap.get('id') || '';
    this.getDanhSachSanPham();
  }

  // Gọi API để lấy danh sách sản phẩm của khuyến mãi
  getDanhSachSanPham(): void {
    this.khuyenmaiService.getSanPhamKhuyenMai(this.idKhuyenMai).subscribe(
      (data: any[]) => {
        this.danhSachSanPham = data;
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      }
    );
  }


  xoaSanPham(idSanPham: string): void {
    Swal.fire({
      title: 'Xác nhận xoá?',
      text: 'Bạn có chắc chắn muốn xoá sản phẩm này khỏi khuyến mãi?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.khuyenmaiService.xoaSanPhamKhoiKhuyenMai(this.idKhuyenMai, idSanPham).subscribe(
          (response: string) => {
            Swal.fire(
              'Đã xoá!',
              response, // Hiển thị chuỗi phản hồi
              'success'
            );
            // Cập nhật danh sách sản phẩm
            this.danhSachSanPham = this.danhSachSanPham.filter(sp => sp.idSanPham !== idSanPham);
          },
          (error: any) => {
            console.error('Lỗi khi xoá sản phẩm:', error);
            Swal.fire(
              'Lỗi!',
              'Không thể xoá sản phẩm khỏi khuyến mãi.',
              'error'
            );
          }
        );
      }
    });
  }

}
