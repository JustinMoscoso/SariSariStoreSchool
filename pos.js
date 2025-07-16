// Sample product data
const productsData = [
  {
    id: 1,
    name: "Coca-Cola",
    category: "beverage",
    price: 15.0,
    stock: 24,
    emoji: "🥤",
    barcode: "1234567890123",
    favorite: true,
  },
  {
    id: 2,
    name: "Instant Noodles",
    category: "food",
    price: 12.0,
    stock: 5,
    emoji: "🍜",
    barcode: "2345678901234",
    favorite: false,
  },
  {
    id: 3,
    name: "Coffee 3-in-1",
    category: "beverage",
    price: 8.0,
    stock: 0,
    emoji: "☕",
    barcode: "3456789012345",
    favorite: true,
  },
  {
    id: 4,
    name: "White Bread",
    category: "food",
    price: 45.0,
    stock: 12,
    emoji: "🍞",
    barcode: "4567890123456",
    favorite: false,
  },
  {
    id: 5,
    name: "Potato Chips",
    category: "snacks",
    price: 18.0,
    stock: 8,
    emoji: "🥔",
    barcode: "5678901234567",
    favorite: true,
  },
  {
    id: 6,
    name: "Shampoo Sachet",
    category: "household",
    price: 5.0,
    stock: 30,
    emoji: "🧴",
    barcode: "6789012345678",
    favorite: false,
  },
  {
    id: 7,
    name: "Rice",
    category: "food",
    price: 50.0,
    stock: 2,
    emoji: "🍚",
    barcode: "7890123456789",
    favorite: false,
  },
  {
    id: 8,
    name: "Soft Drinks",
    category: "beverage",
    price: 20.0,
    stock: 15,
    emoji: "🥤",
    barcode: "8901234567890",
    favorite: true,
  },
]

// Global variables
let cart = []
let currentFilter = ""
let currentSearch = ""
let selectedPaymentMethod = "cash"
let currentDiscount = { type: null, value: 0 }
let transactionNumber = 1001

// DOM Elements
const productsGrid = document.getElementById("productsGrid")
const cartItems = document.getElementById("cartItems")
const productSearch = document.getElementById("productSearch")
const categoryFilter = document.getElementById("categoryFilter")
const subtotalElement = document.getElementById("subtotal")
const taxElement = document.getElementById("tax")
const discountElement = document.getElementById("discount")
const totalElement = document.getElementById("total")
const amountReceivedInput = document.getElementById("amountReceived")
const changeDisplay = document.getElementById("changeDisplay")
const changeAmount = document.getElementById("changeAmount")
const checkoutBtn = document.getElementById("checkoutBtn")

// Modal elements
const addProductModal = document.getElementById("addProductModal")
const receiptModal = document.getElementById("receiptModal")
const discountModal = document.getElementById("discountModal")
const scannerModal = document.getElementById("scannerModal")
const loadingOverlay = document.getElementById("loadingOverlay")

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  renderProducts()
  renderCart()
  setupEventListeners()
  updateCartSummary()
})

// Setup event listeners
function setupEventListeners() {
  // Search and filters
  productSearch.addEventListener("input", handleSearch)
  categoryFilter.addEventListener("change", handleFilter)

  // Product actions
  document.getElementById("addProductBtn").addEventListener("click", () => openModal(addProductModal))
  document.getElementById("scanBtn").addEventListener("click", () => openModal(scannerModal))

  // Cart actions
  document.getElementById("clearCartBtn").addEventListener("click", clearCart)
  document.getElementById("holdSaleBtn").addEventListener("click", holdSale)

  // Payment methods
  document.querySelectorAll(".payment-method").forEach((btn) => {
    btn.addEventListener("click", (e) => selectPaymentMethod(e.target.closest(".payment-method")))
  })

  // Amount input
  amountReceivedInput.addEventListener("input", calculateChange)

  // Quick amounts
  document.querySelectorAll(".quick-amount").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.id === "exactAmount") {
        setExactAmount()
      } else {
        setQuickAmount(Number.parseFloat(e.target.dataset.amount))
      }
    })
  })

  // Checkout
  checkoutBtn.addEventListener("click", processCheckout)

  // Customer and discount
  document.getElementById("addCustomerBtn").addEventListener("click", addCustomer)
  document.getElementById("addDiscountBtn").addEventListener("click", () => openModal(discountModal))

  // Quick actions
  document.getElementById("lowStockBtn").addEventListener("click", showLowStock)
  document.getElementById("favoritesBtn").addEventListener("click", showFavorites)
  document.getElementById("recentBtn").addEventListener("click", showRecent)

  // Modal close buttons
  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", closeAllModals)
  })

  // Form submissions
  document.getElementById("addProductForm").addEventListener("submit", handleAddProduct)
  document.getElementById("applyDiscount").addEventListener("click", applyDiscount)
  document.getElementById("searchBarcode").addEventListener("click", searchByBarcode)

  // Receipt actions
  document.getElementById("printReceiptBtn").addEventListener("click", printReceipt)
  document.getElementById("newSaleBtn").addEventListener("click", startNewSale)

  // Cancel buttons
  document.getElementById("cancelAddProduct").addEventListener("click", closeAllModals)
  document.getElementById("cancelDiscount").addEventListener("click", closeAllModals)

  // Close modals when clicking outside
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeAllModals()
      }
    })
  })

  // Keyboard shortcuts
  document.addEventListener("keydown", handleKeyboardShortcuts)
}

