import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-them-san-pham',
  imports:[CommonModule,FormsModule,RouterLink],
  templateUrl: './formthemsanpham.component.html'
})
export class FormThemSanPhamComponent {
  idPhieuKho!: string;
  danhSachSanPham: any[] = [];
  sanPham = {
    idSanPham: '',
    soLuong: 0,
    soLuongNhap: 0,
    soLuongXuat: 0
  };

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.idPhieuKho = this.route.snapshot.paramMap.get('idPhieuKho')!;
    this.http.get<any[]>('https://localhost:7141/api/SanPham')
    .subscribe(data => this.danhSachSanPham = data);
  }

  themSanPham() {
    console.log('Dữ liệu gửi:', this.sanPham); 
    this.http.post(`https://localhost:7141/api/kho/${this.idPhieuKho}/SanPham`, this.sanPham)
      .subscribe({
        next: () => this.router.navigate(['/admin/kho', this.idPhieuKho]),
        error: err => alert('Thêm thất bại: ' + err.error)
      });
  }
}
