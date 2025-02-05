// Product class to store product details
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// ShoppingCartItem class to store product and its quantity
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    // Method to calculate total price of the item
    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// ShoppingCart class to manage the cart
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    // Method to get the total of items inside the cart
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Method to add items to the cart
    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity; // Increase quantity if item already exists
        } else {
            this.items.push(new ShoppingCartItem(product, quantity)); // Add new item
        }
        this.displayCartItems();
    }

    // Method to remove items from the cart
    removeItem(productId) {
        const existingItem = this.items.find(item => item.product.id === productId);
        if (existingItem) {
            existingItem.quantity -= 1; // Decrease quantity
            if (existingItem.quantity <= 0) {
                this.items = this.items.filter(item => item.product.id !== productId); // Remove item if quantity is 0
            }
        }
        this.displayCartItems();
    }

    // Method to display cart items
    displayCartItems() {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Clear existing items

        const totalPriceElement = document.querySelector('.total');
        let totalPrice = 0;

        // Update the quantity display for each product
        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <div class="card" style="width: 18rem">
                    <img src="/assets/${item.product.name.toLowerCase()}.png" class="card-img-top" alt="${item.product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.product.name}</h5>
                        <p class="card-text">This is a ${item.product.name}</p>
                        <h4 class="unit-price">${item.product.price} $</h4>
                        <div>
                            <i class="fas fa-plus-circle"></i>
                            <span class="quantity" data-id="${item.product.id}">${item.quantity}</span>
                            <i class="fas fa-minus-circle"></i>
                        </div>
                        <div>
                            <i class="fas fa-trash-alt"></i>
                            <i class="fas fa-heart"></i>
                        </div>
                    </div>
                </div>
            `;
            productList.appendChild(itemElement);
            totalPrice += item.getTotalPrice();
        });

        totalPriceElement.textContent = `${totalPrice} $`;
    }
}

// Initialize the shopping cart
const cart = new ShoppingCart();

// Create products
const products = [
    new Product(1, 'Baskets', 100),
    new Product(2, 'Socks', 20),
    new Product(3, 'Bag', 50)
];

// Add event listeners to the plus and minus buttons
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-plus-circle')) {
        const productId = event.target.closest('.card-body').querySelector('.quantity').getAttribute('data-id');
        const product = products.find(p => p.id === parseInt(productId));
        cart.addItem(product, 1); // Add 1 to the cart
    } else if (event.target.classList.contains('fa-minus-circle')) {
        const productId = event.target.closest('.card-body').querySelector('.quantity').getAttribute('data-id');
        cart.removeItem(parseInt(productId)); // Remove 1 from the cart
    } else if (event.target.classList.contains('fa-trash-alt')) {
        const productId = event.target.closest('.card-body').querySelector('.quantity').getAttribute('data-id');
        cart.removeItem(parseInt(productId)); // Remove item from the cart
    }
});

// Initialize the cart with some products
products.forEach(product => {
    cart.addItem(product, 0); // Add product to the cart with quantity 0
});
cart.displayCartItems();