import { Component } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-thanhtoan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './thanhtoan.component.html',
  styleUrls: ['./thanhtoan.component.css'],
})
export class ThanhtoanComponent {
  hoTen: string = '';
  soDienThoai: string = '';
  email: string = '';
  diaChi: string = '';
  phuongThucThanhToan: string = 'Visa';

  gioHang: CartItem[] = [];
  tongTien: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.gioHang = this.cartService.getGioHang();
    this.tongTien = this.cartService.getTongTien();
  }

  async datHang() {
    const idDonHang = 'DH' + Date.now();
    const ngayDatHang = new Date().toISOString();
    const userId = localStorage.getItem('userId'); 

    if (!userId) {
      alert('Bạn cần đăng nhập trước khi thanh toán.');
      return;
    }

    const trangthaiDh =
      this.phuongThucThanhToan === 'Offline'
        ? 'Chờ xác nhận - Chưa thanh toán'
        : 'Chờ xác nhận - Đã thanh toán';

    const donHang = {
      idDonHang,
      idKhachHang: userId,
      ngayDatHang,
      tongTien: this.tongTien,
      diaChi: this.diaChi,
      phuongThuc: this.phuongThucThanhToan,
      trangthaiDh,
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    try {
      // Gửi đơn hàng
      await firstValueFrom(
        this.http.post('https://localhost:7141/api/DonHang/TaoDonHang', donHang, { headers })
      );

      // Gửi chi tiết từng sản phẩm
      const chiTietRequests = this.gioHang.map((item) => {
        const chiTiet = {
          idDonHang,
          idSanPham: item.id,
          soLuong: item.quantity,
          gia: item.price,
          idKhachHang: userId,
        };
        return firstValueFrom(
          this.http.post(
            `https://localhost:7141/api/DonHang/${idDonHang}/SanPham`,
            chiTiet,
            { headers }
          )
        );
      });

      await Promise.all(chiTietRequests);

      alert('Đặt hàng thành công!');
      this.cartService.clearCart();
      this.router.navigate(['/trang-chu']);
    } catch (error) {
      console.error('Lỗi khi đặt hàng:', error);
      alert('Có lỗi xảy ra khi đặt hàng.');
    }
  }
}
