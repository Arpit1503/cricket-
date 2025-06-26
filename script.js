
// Product data
const products = [
  {
    id: 1,
    name: "Professional Cricket Bat",
    description: "Premium English willow bat for professional players",
    price: 299.99,
    category: "bats",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Leather Cricket Ball",
    description: "Tournament grade leather cricket ball",
    price: 49.99,
    category: "balls",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    badge: "Premium"
  },
  {
    id: 3,
    name: "Cricket Helmet",
    description: "Lightweight protective helmet with titanium grille",
    price: 159.99,
    category: "gear",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    badge: "Safety First"
  },
  {
    id: 4,
    name: "Cricket Jersey",
    description: "Moisture-wicking cricket jersey with UV protection",
    price: 79.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1503341338655-b2d75bc22bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    badge: "New"
  },
  {
    id: 5,
    name: "Batting Gloves",
    description: "Premium leather batting gloves with superior grip",
    price: 89.99,
    category: "gear",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    badge: ""
  },
  {
    id: 6,
    name: "Cricket Shoes",
    description: "Professional cricket shoes with metal spikes",
    price: 129.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1503341338655-b2d75bc22bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    badge: "Popular"
  },
  {
    id: 7,
    name: "Cricket Pads",
    description: "Lightweight leg pads with excellent protection",
    price: 119.99,
    category: "gear",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    badge: ""
  },
  {
    id: 8,
    name: "Practice Cricket Ball",
    description: "Synthetic practice ball for training sessions",
    price: 24.99,
    category: "balls",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    badge: "Training"
  }
];

// Cart functionality
let cart = [];

// DOM elements
const productGrid = document.querySelector('.product-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartModal = document.getElementById('cart-modal');
const cartIcon = document.querySelector('.fa-shopping-cart');
const cartCount = document.querySelector('.cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeModal = document.querySelector('.close');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  displayProducts(products);
  setupEventListeners();
  setupScrollAnimations();
  updateCartUI();
});

// Display products
function displayProducts(productsToShow) {
  productGrid.innerHTML = '';
  
  productsToShow.forEach(product => {
    const productCard = createProductCard(product);
    productGrid.appendChild(productCard);
  });
}

// Create product card
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card fade-in-up';
  card.innerHTML = `
    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
    <img src="${product.image}" alt="${product.name}">
    <div class="product-info">
      <h3 class="product-title">${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <div class="product-price">
        <span class="price">$${product.price}</span>
        <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </div>
  `;
  return card;
}

// Add to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCartUI();
  showNotification('Product added to cart!');
}

// Update cart UI
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? 'block' : 'none';
  
  updateCartModal();
}

// Update cart modal
function updateCartModal() {
  cartItems.innerHTML = '';
  let total = 0;
  
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid #e5e7eb;
    `;
    
    cartItem.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
        <div>
          <h4 style="margin: 0; font-size: 0.9rem;">${item.name}</h4>
          <p style="margin: 0; color: #6b7280; font-size: 0.8rem;">$${item.price} x ${item.quantity}</p>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <button onclick="updateQuantity(${item.id}, -1)" style="background: #ef4444; color: white; border: none; width: 25px; height: 25px; border-radius: 50%; cursor: pointer;">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${item.id}, 1)" style="background: #4ade80; color: white; border: none; width: 25px; height: 25px; border-radius: 50%; cursor: pointer;">+</button>
      </div>
    `;
    
    cartItems.appendChild(cartItem);
    total += item.price * item.quantity;
  });
  
  cartTotal.textContent = total.toFixed(2);
}

// Update quantity
function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(item => item.id !== productId);
    }
    updateCartUI();
  }
}

// Filter products
function filterProducts(category) {
  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(product => product.category === category);
  
  displayProducts(filteredProducts);
}

// Setup event listeners
function setupEventListeners() {
  // Filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterProducts(button.dataset.filter);
    });
  });
  
  // Cart modal
  cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
  });
  
  closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });
  
  window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = 'none';
    }
  });
  
  // Mobile menu
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Category cards click
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      filterButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelector(`[data-filter="${category}"]`).classList.add('active');
      filterProducts(category);
      
      // Scroll to products section
      document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // CTA button click
  document.querySelector('.cta-button').addEventListener('click', () => {
    document.getElementById('products').scrollIntoView({
      behavior: 'smooth'
    });
  });
  
  // Contact form
  document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Message sent successfully!');
    e.target.reset();
  });
  
  // Checkout button
  document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length > 0) {
      showNotification('Redirecting to checkout...');
      cartModal.style.display = 'none';
    } else {
      showNotification('Your cart is empty!');
    }
  });
}

// Scroll animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);
  
  // Observe elements for scroll animations
  document.querySelectorAll('.category-card, .product-card, .feature, .contact-item').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
  });
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #4ade80;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    z-index: 3000;
    font-weight: 500;
    animation: slideInRight 0.3s ease-out;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Search functionality
document.querySelector('.fa-search').addEventListener('click', () => {
  const searchTerm = prompt('Search for cricket products:');
  if (searchTerm) {
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredProducts.length > 0) {
      displayProducts(filteredProducts);
      filterButtons.forEach(btn => btn.classList.remove('active'));
      showNotification(`Found ${filteredProducts.length} products for "${searchTerm}"`);
    } else {
      showNotification(`No products found for "${searchTerm}"`);
    }
  }
});

// Add loading animation for product images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
  });
});

console.log('CricketZone website loaded successfully!');