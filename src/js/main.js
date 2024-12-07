import { products } from './data/products.js';
import { CartService } from './services/CartService.js';
import { ProductList } from './components/ProductList.js';
import { Cart } from './components/Cart.js';

// Initialize services
const cartService = new CartService();

// Initialize components
const productList = new ProductList(products, cartService);
const cart = new Cart(cartService);

// Initialize the application
productList.init();

// Add global handlers for cart operations
window.updateQuantity = (productId, quantity) => {
  cartService.updateQuantity(productId, quantity);
};

window.removeFromCart = (productId) => {
  cartService.removeItem(productId);
};
console.log('Products:', products);
console.log('CartService initialized:', cartService);
console.log('ProductList initialized:', productList);
console.log('Cart initialized:', cart);
