// Sample inventory data
const inventoryData = [
  {
    id: 1,
    name: "Coca-Cola",
    category: "beverage",
    stock: 24,
    price: 15.0,
    barcode: "1234567890123",
    lowStockThreshold: 10,
    description: "Classic Coca-Cola 330ml",
    lastUpdated: "2024-01-15",
    emoji: "🥤",
  },
  {
    id: 2,
    name: "Instant Noodles",
    category: "food",
    stock: 5,
    price: 12.0,
    barcode: "2345678901234",
    lowStockThreshold: 8,
    description: "Lucky Me Pancit Canton",
    lastUpdated: "2024-01-14",
    emoji: "🍜",
  },
  {
    id: 3,
    name: "Coffee 3-in-1",
    category: "beverage",
    stock: 0,
    price: 8.0,
    barcode: "3456789012345",
    lowStockThreshold: 5,
    description: "Nescafe 3-in-1 Original",
    lastUpdated: "2024-01-13",
    emoji: "☕",
  },
  {
    id: 4,
    name: "White Vinegar",
    category: "condiment",
    stock: 12,
    price: 25.0,
    barcode: "4567890123456",
    lowStockThreshold: 5,
    description: "Datu Puti White Vinegar 385ml",
    lastUpdated: "2024-01-15",
    emoji: "🧴",
  },
  {
    id: 5,
    name: "Bread Loaf",
    category: "food",
    stock: 8,
    price: 45.0,
    barcode: "5678901234567",
    lowStockThreshold: 3,
    description: "Gardenia Classic White Bread",
    lastUpdated: "2024-01-15",
    emoji: "🍞",
  },
  {
    id: 6,
    name: "Shampoo Sachet",
    category: "household",
    stock: 30,
    price: 5.0,
    barcode: "6789012345678",
    lowStockThreshold: 15,
    description: "Head & Shoulders 12ml",
    lastUpdated: "2024-01-14",
    emoji: "🧴",
  },
  {
    id: 7,
    name: "Rice",
    category: "food",
    stock: 2,
    price: 50.0,
    barcode: "7890123456789",
    lowStockThreshold: 5,
    description: "Premium Rice 1kg",
    lastUpdated: "2024-01-12",
    emoji: "🍚",
  },
  {
    id: 8,
    name: "Potato Chips",
    category: "snacks",
    stock: 15,
    price: 18.0,
    barcode: "8901234567890",
    lowStockThreshold: 8,
    description: "Pringles Original 110g",
    lastUpdated: "2024-01-15",
    emoji: "🥔",
  },
]

// Global variables
let currentPage = 1
const itemsPerPage = 10
let filteredData = [...inventoryData]
const selectedItems = new Set()
let currentView = "table"
let editingItem = null

// DOM Elements
const searchInput = document.getElementById("searchInput")
const categoryFilter = document.getElementById("categoryFilter")
const statusFilter = document.getElementById("statusFilter")
const inventoryTableBody = document.getElementById("inventoryTableBody")
const productsGrid = document.getElementById("productsGrid")
const tableView = document.getElementById("tableView")
const gridView = document.getElementById("gridView")
const viewToggle = document.getElementById("viewToggle")
const selectAllCheckbox = document.getElementById("selectAll")
const addItemBtn = document.getElementById("addItemBtn")
const bulkActionsBtn = document.getElementById("bulkActionsBtn")
const refreshBtn = document.getElementById("refreshBtn")
const exportBtn = document.getElementById("exportBtn")

// Modal elements
const itemModal = document.getElementById("itemModal")
const restockModal = document.getElementById("restockModal")
const bulkModal = document.getElementById("bulkModal")
const loadingOverlay = document.getElementById("loadingOverlay")

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  updateSummaryCards()
  renderInventory()
  setupEventListeners()
  updatePagination()
})

