import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  image: string;
  name: string;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private storageKey = 'cartItems';
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor() {
    const storedItems = localStorage.getItem(this.storageKey);
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems) as CartItem[];
      this.cartItemsSubject.next(parsedItems);
      this.updateCartCount(parsedItems);
    }
  }

  private saveCart(items: CartItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.cartItemsSubject.next(items);
    this.updateCartCount(items);
  }

  private updateCartCount(items: CartItem[]) {
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    this.cartItemCountSubject.next(totalCount);
  }

  get cartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  addToCart(item: CartItem) {
    const items = [...this.cartItems];
    const index = items.findIndex((i) => i.id === item.id);

    if (index !== -1) {
      items[index].quantity += item.quantity;
    } else {
      items.push(item);
    }

    this.saveCart(items);
  }

  increaseQuantity(index: number) {
    const items = [...this.cartItems];
    if (items[index]) {
      items[index].quantity += 1;
      this.saveCart(items);
    }
  }

  decreaseQuantity(index: number) {
    const items = [...this.cartItems];
    if (items[index]) {
      if (items[index].quantity > 1) {
        items[index].quantity -= 1;
      } else {
        items.splice(index, 1);
      }
      this.saveCart(items);
    }
  }

  updateItemQuantity(index: number, quantity: number) {
    const items = [...this.cartItems];
    if (items[index]) {
      items[index].quantity = quantity;
      this.saveCart(items);
    }
  }

  removeItem(index: number) {
    const items = [...this.cartItems];
    if (index >= 0 && index < items.length) {
      items.splice(index, 1);
      this.saveCart(items);
    }
  }

  clearCart() {
    localStorage.removeItem(this.storageKey);
    this.cartItemsSubject.next([]);
    this.cartItemCountSubject.next(0);
  }

  getGioHang(): CartItem[] {
    return [...this.cartItems];
  }

  getTongTien(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