// Render products grid
function renderProducts(products = productsData) {
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(currentSearch.toLowerCase())
    const matchesFilter = !currentFilter || product.category === currentFilter
    return matchesSearch && matchesFilter
  })

  productsGrid.innerHTML = filteredProducts
    .map((product) => {
      const stockClass = product.stock === 0 ? "out" : product.stock <= 5 ? "low" : ""
      const cardClass = product.stock === 0 ? "out-of-stock" : ""

      return `
            <div class="product-card ${cardClass}" onclick="addToCart(${product.id})">
                <div class="product-stock ${stockClass}">${product.stock}</div>
                <div class="product-emoji">${product.emoji}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-price">₱${product.price.toFixed(2)}</div>
            </div>
        `
    })
    .join("")

  // Add animation delay
  document.querySelectorAll(".product-card").forEach((card, index) => {
    card.style.animationDelay = `${index * 0.05}s`
  })
}

// Add product to cart
function addToCart(productId) {
  const product = productsData.find((p) => p.id === productId)
  if (!product || product.stock === 0) {
    showNotification("Product is out of stock!", "error")
    return
  }

  const existingItem = cart.find((item) => item.id === productId)
  if (existingItem) {
    if (existingItem.quantity < product.stock) {
      existingItem.quantity += 1
      showNotification(`${product.name} quantity updated`, "success")
    } else {
      showNotification("Not enough stock available!", "warning")
      return
    }
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      quantity: 1,
      emoji: product.emoji,
    })
    showNotification(`${product.name} added to cart`, "success")
  }

  renderCart()
  updateCartSummary()
  animateCartUpdate()
}

// Render cart items
function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>No items in cart</p>
                <span>Scan or select products to add them here</span>
            </div>
        `
    return
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.emoji} ${item.name}</div>
                <div class="cart-item-price">₱${item.price.toFixed(2)} each</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)" ${
                  item.quantity <= 1 ? "disabled" : ""
                }>
                    <i class="fas fa-minus"></i>
                </button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `,
    )
    .join("")
}

// Update item quantity
function updateQuantity(productId, change) {
  const cartItem = cart.find((item) => item.id === productId)
  const product = productsData.find((p) => p.id === productId)

  if (!cartItem || !product) return

  const newQuantity = cartItem.quantity + change

  if (newQuantity <= 0) {
    removeFromCart(productId)
    return
  }

  if (newQuantity > product.stock) {
    showNotification("Not enough stock available!", "warning")
    return
  }

  cartItem.quantity = newQuantity
  renderCart()
  updateCartSummary()
}

// Remove item from cart
function removeFromCart(productId) {
  const itemIndex = cart.findIndex((item) => item.id === productId)
  if (itemIndex > -1) {
    const item = cart[itemIndex]
    cart.splice(itemIndex, 1)
    showNotification(`${item.name} removed from cart`, "info")
    renderCart()
    updateCartSummary()
  }
}

// Clear entire cart
function clearCart() {
  if (cart.length === 0) return

  if (confirm("Are you sure you want to clear the cart?")) {
    cart = []
    currentDiscount = { type: null, value: 0 }
    renderCart()
    updateCartSummary()
    showNotification("Cart cleared", "info")
  }
}

