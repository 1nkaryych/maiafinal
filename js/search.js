class SearchFilter {
  constructor() {
    this.products = [
      { id: 1, name: "Aurora Emerald Pendant", price: 35300000, category: "necklace", image: "images/cl1.jpg", description: "Diamond and emerald masterpiece inspired by the Northern Lights" },
      { id: 2, name: "Solara Gold Lariat", price: 115500000, category: "necklace", image: "images/cl2.jpg", description: "Royal gold and diamond lariat inspired by the sun" },
      { id: 3, name: "Ethereal Blossom Necklace", price: 86000000, category: "necklace", image: "images/cl3.jpg", description: "Minimalist diamond pendant for everyday elegance" },
      { id: 4, name: "Serenity Diamond Bracelet", price: 52000000, category: "bracelet", image: "images/cl4.jpg", description: "Romantic heart-shaped diamond bracelet" },
      { id: 5, name: "Starlit Bangle", price: 96000000, category: "bracelet", image: "images/cl5.jpg", description: "Delicate diamond bangle with golden accents" },
      { id: 6, name: "Icon Diamond Earrings", price: 7500000, category: "earrings", image: "images/catalog3/ear2.jpg", description: "Elegant pear drop diamond earrings" },
      { id: 7, name: "Emerald Diamond Studs", price: 6000000, category: "earrings", image: "images/catalog3/ear3.jpg", description: "Romantic heart-shaped diamond studs" }
    ];

    this.init();
  }

  init() {
    this.displayProducts(this.products);
    this.setupEvents();
  }

  setupEvents() {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const priceFilter = document.getElementById("price-filter");
    const categoryFilter = document.getElementById("category-filter");

    if (searchInput) {
      searchInput.addEventListener("input", () => this.handleFilter());
    }
    if (searchBtn) {
      searchBtn.addEventListener("click", () => this.handleFilter());
    }
    if (priceFilter) {
      priceFilter.addEventListener("change", () => this.handleFilter());
    }
    if (categoryFilter) {
      categoryFilter.addEventListener("change", () => this.handleFilter());
    }
  }

  handleFilter() {
    const term = (document.getElementById("search-input")?.value || "").toLowerCase();
    const priceRange = document.getElementById("price-filter")?.value || "";
    const category = document.getElementById("category-filter")?.value || "";

    let filtered = this.products.filter(
      p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter(p =>
        max ? p.price >= min && p.price <= max : p.price >= min
      );
    }

    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }

    this.displayProducts(filtered);
  }

  displayProducts(products) {
    const container = document.getElementById("products-container");
    const noResults = document.getElementById("no-results");

    if (!products.length) {
      container.innerHTML = "";
      noResults.style.display = "block";
      return;
    }

    noResults.style.display = "none";

    container.innerHTML = products
      .map(
        p => `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <div class="product-info">
          <h5>${p.name}</h5>
          <p>${p.description}</p>
          <span class="price">${p.price.toLocaleString()} KZT</span>
        </div>
      </div>
    `
      )
      .join("");
  }
}

document.addEventListener("DOMContentLoaded", () => new SearchFilter());
