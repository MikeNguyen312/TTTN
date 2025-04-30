import { Component, OnInit } from '@angular/core';
import { KhachhangService } from '../../services/khachhang.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thong-tin',
  imports: [CommonModule],
  templateUrl: './thong-tin.component.html',
  styleUrls: ['./thong-tin.component.css']
})
export class ThongTinComponent implements OnInit {
  khachHang: any;
  tab: string = 'info'; // Thêm biến tab với giá trị mặc định

  constructor(private khachHangService: KhachhangService) {}

  ngOnInit(): void {
    this.khachHangService.getThongTinKhachHang().subscribe({
      next: (data) => {
        console.log('Dữ liệu nhận được:', data); // Kiểm tra dữ liệu nhận được
        this.khachHang = data;
      },
      error: (err) => {
        console.error('Lỗi khi lấy thông tin khách hàng:', err);
      }
    });
  }

  // Thêm hàm chọn tab
  chonTab(tabName: string): void {
    this.tab = tabName;
  }
}