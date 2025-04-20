<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-thanh-dieu-huong',
  imports: [RouterOutlet,RouterLink,CommonModule],
=======
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-thanh-dieu-huong',
  imports: [RouterOutlet, FooterComponent],
>>>>>>> fe
  templateUrl: './thanh-dieu-huong.component.html',
  styleUrl: './thanh-dieu-huong.component.css'
})
export class ThanhDieuHuongComponent {
<<<<<<< HEAD
  username: string | null = '';

  ngOnInit() {
    // Lấy tên người dùng từ localStorage
    this.username = localStorage.getItem('username');
  }
=======

>>>>>>> fe
}