// Setup event listeners
function setupEventListeners() {
  // Search and filters
  searchInput.addEventListener("input", handleSearch)
  categoryFilter.addEventListener("change", handleFilters)
  statusFilter.addEventListener("change", handleFilters)

  // View toggle
  viewToggle.addEventListener("click", toggleView)

  // Select all checkbox
  selectAllCheckbox.addEventListener("change", handleSelectAll)

  // Buttons
  addItemBtn.addEventListener("click", () => openItemModal())
  bulkActionsBtn.addEventListener("click", () => openBulkModal())
  refreshBtn.addEventListener("click", handleRefresh)
  exportBtn.addEventListener("click", handleExport)

  // Modal close buttons
  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", closeAllModals)
  })

  // Form submissions
  document.getElementById("itemForm").addEventListener("submit", handleItemSubmit)
  document.getElementById("restockForm").addEventListener("submit", handleRestockSubmit)

  // Cancel buttons
  document.getElementById("cancelBtn").addEventListener("click", closeAllModals)
  document.getElementById("restockCancelBtn").addEventListener("click", closeAllModals)

  // Bulk action buttons
  document.getElementById("bulkRestockBtn").addEventListener("click", handleBulkRestock)
  document.getElementById("bulkCategoryBtn").addEventListener("click", handleBulkCategory)
  document.getElementById("bulkDeleteBtn").addEventListener("click", handleBulkDelete)

  // Close modals when clicking outside
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeAllModals()
      }
    })
  })

  // Pagination
  document.getElementById("prevBtn").addEventListener("click", () => changePage(currentPage - 1))
  document.getElementById("nextBtn").addEventListener("click", () => changePage(currentPage + 1))
}

// Update summary cards
function updateSummaryCards() {
  const totalItems = inventoryData.length
  const lowStockItems = inventoryData.filter((item) => item.stock <= item.lowStockThreshold && item.stock > 0).length
  const outOfStockItems = inventoryData.filter((item) => item.stock === 0).length
  const totalValue = inventoryData.reduce((sum, item) => sum + item.stock * item.price, 0)

  document.getElementById("totalItems").textContent = totalItems
  document.getElementById("lowStockItems").textContent = lowStockItems
  document.getElementById("outOfStockItems").textContent = outOfStockItems
  document.getElementById("totalValue").textContent = `₱${totalValue.toLocaleString()}`

  // Animate the numbers
  animateNumbers()
}

// Animate number counting
function animateNumbers() {
  const numberElements = document.querySelectorAll(".summary-value")
  numberElements.forEach((element) => {
    const finalValue = element.textContent
    const numericValue = Number.parseFloat(finalValue.replace(/[₱,]/g, ""))

    if (!isNaN(numericValue)) {
      animateNumber(element, 0, numericValue, 1000, finalValue.includes("₱"))
    }
  })
}

function animateNumber(element, start, end, duration, isCurrency = false) {
  const startTime = performance.now()

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const current = start + (end - start) * easeOutQuart(progress)
    const formatted = isCurrency ? "₱" + Math.floor(current).toLocaleString() : Math.floor(current).toString()

    element.textContent = formatted

    if (progress < 1) {
      requestAnimationFrame(updateNumber)
    }
  }

  requestAnimationFrame(updateNumber)
}

function easeOutQuart(t) {
  return 1 - --t * t * t * t
}

// Handle search
function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase()
  filteredData = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm),
  )
  currentPage = 1
  renderInventory()
  updatePagination()
}

// Handle filters
function handleFilters() {
  const categoryValue = categoryFilter.value
  const statusValue = statusFilter.value

  filteredData = inventoryData.filter((item) => {
    const categoryMatch = !categoryValue || item.category === categoryValue
    let statusMatch = true

    if (statusValue === "in-stock") {
      statusMatch = item.stock > item.lowStockThreshold
    } else if (statusValue === "low-stock") {
      statusMatch = item.stock <= item.lowStockThreshold && item.stock > 0
    } else if (statusValue === "out-of-stock") {
      statusMatch = item.stock === 0
    }

    return categoryMatch && statusMatch
  })

  currentPage = 1
  renderInventory()
  updatePagination()
}

// Toggle view between table and grid
function toggleView() {
  currentView = currentView === "table" ? "grid" : "table"

  if (currentView === "table") {
    tableView.classList.add("active")
    gridView.classList.remove("active")
    viewToggle.innerHTML = '<i class="fas fa-th-large"></i> Grid View'
  } else {
    tableView.classList.remove("active")
    gridView.classList.add("active")
    viewToggle.innerHTML = '<i class="fas fa-table"></i> Table View'
  }

  renderInventory()
}

// Render inventory based on current view
function renderInventory() {
  if (currentView === "table") {
    renderTableView()
  } else {
    renderGridView()
  }
}

