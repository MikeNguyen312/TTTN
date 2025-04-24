// gio-hang.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
@Component({
  selector: 'app-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrls: ['./gio-hang.component.css']
})
export class GioHangComponent implements OnInit {
  cartItems: CartItem[] = [];
  shippingFee = 3680000;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  get totalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  get totalAmount(): number {
    return this.totalPrice + this.shippingFee;
  }

  increaseQty(index: number): void {
    const item = this.cartItems[index];
    this.cartService.updateItemQuantity(index, item.quantity + 1);
  }

  decreaseQty(index: number): void {
    const item = this.cartItems[index];
    if (item.quantity > 1) {
      this.cartService.updateItemQuantity(index, item.quantity - 1);
    }
  }

  removeItem(index: number): void {
    this.cartService.removeItem(index);
  }

  checkout(): void {
    alert('Thanh toán thành công!');
    this.cartService.clearCart();
  }
}
