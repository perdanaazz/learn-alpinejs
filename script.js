document.addEventListener("alpine:init", () => {
  // Limit: sebagai parameter
  Alpine.data("products", (limit = 32) => ({
    init() {
      this.fetchAllProducts();
    },
    products: [],
    search: "",
    error: {
      isError: false,
      message: "",
    },
    isAvailable: false,
    isLoading: false,
    // Search Product
    async searchProducts(query) {
      this.isLoading = true;
      this.isAvailable = false;
      try {
        const data = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
        );
        const result = await data.json();

        this.isAvailable = result.products.length == 0 ? true : false;
        this.products = result.products;
        console.log(this.isAvailable);
      } catch (error) {
        this.error.isError = true;
        this.error.message = error;
      } finally {
        this.isLoading = false;
      }
    },
    // Index
    async fetchAllProducts() {
      try {
        const data = await fetch(
          `https://dummyjson.com/products?limit=${limit}`,
        );
        const result = await data.json();
        this.products = result.products;
      } catch (error) {
        this.error.isError = true;
        this.error.message = error;
      }
    },
  }));
});