// Update cart summary
function updateCartSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.12 // 12% VAT

  let discountAmount = 0
  if (currentDiscount.type === "percentage") {
    discountAmount = subtotal * (currentDiscount.value / 100)
  } else if (currentDiscount.type === "fixed") {
    discountAmount = currentDiscount.value
  }

  const total = subtotal + tax - discountAmount

  subtotalElement.textContent = `₱${subtotal.toFixed(2)}`
  taxElement.textContent = `₱${tax.toFixed(2)}`
  discountElement.textContent = `-₱${discountAmount.toFixed(2)}`
  totalElement.textContent = `₱${total.toFixed(2)}`

  // Show/hide discount row
  const discountRow = document.getElementById("discountRow")
  if (discountAmount > 0) {
    discountRow.style.display = "flex"
  } else {
    discountRow.style.display = "none"
  }

  // Update checkout button state
  checkoutBtn.disabled = cart.length === 0
  calculateChange()
}

// Handle search
function handleSearch(e) {
  currentSearch = e.target.value
  renderProducts()
}

// Handle category filter
function handleFilter(e) {
  currentFilter = e.target.value
  renderProducts()
}

// Select payment method
function selectPaymentMethod(button) {
  document.querySelectorAll(".payment-method").forEach((btn) => btn.classList.remove("active"))
  button.classList.add("active")
  selectedPaymentMethod = button.dataset.method

  // Show/hide cash payment input
  const cashPayment = document.getElementById("cashPayment")
  if (selectedPaymentMethod === "cash") {
    cashPayment.style.display = "block"
  } else {
    cashPayment.style.display = "none"
    changeDisplay.style.display = "none"
  }
}

// Calculate change
function calculateChange() {
  if (selectedPaymentMethod !== "cash") return

  const total = Number.parseFloat(totalElement.textContent.replace("₱", "").replace(",", ""))
  const received = Number.parseFloat(amountReceivedInput.value) || 0

  if (received >= total && total > 0) {
    const change = received - total
    changeAmount.textContent = `₱${change.toFixed(2)}`
    changeDisplay.style.display = "block"
    checkoutBtn.disabled = false
  } else {
    changeDisplay.style.display = "none"
    checkoutBtn.disabled = cart.length === 0 || (selectedPaymentMethod === "cash" && received < total)
  }
}

// Set quick amount
function setQuickAmount(amount) {
  amountReceivedInput.value = amount.toFixed(2)
  calculateChange()

  // Highlight selected amount
  document.querySelectorAll(".quick-amount").forEach((btn) => btn.classList.remove("active"))
  document.querySelector(`[data-amount="${amount}"]`).classList.add("active")
}

// Set exact amount
function setExactAmount() {
  const total = Number.parseFloat(totalElement.textContent.replace("₱", "").replace(",", ""))
  amountReceivedInput.value = total.toFixed(2)
  calculateChange()

  // Highlight exact button
  document.querySelectorAll(".quick-amount").forEach((btn) => btn.classList.remove("active"))
  document.getElementById("exactAmount").classList.add("active")
}

// Process checkout
function processCheckout() {
  if (cart.length === 0) return

  showLoading()

  // Simulate processing time
  setTimeout(() => {
    hideLoading()

    // Update product stock
    cart.forEach((cartItem) => {
      const product = productsData.find((p) => p.id === cartItem.id)
      if (product) {
        product.stock -= cartItem.quantity
      }
    })

    // Generate receipt
    generateReceipt()

    // Show receipt modal
    openModal(receiptModal)

    showNotification("Transaction completed successfully!", "success")
  }, 2000)
}

