import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { KhoService } from '../../../services/kho.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tao-phieu-kho',
  imports:[FormsModule,CommonModule],
  templateUrl: './taophieukho.component.html',
  styleUrls: ['./taophieukho.component.css']
})
export class TaoPhieuKhoComponent {

  thongBaoThanhCong = false;

  formModel = {
    idPhieuKho: '',
    ngayLap: ''
  };

  constructor(
    private phieuKhoService: KhoService,
    private router: Router
  ) {}

  taoPhieuKho(): void {
    this.phieuKhoService.taoPhieuKho(this.formModel).subscribe({
      next: () => {
        this.thongBaoThanhCong = true;
        setTimeout(() => {
          this.thongBaoThanhCong = false;
          this.router.navigate(['/admin/kho']); // Chuyển về trang danh sách Phiếu Kho
        }, 2000);
      },
      error: err => {
        console.error('Error creating Phieu Kho:', err);
        alert('Trùng ID');
      }
    });
  }
}
