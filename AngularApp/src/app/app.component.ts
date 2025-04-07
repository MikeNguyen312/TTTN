import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'av';
}
