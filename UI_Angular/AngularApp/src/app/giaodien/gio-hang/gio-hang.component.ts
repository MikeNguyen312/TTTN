import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gio-hang',
  imports: [],
  templateUrl: './gio-hang.component.html',
  styleUrl: './gio-hang.component.css'
})
export class GioHangComponent implements OnInit{
  cartItems = [
    {
      image: 'assets/images/nike-pegasus.jpg',
      name: 'Nike Pegasus Premium',
      quantity: 1,
      price: 6320000
    }
  ];

  shippingFee = 3680000;

  constructor() {}

  ngOnInit(): void {}

  get totalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  get totalAmount(): number {
    return this.totalPrice + this.shippingFee;
  }

  increaseQty(index: number): void {
    this.cartItems[index].quantity++;
  }

  decreaseQty(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    }
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
  }

  checkout(): void {
    alert('Thanh toán thành công!');
  }
}
