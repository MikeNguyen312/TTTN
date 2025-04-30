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
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private storageKey = 'cartItems';
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();
  get cartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }
  constructor() {
    const storedItems = localStorage.getItem(this.storageKey);
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      this.cartItemsSubject.next(parsedItems);
      this.updateCartState();
    }
  }
  private updateCartState() {
    const items = this.cartItems;
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    this.cartItemCountSubject.next(totalCount);
    this.cartItemsSubject.next([...items]);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  addToCart(item: CartItem) {
    const existing = this.cartItems.find((i) => i.id === item.id);

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.updateCartState();
    this.cartItemsSubject.next([...this.cartItems]);
  }

  increaseQuantity(index: number) {
    const items = [...this.cartItems];
    items[index].quantity += 1;
    this.cartItemsSubject.next(items);
    this.updateCartState();
  }
  
  decreaseQuantity(index: number) {
    const items = [...this.cartItems];
    if (items[index].quantity > 1) {
      items[index].quantity -= 1;
    } else {
      items.splice(index, 1);
    }
    this.cartItemsSubject.next(items);
    this.updateCartState();
  }

  removeItem(index: number) {
    const items = [...this.cartItems];
    items.splice(index, 1);
    this.cartItemsSubject.next(items);
    this.updateCartState();
  }

  clearCart() {
    this.cartItemsSubject.next([]);
    this.cartItemCountSubject.next(0);
    localStorage.removeItem(this.storageKey);
  }

  updateItemQuantity(index: number, quantity: number) {
    const items = [...this.cartItems];
    items[index].quantity = quantity;
    this.cartItemsSubject.next(items);
    this.updateCartState();
  }
}
