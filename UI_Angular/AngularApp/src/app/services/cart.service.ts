// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  image: string;
  name: string;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  get cartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  addToCart(item: CartItem) {
    const existing = this.cartItems.find(i => i.name === item.name);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.cartItemsSubject.next([...this.cartItems]);
  }

  removeItem(index: number) {
    const items = [...this.cartItems];
    items.splice(index, 1);
    this.cartItemsSubject.next(items);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }

  updateItemQuantity(index: number, quantity: number) {
    const items = [...this.cartItems];
    items[index].quantity = quantity;
    this.cartItemsSubject.next(items);
  }
}
