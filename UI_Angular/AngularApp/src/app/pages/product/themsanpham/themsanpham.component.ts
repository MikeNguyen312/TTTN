import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-themsanpham',
  imports: [FormsModule],
  templateUrl: './themsanpham.component.html',
  styleUrl: './themsanpham.component.css'
})
export class ThemsanphamComponent {
  sanPham: any = {};

  constructor(private sanPhamService: ProductService,private router: Router) {}
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1]; // lấy phần sau dấu ','
        this.sanPham.anh = base64String; // chỉ giữ lại base64 thuần
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit() {
    this.sanPhamService.addSanPham(this.sanPham).subscribe(
      (response) => {
        console.log('Sản phẩm được thêm thành công:', response);
        this.router.navigate(['/admin/product']);
        Swal.fire('Thành công!', 'Thêm sản phẩm thành công.', 'success');
      },
      (error) => {
        console.error('Lỗi khi thêm sản phẩm:', error);
        Swal.fire('Thất bại', 'Thêm sản phẩm thất bạt.', 'error');
      }
    );
  }

}