// Render table view
function renderTableView() {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const pageData = filteredData.slice(startIndex, endIndex)

  inventoryTableBody.innerHTML = pageData
    .map((item) => {
      const status = getItemStatus(item)
      const stockPercentage = Math.min((item.stock / (item.lowStockThreshold * 2)) * 100, 100)

      return `
            <tr class="${status === "out-of-stock" ? "table-danger" : status === "low-stock" ? "table-warning" : ""}">
                <td>
                    <input type="checkbox" class="checkbox item-checkbox" data-id="${item.id}" 
                           ${selectedItems.has(item.id) ? "checked" : ""}>
                </td>
                <td>
                    <div class="product-info">
                        <div class="product-avatar">${item.emoji}</div>
                        <div class="product-details">
                            <h4>${item.name}</h4>
                            <p>${item.description}</p>
                        </div>
                    </div>
                </td>
                <td><span class="badge bg-secondary">${item.category}</span></td>
                <td>
                    <div class="stock-indicator">
                        <span>${item.stock}</span>
                        <div class="stock-bar">
                            <div class="stock-fill ${getStockLevel(item)}" style="width: ${stockPercentage}%"></div>
                        </div>
                    </div>
                </td>
                <td><strong>₱${item.price.toFixed(2)}</strong></td>
                <td><strong>₱${(item.stock * item.price).toFixed(2)}</strong></td>
                <td><span class="status-badge ${status}">${formatStatus(status)}</span></td>
                <td>${formatDate(item.lastUpdated)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-warning btn-sm" onclick="openRestockModal(${item.id})">
                            <i class="fas fa-plus"></i> Restock
                        </button>
                        <button class="btn-secondary btn-sm" onclick="editItem(${item.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn-danger btn-sm" onclick="deleteItem(${item.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </td>
            </tr>
        `
    })
    .join("")

  // Add event listeners to checkboxes
  document.querySelectorAll(".item-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", handleItemSelection)
  })
}

// Render grid view
function renderGridView() {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const pageData = filteredData.slice(startIndex, endIndex)

  productsGrid.innerHTML = pageData
    .map((item) => {
      const status = getItemStatus(item)

      return `
            <div class="product-card">
                <div class="product-card-header">
                    <div class="product-card-info">
                        <h4>${item.name}</h4>
                        <p>${item.category}</p>
                    </div>
                    <div class="product-avatar">${item.emoji}</div>
                </div>
                <div class="product-card-stats">
                    <div class="stat-row">
                        <span class="stat-label">Stock:</span>
                        <span class="stat-value">${item.stock}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Price:</span>
                        <span class="stat-value">₱${item.price.toFixed(2)}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Value:</span>
                        <span class="stat-value">₱${(item.stock * item.price).toFixed(2)}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Status:</span>
                        <span class="status-badge ${status}">${formatStatus(status)}</span>
                    </div>
                </div>
                <div class="product-card-actions">
                    <button class="btn-warning btn-sm" onclick="openRestockModal(${item.id})">
                        <i class="fas fa-plus"></i> Restock
                    </button>
                    <button class="btn-secondary btn-sm" onclick="editItem(${item.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-danger btn-sm" onclick="deleteItem(${item.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `
    })
    .join("")
}

// Utility functions
function getItemStatus(item) {
  if (item.stock === 0) return "out-of-stock"
  if (item.stock <= item.lowStockThreshold) return "low-stock"
  return "in-stock"
}

function getStockLevel(item) {
  if (item.stock === 0) return "low"
  if (item.stock <= item.lowStockThreshold) return "medium"
  return "high"
}

function formatStatus(status) {
  switch (status) {
    case "in-stock":
      return "In Stock"
    case "low-stock":
      return "Low Stock"
    case "out-of-stock":
      return "Out of Stock"
    default:
      return status
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

// Handle item selection
function handleItemSelection(e) {
  const itemId = Number.parseInt(e.target.dataset.id)
  if (e.target.checked) {
    selectedItems.add(itemId)
  } else {
    selectedItems.delete(itemId)
  }
  updateSelectAllCheckbox()
  updateBulkActionsButton()
}

// Handle select all
function handleSelectAll(e) {
  const checkboxes = document.querySelectorAll(".item-checkbox")
  checkboxes.forEach((checkbox) => {
    checkbox.checked = e.target.checked
    const itemId = Number.parseInt(checkbox.dataset.id)
    if (e.target.checked) {
      selectedItems.add(itemId)
    } else {
      selectedItems.delete(itemId)
    }
  })
  updateBulkActionsButton()
}

// Update select all checkbox state
function updateSelectAllCheckbox() {
  const checkboxes = document.querySelectorAll(".item-checkbox")
  const checkedBoxes = document.querySelectorAll(".item-checkbox:checked")
  selectAllCheckbox.checked = checkboxes.length > 0 && checkboxes.length === checkedBoxes.length
  selectAllCheckbox.indeterminate = checkedBoxes.length > 0 && checkedBoxes.length < checkboxes.length
}

// Update bulk actions button
function updateBulkActionsButton() {
  const count = selectedItems.size
  bulkActionsBtn.textContent = count > 0 ? `Bulk Actions (${count})` : "Bulk Actions"
  bulkActionsBtn.disabled = count === 0
}

// Pagination functions
function updatePagination() {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, filteredData.length)

  document.getElementById("showingStart").textContent = startItem
  document.getElementById("showingEnd").textContent = endItem
  document.getElementById("totalRecords").textContent = filteredData.length

  document.getElementById("prevBtn").disabled = currentPage === 1
  document.getElementById("nextBtn").disabled = currentPage === totalPages

  renderPaginationNumbers(totalPages)
}

function renderPaginationNumbers(totalPages) {
  const paginationNumbers = document.getElementById("paginationNumbers")
  const maxVisible = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  const endPage = Math.min(totalPages, startPage + maxVisible - 1)

  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1)
  }

  let html = ""
  for (let i = startPage; i <= endPage; i++) {
    html += `
            <button class="page-number ${i === currentPage ? "active" : ""}" onclick="changePage(${i})">
                ${i}
            </button>
        `
  }

  paginationNumbers.innerHTML = html
}

