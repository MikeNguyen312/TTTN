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
  sanPham: any = {};
  soLuongGoc: number = 0; 

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.idPhieuKho = this.route.snapshot.paramMap.get('id')!;
    this.sanPham = {
      idPhieuKho: this.idPhieuKho,  // ✅ Gán đúng lúc
      idSanPham: '',
      soLuong: 0,
      soLuongNhap: 0,
      soLuongXuat: 0
    };
    this.http.get<any[]>(`https://localhost:7141/api/kho/${this.idPhieuKho}`)
    .subscribe(spDaCo => {
      // Gọi API tất cả sản phẩm
      this.http.get<any[]>('https://localhost:7141/api/SanPham')
        .subscribe(tatCaSanPham => {
          // Lọc bỏ sản phẩm đã có trong phiếu kho
          this.danhSachSanPham = tatCaSanPham.filter(sp =>
            !spDaCo.some(spk => spk.idSanPham === sp.idSanPham)
          );
        });
    });
    
  }
  capNhatSoLuongTuDong() {
    const spChon = this.danhSachSanPham.find(sp => sp.idSanPham === this.sanPham.idSanPham);
    if (spChon) {
      const nhap = this.sanPham.soLuongNhap || 0;
      const xuat = this.sanPham.soLuongXuat || 0;
      this.sanPham.soLuong = this.soLuongGoc + nhap - xuat;
    }
  }
  onSanPhamChange() {
    const spChon = this.danhSachSanPham.find(sp => sp.idSanPham === this.sanPham.idSanPham);
    if (spChon) {
      this.soLuongGoc = spChon.soLuong; // 👈 Gán số lượng gốc khi chọn sản phẩm
      this.sanPham.soLuong = this.soLuongGoc;
      this.sanPham.soLuongNhap = 0;
      this.sanPham.soLuongXuat = 0; // Mặc định là 0
    }
  }
  themSanPham() {
    if (!this.sanPham.idSanPham || this.sanPham.soLuong < 0) {
      alert('Vui lòng nhập đầy đủ và đúng dữ liệu!');
      return;
    }
    this.sanPham.idPhieuKho = this.idPhieuKho;  // Gán idPhieuKho vào sanPham
    this.http.post(`https://localhost:7141/api/kho/${this.idPhieuKho}/SanPham`, this.sanPham)
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/kho', this.idPhieuKho]);
        },
        error: err => {
          console.error('Lỗi thêm:', err);
          alert('Thêm thất bại: ' + err.error);
        }
      });
  }
  
}
