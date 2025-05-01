import { Component, OnInit } from '@angular/core';
import { KhachhangService } from '../../services/khachhang.service';
import { CommonModule } from '@angular/common';

interface OrderSummary {
  TrangThai: string;
  SoLuong: number;
  TongTien: number;
}

@Component({
  selector: 'app-thong-tin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thong-tin.component.html',
  styleUrls: ['./thong-tin.component.css']
})
export class ThongTinComponent implements OnInit {
  khachHang: any;
  tab: string = 'info';
  donHangs: any[] = [];
  orderStatistics: OrderSummary[] = [];
  totalAmount: number = 0;
  selectedOrderId: string | null = null;

  constructor(private khachHangService: KhachhangService) {}

  ngOnInit(): void {
    // Lấy thông tin khách hàng
    this.khachHangService.getThongTinKhachHang().subscribe({
      next: (data) => {
        console.log('Thông tin khách hàng:', data);
        this.khachHang = data;

        // Lấy ID khách hàng từ dữ liệu trả về
        const idKhachHang = data.idKhachHang;
        console.log('ID khách hàng lấy được:', idKhachHang);

        if (idKhachHang) {
          // Lấy danh sách đơn hàng và chi tiết cho khách hàng này
          this.layDanhSachDonHangVaChiTiet(idKhachHang);
        } else {
          console.error('Không lấy được ID khách hàng từ dữ liệu trả về');
        }
      },
      error: (err) => {
        console.error('Lỗi khi lấy thông tin khách hàng:', err);
      }
    });
  }

  chonTab(tabName: string): void {
    this.tab = tabName;
  }

  layDanhSachDonHangVaChiTiet(idKhachHang: string): void {
    // Lấy danh sách đơn hàng và chi tiết đơn hàng cho khách hàng từ API
    this.khachHangService.getDonHangVaChiTiet(idKhachHang).subscribe({
      next: (response: any[]) => {
        console.log('Danh sách đơn hàng:', response);
        this.donHangs = response;

        // Tổng hợp dữ liệu đơn hàng theo trạng thái
        const summaryMap: { [key: string]: OrderSummary } = {};
        let total = 0;

        response.forEach(order => {
          const trangThai = order.trangthaiDh || 'Không rõ';
          if (!summaryMap[trangThai]) {
            summaryMap[trangThai] = { TrangThai: trangThai, SoLuong: 0, TongTien: 0 };
          }

          summaryMap[trangThai].SoLuong += 1;
          summaryMap[trangThai].TongTien += order.tongTien || 0;
          total += order.tongTien || 0;
        });

        this.orderStatistics = Object.values(summaryMap);
        this.totalAmount = total;
      },
      error: (err) => {
        console.error('Lỗi khi lấy đơn hàng chi tiết:', err);
      }
    });
  }

  toggleChiTiet(donHangId: string): void {
    this.selectedOrderId = this.selectedOrderId === donHangId ? null : donHangId;
  }
}