function changePage(page) {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  if (page >= 1 && page <= totalPages) {
    currentPage = page
    renderInventory()
    updatePagination()
  }
}

// Modal functions
function openItemModal(item = null) {
  editingItem = item
  const modalTitle = document.getElementById("modalTitle")
  const form = document.getElementById("itemForm")

  if (item) {
    modalTitle.textContent = "Edit Item"
    document.getElementById("productName").value = item.name
    document.getElementById("productCategory").value = item.category
    document.getElementById("productPrice").value = item.price
    document.getElementById("productStock").value = item.stock
    document.getElementById("productBarcode").value = item.barcode || ""
    document.getElementById("lowStockThreshold").value = item.lowStockThreshold
    document.getElementById("productDescription").value = item.description || ""
  } else {
    modalTitle.textContent = "Add New Item"
    form.reset()
  }

  itemModal.classList.add("active")
}

function openRestockModal(itemId) {
  const item = inventoryData.find((i) => i.id === itemId)
  if (!item) return

  document.getElementById("restockProductName").textContent = item.name
  document.getElementById("currentStock").textContent = item.stock
  document.getElementById("restockQuantity").value = ""
  document.getElementById("restockCost").value = item.price
  document.getElementById("restockNotes").value = ""

  restockModal.classList.add("active")
  restockModal.dataset.itemId = itemId
}

function openBulkModal() {
  document.getElementById("selectedCount").textContent = selectedItems.size
  bulkModal.classList.add("active")
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach((modal) => {
    modal.classList.remove("active")
  })
  editingItem = null
}

// Form handlers
function handleItemSubmit(e) {
  e.preventDefault()
  showLoading()

  const formData = {
    name: document.getElementById("productName").value,
    category: document.getElementById("productCategory").value,
    price: Number.parseFloat(document.getElementById("productPrice").value),
    stock: Number.parseInt(document.getElementById("productStock").value),
    barcode: document.getElementById("productBarcode").value,
    lowStockThreshold: Number.parseInt(document.getElementById("lowStockThreshold").value),
    description: document.getElementById("productDescription").value,
    lastUpdated: new Date().toISOString().split("T")[0],
    emoji: getRandomEmoji(),
  }

  setTimeout(() => {
    if (editingItem) {
      // Update existing item
      const index = inventoryData.findIndex((item) => item.id === editingItem.id)
      inventoryData[index] = { ...editingItem, ...formData }
      showNotification("Item updated successfully!", "success")
    } else {
      // Add new item
      const newItem = {
        id: Date.now(),
        ...formData,
      }
      inventoryData.push(newItem)
      showNotification("Item added successfully!", "success")
    }

    updateSummaryCards()
    handleFilters() // Refresh filtered data
    renderInventory()
    updatePagination()
    closeAllModals()
    hideLoading()
  }, 1000)
}

function handleRestockSubmit(e) {
  e.preventDefault()
  showLoading()

  const itemId = Number.parseInt(restockModal.dataset.itemId)
  const quantity = Number.parseInt(document.getElementById("restockQuantity").value)
  const item = inventoryData.find((i) => i.id === itemId)

  setTimeout(() => {
    if (item) {
      item.stock += quantity
      item.lastUpdated = new Date().toISOString().split("T")[0]
      showNotification(`${item.name} restocked with ${quantity} units!`, "success")

      updateSummaryCards()
      handleFilters()
      renderInventory()
      closeAllModals()
    }
    hideLoading()
  }, 1000)
}

// Item actions
function editItem(itemId) {
  const item = inventoryData.find((i) => i.id === itemId)
  if (item) {
    openItemModal(item)
  }
}

