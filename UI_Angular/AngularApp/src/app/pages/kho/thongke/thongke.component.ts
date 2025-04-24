import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-thongke',
  standalone: true,
  imports: [CommonModule, BaseChartDirective,RouterLink],
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.css']
})
export class ThongkeComponent {
  thongKeList: any[] = [];
  timeFilter: string = 'week'; 

  pieChartType: ChartType = 'pie';
  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  
  // Dữ liệu cho biểu đồ Xuất
  exportChartData: any;
  // Dữ liệu cho biểu đồ Nhập
  importChartData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://localhost:7141/api/kho/ThongKe')
      .subscribe(data => {
        this.thongKeList = data;
        this.prepareChartData();
      });
  }

  prepareChartData() {
    // Dữ liệu cho Biểu đồ Xuất
    const exportData = this.thongKeList.map(sp => sp.soLuongXuat);
    this.exportChartData = {
      labels: this.thongKeList.map(sp => sp.tenSanPham || sp.idSanPham),
      datasets: [{
        data: exportData,
        backgroundColor: '#f44336'  // Màu đỏ cho Xuất
      }]
    };

    // Dữ liệu cho Biểu đồ Nhập
    const importData = this.thongKeList.map(sp => sp.soLuongNhap);
    this.importChartData = {
      labels: this.thongKeList.map(sp => sp.tenSanPham || sp.idSanPham),
      datasets: [{
        data: importData,
        backgroundColor: '#4caf50'  // Màu xanh cho Nhập
      }]
    };

    // thirdChartData: any;
    // const thirdData = this.thongKeList.map(sp => sp.soLuong); // Hoặc dữ liệu khác
    // this.thirdChartData = {
    //   labels: this.thongKeList.map(sp => sp.tenSanPham || sp.idSanPham),
    //   datasets: [{
    //     data: thirdData,
    //     backgroundColor: '#2196f3'  // Màu xanh dương cho Sản phẩm 3
    //   }]
    // };
  }
}
