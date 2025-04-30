import { Component } from '@angular/core';
import { KhuyenmaiService } from '../../../services/khuyenmai.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tao-km',
  imports: [FormsModule],
  templateUrl: './tao-km.component.html',
  styleUrl: './tao-km.component.css'
})
export class TaoKMComponent {
  khuyenMai = {
    idkhuyenmai: '',
    PhanTramKm: 0,
  };

  constructor(private khuyenmaiService: KhuyenmaiService) {}

  taoKhuyenMai(): void {
    this.khuyenmaiService.taoKhuyenMai(this.khuyenMai).subscribe(
      (response: any) => {
        console.log('Phản hồi từ API:', response);
        Swal.fire('Thành công!', 'Khuyến mãi mới đã được tạo.', 'success');
      },
      (error: any) => {
        Swal.fire('Lỗi!', 'Không thể tạo khuyến mãi.', 'error');
        console.error('Lỗi khi tạo khuyến mãi:', error);
      }
    );
  }

}
