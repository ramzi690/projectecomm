export class ProductList {
  constructor(products, cartService) {
    this.products = products;
    this.cartService = cartService;
    this.currentCategory = 'all';
  }

  init() {
    this.renderProducts();
    this.setupFilterListeners();
  }

  setupFilterListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.currentCategory = button.dataset.category;
        this.renderProducts();
      });
    });
  }

  renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const filteredProducts = this.currentCategory === 'all' 
      ? this.products 
      : this.products.filter(product => product.category === this.currentCategory);

    productsGrid.innerHTML = filteredProducts.map(product => this.createProductCard(product)).join('');
    
    // Add event listeners to add-to-cart buttons
    productsGrid.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id);
        const product = this.products.find(p => p.id === productId);
        if (product) {
          this.cartService.addItem(product);
        }
      });
    });
  }

  createProductCard(product) {
    return `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" class="product-card__image">
        <div class="product-card__content">
          <h3 class="product-card__title">${product.name}</h3>
          <p class="product-card__description">${product.description}</p>
          <p class="product-card__price">$${product.price.toFixed(2)}</p>
          <button class="btn btn--primary add-to-cart" data-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  }
}