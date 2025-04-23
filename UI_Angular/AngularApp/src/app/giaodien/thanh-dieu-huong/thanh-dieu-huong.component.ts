import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thanh-dieu-huong',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, RouterLink, FormsModule, CommonModule],
  templateUrl: './thanh-dieu-huong.component.html',
  styleUrls: ['./thanh-dieu-huong.component.css']
})
export class ThanhDieuHuongComponent {
  isSearchActive: boolean = false;
  searchQuery: string = '';
  isMenuActive: boolean = false;
  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
    // Nếu search đang active, focus vào input
    if (this.isSearchActive) {
      setTimeout(() => {
        const input = document.querySelector('.search-input') as HTMLElement;
        input.focus();
      }, 0);
    }
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      // Thực hiện hành động tìm kiếm ở đây
      console.log('Searching for:', this.searchQuery);
      // Bạn có thể thêm logic điều hướng hoặc gọi service tìm kiếm ở đây
    }
  }
} 