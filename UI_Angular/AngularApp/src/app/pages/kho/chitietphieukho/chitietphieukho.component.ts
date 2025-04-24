import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-chitietphieukho',
  standalone: true,
  imports: [CommonModule,RouterLink,BaseChartDirective],
  templateUrl: './chitietphieukho.component.html',
  styleUrl: './chitietphieukho.component.css'
})

export class ChitietphieukhoComponent implements OnInit {
  idPhieuKho!: string;
  sanPhamList: any[] = [];
  showConfirmPopup: boolean = false;
  idSanPhamDangXoa: string | null = null;


  isChartVisible: boolean = true;
  toggleChartVisibility() {
    this.isChartVisible = !this.isChartVisible; // Đảo trạng thái hiển thị biểu đồ
  }
  barChartType: ChartType = 'bar';
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    indexAxis: 'y', 
    plugins: {
      legend: {
        display: true
      }
    },
    scales:{
      x: {},
      y: {}
    }
  };
  barChartLabels: string[] = [];
  barChartData: ChartConfiguration['data']['datasets'] = [];

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
        this.prepareChartData(); 
      });
  }

  prepareChartData() {
    this.barChartLabels = this.sanPhamList.map(sp => sp.idSanPham);
    this.barChartData = [
      {
        data: this.sanPhamList.map(sp => sp.soLuong),
        label: 'Số lượng tồn',
        backgroundColor: '#2196f3'
      },
      {
        data: this.sanPhamList.map(sp => sp.soLuongNhap),
        label: 'Số lượng nhập',
        backgroundColor: '#4caf50'
      },
      {
        data: this.sanPhamList.map(sp => sp.soLuongXuat),
        label: 'Số lượng xuất',
        backgroundColor: '#f44336'
      }
    ];
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