function deleteItem(itemId) {
  if (confirm("Are you sure you want to delete this item?")) {
    showLoading()

    setTimeout(() => {
      const index = inventoryData.findIndex((item) => item.id === itemId)
      if (index > -1) {
        const deletedItem = inventoryData[index]
        inventoryData.splice(index, 1)
        selectedItems.delete(itemId)

        updateSummaryCards()
        handleFilters()
        renderInventory()
        updatePagination()
        updateBulkActionsButton()

        showNotification(`${deletedItem.name} deleted successfully!`, "success")
      }
      hideLoading()
    }, 500)
  }
}

// Bulk actions
function handleBulkRestock() {
  const quantity = prompt("Enter quantity to add to all selected items:")
  if (quantity && !isNaN(quantity) && Number.parseInt(quantity) > 0) {
    showLoading()

    setTimeout(() => {
      let updatedCount = 0
      selectedItems.forEach((itemId) => {
        const item = inventoryData.find((i) => i.id === itemId)
        if (item) {
          item.stock += Number.parseInt(quantity)
          item.lastUpdated = new Date().toISOString().split("T")[0]
          updatedCount++
        }
      })

      selectedItems.clear()
      updateSummaryCards()
      handleFilters()
      renderInventory()
      updateBulkActionsButton()
      closeAllModals()

      showNotification(`${updatedCount} items restocked successfully!`, "success")
      hideLoading()
    }, 1000)
  }
}

function handleBulkCategory() {
  const newCategory = prompt("Enter new category for selected items:")
  if (newCategory) {
    showLoading()

    setTimeout(() => {
      let updatedCount = 0
      selectedItems.forEach((itemId) => {
        const item = inventoryData.find((i) => i.id === itemId)
        if (item) {
          item.category = newCategory.toLowerCase()
          item.lastUpdated = new Date().toISOString().split("T")[0]
          updatedCount++
        }
      })

      selectedItems.clear()
      handleFilters()
      renderInventory()
      updateBulkActionsButton()
      closeAllModals()

      showNotification(`${updatedCount} items updated successfully!`, "success")
      hideLoading()
    }, 1000)
  }
}

function handleBulkDelete() {
  if (confirm(`Are you sure you want to delete ${selectedItems.size} selected items?`)) {
    showLoading()

    setTimeout(() => {
      const deletedCount = selectedItems.size
      selectedItems.forEach((itemId) => {
        const index = inventoryData.findIndex((item) => item.id === itemId)
        if (index > -1) {
          inventoryData.splice(index, 1)
        }
      })

      selectedItems.clear()
      updateSummaryCards()
      handleFilters()
      renderInventory()
      updatePagination()
      updateBulkActionsButton()
      closeAllModals()

      showNotification(`${deletedCount} items deleted successfully!`, "success")
      hideLoading()
    }, 1000)
  }
}

// Utility functions
function handleRefresh() {
  showLoading()

  setTimeout(() => {
    // Simulate data refresh
    inventoryData.forEach((item) => {
      item.lastUpdated = new Date().toISOString().split("T")[0]
    })

    updateSummaryCards()
    handleFilters()
    renderInventory()
    hideLoading()
    showNotification("Inventory refreshed successfully!", "success")
  }, 1500)
}

function handleExport() {
  showLoading()

  setTimeout(() => {
    // Simulate export process
    const csvContent = generateCSV()
    downloadCSV(csvContent, "inventory-export.csv")
    hideLoading()
    showNotification("Inventory exported successfully!", "success")
  }, 2000)
}

function generateCSV() {
  const headers = ["Name", "Category", "Stock", "Price", "Value", "Status", "Last Updated"]
  const rows = inventoryData.map((item) => [
    item.name,
    item.category,
    item.stock,
    item.price,
    (item.stock * item.price).toFixed(2),
    formatStatus(getItemStatus(item)),
    item.lastUpdated,
  ])

  return [headers, ...rows].map((row) => row.join(",")).join("\n")
}

function downloadCSV(content, filename) {
  const blob = new Blob([content], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(url)
}

function getRandomEmoji() {
  const emojis = ["📦", "🥤", "🍜", "☕", "🧴", "🍞", "🍚", "🥔", "🍪", "🧽", "🧼", "🍫", "🥜", "🍯"]
  return emojis[Math.floor(Math.random() * emojis.length)]
}

function showLoading() {
  loadingOverlay.classList.add("active")
}

function hideLoading() {
  loadingOverlay.classList.remove("active")
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
        <span>${message}</span>
    `

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : type === "error" ? "#ef4444" : "#2563eb"};
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

console.log("SariSari Inventory Management - Ready!")