// Generate receipt
function generateReceipt() {
  const receipt = document.getElementById("receipt")
  const now = new Date()
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.12

  let discountAmount = 0
  if (currentDiscount.type === "percentage") {
    discountAmount = subtotal * (currentDiscount.value / 100)
  } else if (currentDiscount.type === "fixed") {
    discountAmount = currentDiscount.value
  }

  const total = subtotal + tax - discountAmount
  const received = Number.parseFloat(amountReceivedInput.value) || total
  const change = selectedPaymentMethod === "cash" ? received - total : 0

  receipt.innerHTML = `
    <div class="receipt-header">
      <h3>SARISARI STORE</h3>
      <p>Your Neighborhood Store</p>
      <p>123 Main Street, Barangay Centro</p>
      <p>Tel: (02) 123-4567</p>
    </div>
    
    <div class="receipt-info">
      <div>Transaction #: ${transactionNumber}</div>
      <div>Date: ${now.toLocaleDateString()}</div>
      <div>Time: ${now.toLocaleTimeString()}</div>
      <div>Cashier: Admin</div>
    </div>
    
    <div class="receipt-items">
      ${cart
        .map(
          (item) => `
        <div class="receipt-item">
          <div>${item.name}</div>
          <div>${item.quantity} x ₱${item.price.toFixed(2)} = ₱${(item.quantity * item.price).toFixed(2)}</div>
        </div>
      `,
        )
        .join("")}
    </div>
    
    <div class="receipt-summary">
      <div class="receipt-item">
        <div>Subtotal:</div>
        <div>₱${subtotal.toFixed(2)}</div>
      </div>
      <div class="receipt-item">
        <div>VAT (12%):</div>
        <div>₱${tax.toFixed(2)}</div>
      </div>
      ${
        discountAmount > 0
          ? `
        <div class="receipt-item">
          <div>Discount:</div>
          <div>-₱${discountAmount.toFixed(2)}</div>
        </div>
      `
          : ""
      }
      <div class="receipt-item receipt-total">
        <div>TOTAL:</div>
        <div>₱${total.toFixed(2)}</div>
      </div>
      ${
        selectedPaymentMethod === "cash"
          ? `
        <div class="receipt-item">
          <div>Cash:</div>
          <div>₱${received.toFixed(2)}</div>
        </div>
        <div class="receipt-item">
          <div>Change:</div>
          <div>₱${change.toFixed(2)}</div>
        </div>
      `
          : `
        <div class="receipt-item">
          <div>Payment:</div>
          <div>${selectedPaymentMethod.toUpperCase()}</div>
        </div>
      `
      }
    </div>
    
    <div style="text-align: center; margin-top: 1rem; font-size: 0.75rem;">
      <p>Thank you for your purchase!</p>
      <p>Please come again!</p>
    </div>
  `

  transactionNumber++
}

// Start new sale
function startNewSale() {
  cart = []
  currentDiscount = { type: null, value: 0 }
  amountReceivedInput.value = ""
  selectedPaymentMethod = "cash"

  // Reset payment method selection
  document.querySelectorAll(".payment-method").forEach((btn) => btn.classList.remove("active"))
  document.querySelector('[data-method="cash"]').classList.add("active")

  // Reset quick amounts
  document.querySelectorAll(".quick-amount").forEach((btn) => btn.classList.remove("active"))

  renderCart()
  updateCartSummary()
  closeAllModals()

  showNotification("New sale started", "info")
}

// Print receipt
function printReceipt() {
  window.print()
}

// Hold sale
function holdSale() {
  if (cart.length === 0) {
    showNotification("No items in cart to hold", "warning")
    return
  }

  // In a real application, you would save this to localStorage or send to server
  const heldSale = {
    id: Date.now(),
    cart: [...cart],
    discount: { ...currentDiscount },
    timestamp: new Date().toISOString(),
  }

  // Save to localStorage for demo
  const heldSales = JSON.parse(localStorage.getItem("heldSales") || "[]")
  heldSales.push(heldSale)
  localStorage.setItem("heldSales", JSON.stringify(heldSales))

  // Clear current sale
  cart = []
  currentDiscount = { type: null, value: 0 }
  renderCart()
  updateCartSummary()

  showNotification("Sale held successfully", "success")
}

// Add customer
function addCustomer() {
  const customerName = prompt("Enter customer name:")
  if (customerName) {
    showNotification(`Customer ${customerName} added to sale`, "success")
    // In a real application, you would handle customer data properly
  }
}

// Apply discount
function applyDiscount() {
  const discountType = document.querySelector('input[name="discountType"]:checked').value
  let discountValue = 0

  if (discountType === "percentage") {
    discountValue = Number.parseFloat(document.getElementById("percentageDiscount").value) || 0
    if (discountValue < 0 || discountValue > 100) {
      showNotification("Percentage must be between 0 and 100", "error")
      return
    }
  } else {
    discountValue = Number.parseFloat(document.getElementById("fixedDiscount").value) || 0
    if (discountValue < 0) {
      showNotification("Discount amount cannot be negative", "error")
      return
    }
  }

  currentDiscount = { type: discountType, value: discountValue }
  updateCartSummary()
  closeAllModals()

  const discountText = discountType === "percentage" ? `${discountValue}% discount` : `₱${discountValue} discount`
  showNotification(`${discountText} applied`, "success")
}

// Show low stock products
function showLowStock() {
  const lowStockProducts = productsData.filter((product) => product.stock <= 5 && product.stock > 0)
  renderProducts(lowStockProducts)
  showNotification(`Showing ${lowStockProducts.length} low stock items`, "info")
}

