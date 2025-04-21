import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chitietphieukho',
  imports: [CommonModule,RouterLink],
  templateUrl: './chitietphieukho.component.html',
  styleUrl: './chitietphieukho.component.css'
})
export class ChitietphieukhoComponent implements OnInit {
  idPhieuKho!: string;
  sanPhamList: any[] = [];
  showConfirmPopup: boolean = false;
  idSanPhamDangXoa: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.idPhieuKho = this.route.snapshot.paramMap.get('id')!;
    console.log('ID Phiếu Kho:', this.idPhieuKho); 
    this.loadSanPham();
  }

  loadSanPham() {
    this.http.get<any[]>(`https://localhost:7141/api/Kho/${this.idPhieuKho}`)
      .subscribe(data => {
        this.sanPhamList = data;
      });
  }

  hienXacNhan(idSanPham: string) {
    this.idSanPhamDangXoa = idSanPham;
    this.showConfirmPopup = true;
  }
  
  huyXacNhan() {
    this.idSanPhamDangXoa = null;
    this.showConfirmPopup = false;
  }
  xacNhanXoa() {
    if (!this.idSanPhamDangXoa) return;
  
    this.http.delete(`https://localhost:7141/api/Kho/XoaID?idPK=${this.idPhieuKho}&idSanPham=${this.idSanPhamDangXoa}`)
      .subscribe({
        next: () => {
          alert('Đã xóa sản phẩm!');
          this.loadSanPham();
          this.huyXacNhan();
        },
        error: () => {
          alert('Xóa sản phẩm thất bại!');
          this.huyXacNhan();
        }
      });

  }
}
