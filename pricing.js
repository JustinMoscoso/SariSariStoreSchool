// Global variables
let selectedPlan = null
let isYearlyBilling = false

// DOM Elements
const billingToggle = document.getElementById("billingToggle")
const planButtons = document.querySelectorAll(".btn-plan")
const planModal = document.getElementById("planModal")
const loadingOverlay = document.getElementById("loadingOverlay")
const faqItems = document.querySelectorAll(".faq-item")
const contactBtn = document.getElementById("contactBtn")
const startTrialBtn = document.getElementById("startTrialBtn")
const scheduleDemoBtn = document.getElementById("scheduleDemoBtn")

// Plan data
const planData = {
  transaction: {
    name: "Pay Per Transaction",
    monthlyPrice: 0,
    yearlyPrice: 0,
    transactionFee: "₱1-2 per sale",
    features: [
      "No monthly fees",
      "Full POS system access",
      "Basic inventory tracking",
      "Sales reporting",
      "Mobile & desktop app",
      "Email support",
    ],
    description: "Perfect for stores with less than 50 transactions per month",
  },
  monthly: {
    name: "Monthly Plan",
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      "Unlimited transactions",
      "Advanced analytics & reports",
      "Inventory alerts & automation",
      "Customer management",
      "Barcode scanning",
      "Data backup & sync",
      "Priority email support",
      "Multi-device access",
    ],
    description: "Best for growing stores with 50+ transactions per month",
  },
  yearly: {
    name: "Yearly Plan",
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      "All Monthly Plan features",
      "2 months free (20% savings)",
      "Priority phone support",
      "Advanced business insights",
      "Custom reports & exports",
      "API access for integrations",
      "White-label options",
      "Dedicated account manager",
      "Early access to new features",
    ],
    description: "Maximum value for established stores",
  },
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners()
  updatePricing()
})

// Setup event listeners
function setupEventListeners() {
  // Billing toggle
  billingToggle.addEventListener("change", handleBillingToggle)

  // Plan selection buttons
  planButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const plan = e.target.getAttribute("data-plan")
      selectPlan(plan)
    })
  })

  // FAQ items
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    question.addEventListener("click", () => toggleFAQ(item))
  })

  // Modal close buttons
  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", closeModal)
  })

  // Form submission
  document.getElementById("planForm").addEventListener("submit", handlePlanSubmission)

  // Cancel button
  document.getElementById("cancelPlanBtn").addEventListener("click", closeModal)

  // CTA buttons
  contactBtn.addEventListener("click", handleContactSales)
  startTrialBtn.addEventListener("click", handleStartTrial)
  scheduleDemoBtn.addEventListener("click", handleScheduleDemo)

  // Close modal when clicking outside
  planModal.addEventListener("click", (e) => {
    if (e.target === planModal) {
      closeModal()
    }
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && planModal.classList.contains("active")) {
      closeModal()
    }
  })
}

// Handle billing toggle
function handleBillingToggle() {
  isYearlyBilling = billingToggle.checked
  updatePricing()
  animatePriceChange()
}

// Update pricing display
function updatePricing() {
  const monthlyPriceElements = document.querySelectorAll(".monthly-price")
  const yearlyPriceElements = document.querySelectorAll(".yearly-price")
  const yearlyNotes = document.querySelectorAll(".yearly-note")

  if (isYearlyBilling) {
    // Show yearly pricing
    monthlyPriceElements.forEach((el) => {
      el.textContent = "79"
    })
    yearlyPriceElements.forEach((el) => {
      el.textContent = "948"
    })
    yearlyNotes.forEach((el) => {
      el.style.display = "block"
    })

    // Update button text
    document.querySelectorAll('[data-plan="monthly"] .btn-plan').forEach((btn) => {
      btn.innerHTML = btn.innerHTML.replace("Monthly", "Yearly")
    })
  } else {
    // Show monthly pricing
    monthlyPriceElements.forEach((el) => {
      el.textContent = "99"
    })
    yearlyPriceElements.forEach((el) => {
      el.textContent = "999"
    })
    yearlyNotes.forEach((el) => {
      el.style.display = "none"
    })

    // Update button text
    document.querySelectorAll('[data-plan="monthly"] .btn-plan').forEach((btn) => {
      btn.innerHTML = btn.innerHTML.replace("Yearly", "Monthly")
    })
  }
}

// Animate price changes
function animatePriceChange() {
  const priceElements = document.querySelectorAll(".amount")
  priceElements.forEach((el) => {
    el.style.transform = "scale(1.1)"
    el.style.color = "var(--primary-color)"
    setTimeout(() => {
      el.style.transform = "scale(1)"
      el.style.color = "var(--gray-900)"
    }, 300)
  })
}

// Select a plan
function selectPlan(planType) {
  selectedPlan = planType
  showPlanModal(planType)
}

