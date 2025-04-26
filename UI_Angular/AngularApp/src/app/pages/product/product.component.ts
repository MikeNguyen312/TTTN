import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service'; // Adjust the path if needed
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  standalone: true,  // Mark as standalone component
  imports: [CommonModule,RouterLink],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],  // Fixed typo from styleUrl to styleUrls
})
export class ProductComponent implements OnInit {
  sanPhams: any[] = [];

  // Inject the service in the constructor
  constructor(private sanphamService: ProductService) {}

  ngOnInit(): void {
    // Load products when the component initializes
    this.loadSanPhams();
  }

  loadSanPhams(): void {
    this.sanphamService.getSanPhams().subscribe({
      next: (data) => {
        console.log('Fetched data:', data); 
        this.sanPhams = Array.isArray(data) ? data : []; // Ensure data is an array
      },
      error: (err) => {
        console.error('Error fetching SanPhams:', err);
      }
    });
  }

  xoaSanPham(id: string): void {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xoá sản phẩm này?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sanphamService.deleteSanPham(id).subscribe({
          next: () => {
            Swal.fire('Đã xoá!', 'Sản phẩm đã được xoá thành công.', 'success');
            this.loadSanPhams(); // tải lại danh sách sản phẩm
          },
          error: (err) => {
            console.error('Lỗi khi xoá sản phẩm:', err);
            Swal.fire('Thất bại!', 'Không thể xoá sản phẩm.', 'error');
          }
        });
      } else {
        Swal.fire('Đã hủy!', 'Sản phẩm không bị xoá.', 'info');
      }
    });
  }
  
}