// Show favorite products
function showFavorites() {
  const favoriteProducts = productsData.filter((product) => product.favorite)
  renderProducts(favoriteProducts)
  showNotification(`Showing ${favoriteProducts.length} favorite items`, "info")
}

// Show recent products (mock implementation)
function showRecent() {
  // In a real application, you would track recently sold items
  const recentProducts = productsData.slice(0, 4)
  renderProducts(recentProducts)
  showNotification("Showing recent items", "info")
}

// Handle add product form
function handleAddProduct(e) {
  e.preventDefault()

  const newProduct = {
    id: Date.now(),
    name: document.getElementById("newProductName").value,
    category: document.getElementById("newProductCategory").value,
    price: Number.parseFloat(document.getElementById("newProductPrice").value),
    stock: Number.parseInt(document.getElementById("newProductStock").value),
    barcode: document.getElementById("newProductBarcode").value,
    emoji: getRandomEmoji(),
    favorite: false,
  }

  productsData.push(newProduct)
  renderProducts()
  closeAllModals()

  // Reset form
  document.getElementById("addProductForm").reset()

  showNotification(`${newProduct.name} added successfully`, "success")
}

// Search by barcode
function searchByBarcode() {
  const barcode = document.getElementById("manualBarcode").value.trim()
  if (!barcode) {
    showNotification("Please enter a barcode", "warning")
    return
  }

  const product = productsData.find((p) => p.barcode === barcode)
  if (product) {
    addToCart(product.id)
    closeAllModals()
    document.getElementById("manualBarcode").value = ""
  } else {
    showNotification("Product not found", "error")
  }
}

// Keyboard shortcuts
function handleKeyboardShortcuts(e) {
  // Prevent shortcuts when typing in inputs
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return

  switch (e.key) {
    case "F1":
      e.preventDefault()
      document.getElementById("scanBtn").click()
      break
    case "F2":
      e.preventDefault()
      document.getElementById("addProductBtn").click()
      break
    case "F3":
      e.preventDefault()
      if (cart.length > 0) checkoutBtn.click()
      break
    case "F4":
      e.preventDefault()
      clearCart()
      break
    case "Escape":
      closeAllModals()
      break
  }
}

// Utility functions
function openModal(modal) {
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach((modal) => {
    modal.classList.remove("active")
  })
  document.body.style.overflow = "auto"
}

function showLoading() {
  loadingOverlay.classList.add("active")
}

function hideLoading() {
  loadingOverlay.classList.remove("active")
}

function animateCartUpdate() {
  const cartHeader = document.querySelector(".cart-header h3")
  cartHeader.style.transform = "scale(1.1)"
  cartHeader.style.color = "var(--success-color)"

  setTimeout(() => {
    cartHeader.style.transform = "scale(1)"
    cartHeader.style.color = "var(--gray-900)"
  }, 300)
}

function getRandomEmoji() {
  const emojis = ["📦", "🥤", "🍜", "☕", "🧴", "🍞", "🍚", "🥔", "🍪", "🧽", "🧼", "🍫", "🥜", "🍯"]
  return emojis[Math.floor(Math.random() * emojis.length)]
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
    <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : type === "warning" ? "exclamation-triangle" : "info-circle"}"></i>
    <span>${message}</span>
  `

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : type === "warning" ? "#f59e0b" : "#2563eb"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    z-index: 3001;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// Add ripple effect to buttons
document.addEventListener("click", (e) => {
  if (e.target.matches("button") || e.target.closest("button")) {
    const button = e.target.matches("button") ? e.target : e.target.closest("button")
    const ripple = document.createElement("span")
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `

    const existingRipple = button.querySelector(".ripple")
    if (existingRipple) {
      existingRipple.remove()
    }

    ripple.classList.add("ripple")
    button.style.position = "relative"
    button.style.overflow = "hidden"
    button.appendChild(ripple)

    setTimeout(() => {
      if (button.contains(ripple)) {
        ripple.remove()
      }
    }, 600)
  }
})

// Add CSS for ripple animation
const style = document.createElement("style")
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)

console.log("SariSari POS System - Ready!")
console.log("Keyboard shortcuts:")
console.log("F1 - Open Scanner")
console.log("F2 - Add Product")
console.log("F3 - Checkout")
console.log("F4 - Clear Cart")
console.log("ESC - Close Modals")
