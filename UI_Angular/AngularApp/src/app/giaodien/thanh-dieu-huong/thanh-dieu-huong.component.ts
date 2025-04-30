import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';
@Component({
  selector: 'app-thanh-dieu-huong',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    RouterLink,
    FormsModule,
    CommonModule,
    NgIf,
  ],
  templateUrl: './thanh-dieu-huong.component.html',
  styleUrls: ['./thanh-dieu-huong.component.css'],
})
export class ThanhDieuHuongComponent {
  hideCartTimeout: any = null;
  isSearchActive: boolean = false;
  searchQuery: string = '';
  isMenuActive: boolean = false;
  isUserMenuOpen: boolean = false;
  cartItems: CartItem[] = [];
  cartItemCount = 0;
  showCartPreview = false;
  constructor(private router: Router, private cartService: CartService) {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
    if (this.isSearchActive) {
      setTimeout(() => {
        const input = document.querySelector('.search-input') as HTMLElement;
        input.focus();
      }, 0);
    }
  }
  ngOnInit(): void {
    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
    });
  }
  ngOnDestroy() {
    if (this.hideCartTimeout) {
      clearTimeout(this.hideCartTimeout);
    }
  }
  get totalQuantity(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  toggleCartPreview(show: boolean) {
    if (this.hideCartTimeout) {
      clearTimeout(this.hideCartTimeout);
      this.hideCartTimeout = null;
    }
  
    if (show) {
      this.showCartPreview = true;
    } else {
      this.hideCartTimeout = setTimeout(() => {
        this.showCartPreview = false;
      }, 500);
    }
  }
  
  removeFromCart(index: number) {
    this.cartService.removeItem(index);
  }
  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  isLoggedIn(): boolean {
    return (
      !!localStorage.getItem('username') && !!localStorage.getItem('userId')
    );
  }
  navigateToCart() {
    this.router.navigate(['/giohang']);
  }
  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userId');
    this.isUserMenuOpen = false;
    this.router.navigate(['/trang-chu']);
  }
  performSearch() {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
    }
  }
}
