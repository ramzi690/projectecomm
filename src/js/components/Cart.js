export class Cart {
  constructor(cartService) {
    this.cartService = cartService;
    this.modal = document.getElementById('cartModal');
    this.cartCount = document.querySelector('.cart-count');
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateCartCount();
    
    // Subscribe to cart changes
    this.cartService.subscribe(() => {
      this.updateCartCount();
      this.renderCartItems();
    });
  }

  setupEventListeners() {
    // Cart button click
    document.getElementById('cartBtn').addEventListener('click', () => {
      this.openModal();
    });

    // Close button click
    this.modal.querySelector('.close-btn').addEventListener('click', () => {
      this.closeModal();
    });

    // Clear cart button click
    document.getElementById('clearCartBtn').addEventListener('click', () => {
      this.cartService.clearCart();
    });

    // Checkout button click
    document.getElementById('checkoutBtn').addEventListener('click', () => {
      alert('Checkout functionality coming soon!');
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });
  }

  openModal() {
    this.modal.classList.add('active');
    this.renderCartItems();
  }

  closeModal() {
    this.modal.classList.remove('active');
  }

  updateCartCount() {
    this.cartCount.textContent = this.cartService.getItemCount();
  }

  renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (this.cartService.cart.length === 0) {
      cartItems.innerHTML = '<p>Your cart is empty</p>';
      cartTotal.textContent = '$0.00';
      return;
    }

    cartItems.innerHTML = this.cartService.cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item__image">
        <div class="cart-item__details">
          <h4 class="cart-item__title">${item.name}</h4>
          <p class="cart-item__price">$${item.price.toFixed(2)}</p>
          <div class="cart-item__quantity">
            <button class="btn btn--secondary" onclick="window.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button class="btn btn--secondary" onclick="window.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
        </div>
        <button class="btn btn--secondary" onclick="window.removeFromCart(${item.id})">&times;</button>
      </div>
    `).join('');

    cartTotal.textContent = `$${this.cartService.getTotal().toFixed(2)}`;
  }
}