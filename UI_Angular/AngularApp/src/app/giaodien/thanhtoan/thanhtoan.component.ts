import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { environment } from '../../enviroments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-thanhtoan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './thanhtoan.component.html',
  styleUrls: ['./thanhtoan.component.css'],
})
export class ThanhtoanComponent implements OnInit {
  hoTen: string = '';
  soDienThoai: string = '';
  email: string = '';
  diaChi: string = '';
  phuongThucThanhToan: string = 'Visa';
  nameOnCard: string = '';
  country: string = 'VN'; // Default to Vietnam
  zip: string = '';

  gioHang: CartItem[] = [];
  tongTien: number = 0;

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;
  paymentError: string | null = null;

  constructor(
    private cartService: CartService,
    private router: Router,
    private http: HttpClient
  ) {}

  async ngOnInit(): Promise<void> {
    this.gioHang = this.cartService.getGioHang();
    this.tongTien = this.cartService.getTongTien();
    console.log('Payment Method on Init:', this.phuongThucThanhToan);
    console.log('Stripe Publishable Key:', environment.stripePublishableKey);

    try {
      this.stripe = await loadStripe(environment.stripePublishableKey);
      if (this.stripe) {
        this.elements = this.stripe.elements();
        this.card = this.elements.create('card', {
          style: {
            base: {
              fontSize: '16px',
              color: '#32325d',
              '::placeholder': { color: '#aab7c4' },
            },
          },
        });
        this.card.mount('#card-element');
        console.log('Stripe card element mounted successfully');
      } else {
        this.paymentError = 'Không thể khởi tạo Stripe. Vui lòng thử lại.';
        console.error('Failed to load Stripe.js');
      }
    } catch (error: any) {
      this.paymentError = 'Lỗi khi khởi tạo Stripe: ' + error.message;
      console.error('Stripe initialization error:', error);
    }
  }

  async datHang(): Promise<void> {
    console.log('Submitting with payment method:', this.phuongThucThanhToan);
    console.log('Form Data:', {
      hoTen: this.hoTen,
      soDienThoai: this.soDienThoai,
      email: this.email,
      diaChi: this.diaChi,
      nameOnCard: this.nameOnCard,
      country: this.country,
      zip: this.zip,
    });

    const idDonHang = 'DH' + Date.now();
    const ngayDatHang = new Date().toISOString();
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.paymentError = 'Bạn cần đăng nhập trước khi thanh toán.';
      alert(this.paymentError);
      return;
    }

    if (!this.hoTen || !this.soDienThoai || !this.email || !this.diaChi) {
      this.paymentError = 'Vui lòng điền đầy đủ thông tin khách hàng.';
      alert(this.paymentError);
      return;
    }

    if (this.phuongThucThanhToan === 'Visa') {
      if (!this.nameOnCard || !this.country || !this.zip) {
        this.paymentError = 'Vui lòng điền đầy đủ thông tin thanh toán.';
        alert(this.paymentError);
        return;
      }

      if (this.tongTien < 1000) {
        this.paymentError = 'Số tiền tối thiểu để thanh toán bằng Visa là 1000 VND.';
        alert(this.paymentError);
        return;
      }
    }

    let trangthaiDh: string;
    if (this.phuongThucThanhToan === 'Offline') {
      trangthaiDh = 'Chờ xác nhận - Chưa thanh toán';
    } else {
      trangthaiDh = 'Chờ xác nhận - Đã thanh toán';
    }

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
      // Handle Stripe payment for Visa
      if (this.phuongThucThanhToan === 'Visa') {
        if (!this.stripe || !this.card) {
          this.paymentError = 'Stripe không được khởi tạo. Vui lòng thử lại.';
          alert(this.paymentError);
          return;
        }

        console.log('Creating Payment Intent with amount:', this.tongTien);
        const response = await firstValueFrom(
          this.http.post<{ clientSecret: string }>(
            'https://localhost:7141/api/Payments/create-payment-intent',
            {
              amount: Math.round(this.tongTien), // VND is zero-decimal
              currency: 'vnd',
            },
            { headers }
          )
        );

        const { clientSecret } = response;
        console.log('Payment Intent created with clientSecret:', clientSecret);

        // Confirm the payment with additional billing details
        const result = await this.stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: this.card,
            billing_details: {
              name: this.nameOnCard,
              email: this.email,
              address: {
                country: this.country,
                postal_code: this.zip,
                line1: this.diaChi,
              },
            },
          },
        });

        if (result.error) {
          this.paymentError = result.error.message || 'Thanh toán thất bại.';
          if (result.error.code === 'card_declined') {
            this.paymentError = 'Thẻ của bạn bị từ chối. Vui lòng thử thẻ khác.';
          }
          alert(this.paymentError);
          return;
        }

        if (result.paymentIntent?.status !== 'succeeded') {
          this.paymentError = 'Thanh toán không thành công.';
          alert(this.paymentError);
          return;
        }
        console.log('Payment succeeded:', result.paymentIntent);
      }

      // Proceed with order creation
      console.log('Creating order:', donHang);
      await firstValueFrom(
        this.http.post('https://localhost:7141/api/DonHang/TaoDonHang', donHang, { headers })
      );

      // Send order details for each product
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

      Swal.fire({
        icon: 'success',
        title: 'Đặt hàng thành công!',
        text: 'Cảm ơn bạn đã mua hàng. Đơn hàng đang chờ xác nhận.',
        confirmButtonText: 'Về trang chủ',
      }).then(() => {
        this.cartService.clearCart();
        this.router.navigate(['/trang-chu']);
      });
    } catch (error: any) {
      this.paymentError = error.message || 'Có lỗi xảy ra khi đặt hàng.';
      console.error('Lỗi khi đặt hàng:', error);
      alert(this.paymentError);
    }
  }
}