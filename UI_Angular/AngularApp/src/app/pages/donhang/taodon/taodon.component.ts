import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DonhangService } from '../../../services/donhang.service';
import { KhachhangService } from '../../../services/khachhang.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-taodon',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './taodon.component.html',
  styleUrl: './taodon.component.css'
})
export class TaodonComponent {
  donHang = {
    idDonHang: '',
    idKhachHang: '',
    ngayDatHang: this.getTodayDate(), 
    tongTien: 0,
    diaChi: '',
    phuongThuc: '',
    trangThaiDh: '' // set cứng luôn
  };
  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format yyyy-MM-dd
  }

  dsKhachHang: any[] = [];

  constructor(
    private donhangService: DonhangService,
    private khachhangService: KhachhangService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.khachhangService.getKhachHangs().subscribe((data) => {
      this.dsKhachHang = data;
      data.forEach(kh => {
        console.log(`ID: ${kh.IdKhachHang}, Họ Tên: ${kh.HoTen}`);
      });
    });
  }

  taoDonHangSubmit() {
    this.donhangService.taoDonhang(this.donHang).subscribe({
      next: () => {
        Swal.fire('Thành công!', 'Tạo Đơn hàng thành công.', 'success');
        this.router.navigate(['/admin/donhang']);
      },
      error: (err) => {
        Swal.fire('Thất bại!', 'Tạo đơn hàng thất bại.', 'success');
        console.error(err);
      }
    });
  }
  capNhatTrangThai() {
    if (this.donHang.phuongThuc === 'Momo' || this.donHang.phuongThuc === 'Visa') {
      this.donHang.trangThaiDh = 'Chờ xác nhận - Đã thanh toán';
    } else if (this.donHang.phuongThuc === 'offline') {
      this.donHang.trangThaiDh = 'Chờ xác nhận - Chưa thanh toán';
    }
  }
  layDiaChiBangGPS() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
  
          // Gọi API reverse geocoding từ lat/lon => địa chỉ
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
            .then(res => res.json())
            .then(data => {
              this.donHang.diaChi = data.display_name;
            })
            .catch(err => {
              console.error('Lỗi lấy địa chỉ:', err);
              alert('Không lấy được địa chỉ từ GPS.');
            });
        },
        (error) => {
          console.error('Lỗi GPS:', error);
          alert('Không thể lấy vị trí từ thiết bị.');
        }
      );
    } else {
      alert('Trình duyệt không hỗ trợ GPS.');
    }
  }
}
