import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-thanh-dieu-huong',
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './thanh-dieu-huong.component.html',
  styleUrl: './thanh-dieu-huong.component.css'
})
export class ThanhDieuHuongComponent {
  username: string | null = '';

  ngOnInit() {
    // Lấy tên người dùng từ localStorage
    this.username = localStorage.getItem('username');
  }
}
