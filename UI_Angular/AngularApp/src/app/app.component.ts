import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrangChuComponent } from './giaodien/trang-chu/trang-chu.component';
import { ThanhDieuHuongComponent } from "./giaodien/thanh-dieu-huong/thanh-dieu-huong.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const isLoggedIn = localStorage.getItem('username');
    if (!isLoggedIn) {
      // Nếu chưa đăng nhập, set mặc định là tài khoản khách
      localStorage.setItem('username', 'Khách');
      localStorage.setItem('isAdmin', 'false');
    }
  }
}
