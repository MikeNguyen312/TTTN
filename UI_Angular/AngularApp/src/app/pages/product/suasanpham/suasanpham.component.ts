import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-suasanpham',
  imports: [FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './suasanpham.component.html',
  styleUrl: './suasanpham.component.css'
})
export class SuasanphamComponent implements OnInit {
  form!: FormGroup;
  idSanPham!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.idSanPham = this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      ten: [''],
      gia: [0],
      hang: [''],
      size: [''],
      thongtin: [''],
      loai: [''],
      soLuong: [0],
      anh: [null],
    });

    this.productService.getSanPhamById(this.idSanPham).subscribe((sp) => {
      this.form.patchValue(sp);
    });
  }

  onSubmit(): void {
    const spCapNhat = { ...this.form.value, idSanPham: this.idSanPham };

    this.productService.updateSanPham(this.idSanPham, spCapNhat).subscribe({
      next: () => {
        Swal.fire('Thành công', 'Đã cập nhật sản phẩm', 'success');
        this.router.navigate(['/admin/product']);
      },
      error: () => {
        Swal.fire('Lỗi', 'Cập nhật thất bại', 'error');
      },
    });
  }
}
