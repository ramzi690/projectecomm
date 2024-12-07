export class CartService {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.subscribers = [];
  }

  addItem(product) {
    const existingItem = this.cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    
    this.saveCart();
    this.notifySubscribers();
  }

  removeItem(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
    this.notifySubscribers();
  }

  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.saveCart();
        this.notifySubscribers();
      }
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.notifySubscribers();
  }

  getTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.cart));
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}