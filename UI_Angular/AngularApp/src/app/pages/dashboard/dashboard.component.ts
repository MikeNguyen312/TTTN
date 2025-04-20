import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // Kiểm tra quyền admin nếu cần (hoặc từ localStorage)
    // Ví dụ: kiểm tra xem email đăng nhập có phải là tài khoản admin không
    const currentUserEmail = localStorage.getItem('email');
    if (currentUserEmail !== 'admin@example.com') {
      // Nếu không phải tài khoản admin, có thể điều hướng về trang khác
      // this.router.navigate(['/']);
    }
  }
}
