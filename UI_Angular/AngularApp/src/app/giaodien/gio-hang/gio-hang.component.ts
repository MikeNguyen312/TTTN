import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-gio-hang',
  imports: [CommonModule],
  templateUrl: './gio-hang.component.html',
  styleUrls: ['./gio-hang.component.css'],
})
export class GioHangComponent implements OnInit {
  cartItems: CartItem[] = [];
  shippingFee = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
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
}
