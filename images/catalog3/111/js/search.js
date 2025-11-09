// Search and filter functionality
class SearchFilter {
    constructor() {
        this.products = [
            { name: "The Marie-Louise necklace", price: 35300000, category: "necklace", image: "images/marie-louise.png" },
            { name: "A tiara worn by the Empress Eugenie", price: 115500000, category: "tiara", image: "images/tiara.png" },
            { name: "Icon Round Diamond Pendant", price: 1600000, category: "necklace", image: "images/second images/nekcleces1.png" },
            { name: "Round Diamond Slim Bracelet", price: 18000000, category: "bracelet", image: "images/third images/bracelets1.png" },
            // Add more products as needed
        ];
        
        this.init();
    }

    init() {
        const searchInput = document.getElementById('search-input');
        const priceFilter = document.getElementById('price-filter');
        const categoryFilter = document.getElementById('category-filter');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        if (priceFilter) {
            priceFilter.addEventListener('change', (e) => this.handleFilter());
        }

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => this.handleFilter());
        }

        this.displayProducts(this.products);
    }

    handleSearch(searchTerm) {
        const filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.displayProducts(filteredProducts);
    }

    handleFilter() {
        const searchTerm = document.getElementById('search-input')?.value || '';
        const priceRange = document.getElementById('price-filter')?.value;
        const category = document.getElementById('category-filter')?.value;

        let filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            filteredProducts = filteredProducts.filter(product => {
                if (max) {
                    return product.price >= min && product.price <= max;
                }
                return product.price >= min;
            });
        }

        if (category) {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }

        this.displayProducts(filteredProducts);
    }

    displayProducts(products) {
        const container = document.getElementById('products-container');
        if (!container) return;

        container.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h5>${product.name}</h5>
                <p>${product.price.toLocaleString()} kzt</p>
                <button class="add-to-cart" data-product='${JSON.stringify(product)}'>Add to Cart</button>
            </div>
        `).join('');

        // Add to cart functionality
        container.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => this.addToCart(e));
        });
    }

    addToCart(e) {
        const product = JSON.parse(e.target.dataset.product);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        this.showMessage('Product added to cart!', 'success');
    }

    showMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = message;
        document.body.appendChild(messageEl);
        
        setTimeout(() => messageEl.remove(), 2000);
    }
}

// Initialize search filter
const searchFilter = new SearchFilter();