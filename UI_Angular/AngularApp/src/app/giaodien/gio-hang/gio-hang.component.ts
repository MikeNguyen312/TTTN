import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-gio-hang',
  imports: [CommonModule],
  templateUrl: './gio-hang.component.html',
  styleUrls: ['./gio-hang.component.css'],
})
export class GioHangComponent implements OnInit {
  cartItems: CartItem[] = [];
  shippingFee = 0;
  isLoggedIn = false;
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('userId');
    this.isLoggedIn = !!user;
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get total(): number {
    return this.subtotal + this.shippingFee;
  }

  increaseQty(index: number) {
    this.cartService.increaseQuantity(index);
  }

  decreaseQty(index: number) {
    this.cartService.decreaseQuantity(index);
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
  }
  
  checkout() {
    if (this.isLoggedIn) {
      this.router.navigateByUrl('/thanh-toan');
    } else {
      const confirmLogin = confirm('Vui lòng đăng nhập để tiếp tục đặt hàng!\n\nBạn có muốn đăng nhập ngay bây giờ không?');
      if (confirmLogin) {
        this.router.navigate(['/login']);
      }
    }
  }
}
