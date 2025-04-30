import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DonhangService } from '../../services/donhang.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-donhang',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './donhang.component.html',
  styleUrl: './donhang.component.css',
})
export class DonhangComponent implements OnInit {
  donHangs: any[] = [];
  get donHangsChoXacNhan(): any[] {
    return this.donHangs.filter(
      (d) =>
        d.trangThaiDh === 'Chờ xác nhận - Chưa thanh toán' ||
        d.trangThaiDh === 'Chờ xác nhận - Đã thanh toán'
    );
  }

  get donHangsDaXacNhan(): any[] {
    return this.donHangs.filter(
      (d) =>
        d.trangThaiDh === 'Đã xác nhận - Đã thanh toán' ||
        d.trangThaiDh === 'Đã xác nhận - Chưa thanh toán'
    );
  }

  // Inject the service in the constructor
  constructor(private donhangService: DonhangService, private router: Router) {}

  ngOnInit(): void {
    // Load products when the component initializes
    this.loadDonHang();
  }

  loadDonHang(): void {
    this.donhangService.getDonHangs().subscribe({
      next: (data) => {
        console.log('Fetched data:', data);
        this.donHangs = Array.isArray(data) ? data : []; // Ensure data is an array
      },
      error: (err) => {
        console.error('Error fetching DonHang:', err);
      },
    });
  }
  xacNhanDonHang(donHang: any): void {
    const phanSau = donHang.trangThaiDh.split(' - ')[1] || ''; // lấy phần sau dấu -
    donHang.trangThaiDh = `Đã xác nhận - ${phanSau}`;

    this.donhangService.capNhatDonHang(donHang.idDonHang, donHang).subscribe({
      next: () => {
        Swal.fire('Thành công!', 'Xác nhận thành công.', 'success');
        this.loadDonHang(); // nạp lại danh sách
      },
      error: (err) => {
        Swal.fire('Thất bại!', 'Xác nhận thất bại.', 'error');
      },
    });
  }
  deleteDonHang(id: string): void {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa đơn hàng này?',
      text: 'Việc này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.donhangService.deleteDonHang(id).subscribe({
          next: () => {
            Swal.fire('Đã xóa!', 'Đơn hàng đã được xóa thành công.', 'success');
            this.loadDonHang(); // Reload lại danh sách đơn hàng
          },
          error: (err) => {
            Swal.fire('Có lỗi xảy ra!', 'Không thể xóa đơn hàng.', 'error');
          },
        });
      }
    });
  }
}