// Show plan selection modal
function showPlanModal(planType) {
  const plan = planData[planType]
  const modalTitle = document.getElementById("modalTitle")
  const planSummary = document.getElementById("planSummary")

  // Update modal title
  modalTitle.textContent = `Subscribe to ${plan.name}`

  // Update plan summary
  let priceText = ""
  if (planType === "transaction") {
    priceText = plan.transactionFee
  } else if (planType === "yearly" || (planType === "monthly" && isYearlyBilling)) {
    priceText = `₱${plan.yearlyPrice}/month (billed yearly)`
  } else {
    priceText = `₱${plan.monthlyPrice}/month`
  }

  planSummary.innerHTML = `
        <h3>${plan.name}</h3>
        <div class="price">${priceText}</div>
        <div class="features">${plan.description}</div>
    `

  // Show modal
  planModal.classList.add("active")
  document.body.style.overflow = "hidden"
}

// Close modal
function closeModal() {
  planModal.classList.remove("active")
  document.body.style.overflow = "auto"
  selectedPlan = null
}

// Handle plan form submission
function handlePlanSubmission(e) {
  e.preventDefault()
  showLoading()

  // Get form data
  const formData = {
    plan: selectedPlan,
    storeName: document.getElementById("storeName").value,
    ownerName: document.getElementById("ownerName").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    emailAddress: document.getElementById("emailAddress").value,
    storeAddress: document.getElementById("storeAddress").value,
    paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
    billingCycle: isYearlyBilling ? "yearly" : "monthly",
  }

  // Simulate API call
  setTimeout(() => {
    hideLoading()
    closeModal()
    showSuccessMessage(formData)
    resetForm()
  }, 2000)
}

// Reset form
function resetForm() {
  document.getElementById("planForm").reset()
}

// Toggle FAQ items
function toggleFAQ(item) {
  const isActive = item.classList.contains("active")

  // Close all FAQ items
  faqItems.forEach((faq) => faq.classList.remove("active"))

  // Open clicked item if it wasn't active
  if (!isActive) {
    item.classList.add("active")
  }
}

// Handle contact sales
function handleContactSales() {
  showNotification("Redirecting to contact form...", "info")
  setTimeout(() => {
    // Simulate redirect to contact page
    window.location.href = "#contact"
  }, 1000)
}

// Handle start trial
function handleStartTrial() {
  selectPlan("monthly")
}

// Handle schedule demo
function handleScheduleDemo() {
  showNotification("Opening demo scheduler...", "info")
  setTimeout(() => {
    // Simulate opening demo scheduler
    alert("Demo scheduler would open here. Contact us at demo@sarisaristore.com")
  }, 1000)
}

// Show loading overlay
function showLoading() {
  loadingOverlay.classList.add("active")
}

// Hide loading overlay
function hideLoading() {
  loadingOverlay.classList.remove("active")
}

// Show success message
function showSuccessMessage(formData) {
  const plan = planData[formData.plan]
  let message = `Welcome to SariSari Store! Your ${plan.name} subscription is being processed.`

  if (formData.plan === "transaction") {
    message += " You can start using the system immediately with pay-per-transaction billing."
  } else {
    message += " You'll receive setup instructions via email shortly."
  }

  showNotification(message, "success", 5000)
}

// Show notification
function showNotification(message, type = "info", duration = 3000) {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <i class="fas fa-${
          type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"
        }"></i>
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
        max-width: 400px;
        word-wrap: break-word;
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
  }, duration)
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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".pricing-card, .faq-item").forEach((element) => {
  element.style.opacity = "0"
  element.style.transform = "translateY(30px)"
  element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(element)
})

// Form validation
function validateForm() {
  const requiredFields = ["storeName", "ownerName", "phoneNumber", "emailAddress"]
  let isValid = true

  requiredFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId)
    const value = field.value.trim()

    if (!value) {
      field.style.borderColor = "var(--danger-color)"
      isValid = false
    } else {
      field.style.borderColor = "var(--gray-300)"
    }
  })

  // Email validation
  const email = document.getElementById("emailAddress").value
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (email && !emailRegex.test(email)) {
    document.getElementById("emailAddress").style.borderColor = "var(--danger-color)"
    isValid = false
  }

  // Phone validation
  const phone = document.getElementById("phoneNumber").value
  const phoneRegex = /^[0-9+\-\s()]+$/
  if (phone && !phoneRegex.test(phone)) {
    document.getElementById("phoneNumber").style.borderColor = "var(--danger-color)"
    isValid = false
  }

  return isValid
}

// Add form validation to submission
document.getElementById("planForm").addEventListener("submit", (e) => {
  if (!validateForm()) {
    e.preventDefault()
    showNotification("Please fill in all required fields correctly.", "error")
  }
})

// Add real-time validation
document.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("blur", () => {
    if (field.hasAttribute("required") && !field.value.trim()) {
      field.style.borderColor = "var(--danger-color)"
    } else {
      field.style.borderColor = "var(--gray-300)"
    }
  })

  field.addEventListener("input", () => {
    if (field.style.borderColor === "rgb(239, 68, 68)") {
      field.style.borderColor = "var(--gray-300)"
    }
  })
})

console.log("SariSari Pricing Page - Ready!")
