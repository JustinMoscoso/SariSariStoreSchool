// DOM Elements
const hamburger = document.getElementById("hamburger")
const mobileMenu = document.getElementById("mobileMenu")
const authModal = document.getElementById("authModal")
const authBtn = document.getElementById("authBtn")
const getStartedBtn = document.getElementById("getStartedBtn")
const modalClose = document.getElementById("modalClose")
const tabBtns = document.querySelectorAll(".tab-btn")
const tabContents = document.querySelectorAll(".tab-content")
const passwordToggles = document.querySelectorAll(".password-toggle")
const loginForm = document.getElementById("loginForm")
const signupForm = document.getElementById("signupForm")
const mobileAuthBtn = document.querySelector(".mobile-auth")

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  mobileMenu.classList.toggle("active")
})

// Close mobile menu when clicking on links
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    mobileMenu.classList.remove("active")
  })
})

// Modal Functions
function openModal() {
  authModal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeModal() {
  authModal.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Modal Event Listeners
authBtn.addEventListener("click", openModal)
getStartedBtn.addEventListener("click", openModal)
mobileAuthBtn.addEventListener("click", () => {
  openModal()
  hamburger.classList.remove("active")
  mobileMenu.classList.remove("active")
})

modalClose.addEventListener("click", closeModal)

// Close modal when clicking outside
authModal.addEventListener("click", (e) => {
  if (e.target === authModal) {
    closeModal()
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && authModal.classList.contains("active")) {
    closeModal()
  }
})

// Tab Switching
tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetTab = btn.getAttribute("data-tab")

    // Remove active class from all tabs and contents
    tabBtns.forEach((tab) => tab.classList.remove("active"))
    tabContents.forEach((content) => content.classList.remove("active"))

    // Add active class to clicked tab and corresponding content
    btn.classList.add("active")
    document.getElementById(targetTab).classList.add("active")
  })
})

// Password Toggle
passwordToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const targetId = toggle.getAttribute("data-target")
    const passwordInput = document.getElementById(targetId)
    const icon = toggle.querySelector("i")

    if (passwordInput.type === "password") {
      passwordInput.type = "text"
      icon.classList.remove("fa-eye")
      icon.classList.add("fa-eye-slash")
    } else {
      passwordInput.type = "password"
      icon.classList.remove("fa-eye-slash")
      icon.classList.add("fa-eye")
    }
  })
})

// Form Submissions
loginForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  // Basic validation
  if (!email || !password) {
    alert("Please fill in all fields")
    return
  }

  // Simulate login process
  console.log("Login attempt:", { email, password })

  // Show loading state
  const submitBtn = loginForm.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Logging in..."
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    alert("Login successful! (This is a demo)")
    submitBtn.textContent = originalText
    submitBtn.disabled = false
    closeModal()
    loginForm.reset()
  }, 1500)
})

signupForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("signupName").value
  const email = document.getElementById("signupEmail").value
  const password = document.getElementById("signupPassword").value

  // Basic validation
  if (!name || !email || !password) {
    alert("Please fill in all fields")
    return
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long")
    return
  }

  // Simulate signup process
  console.log("Signup attempt:", { name, email, password })

  // Show loading state
  const submitBtn = signupForm.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Creating Account..."
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    alert("Account created successfully! (This is a demo)")
    submitBtn.textContent = originalText
    submitBtn.disabled = false
    closeModal()
    signupForm.reset()
  }, 1500)
})

// Social Login Handlers
document.querySelectorAll(".btn-social").forEach((btn) => {
  btn.addEventListener("click", () => {
    const provider = btn.classList.contains("google") ? "Google" : "Facebook"
    console.log(`${provider} login clicked`)
    alert(`${provider} login would be implemented here`)
  })
})

// Smooth Scrolling for Navigation Links
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

// Intersection Observer for Animations
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

// Observe feature cards for animation
document.querySelectorAll(".feature-card").forEach((card) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(30px)"
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(card)
})

// Add loading animation to buttons
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", function () {
    if (!this.disabled) {
      this.style.transform = "scale(0.98)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)
    }
  })
})

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget
  const circle = document.createElement("span")
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2

  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`
  circle.classList.add("ripple")

  const ripple = button.getElementsByClassName("ripple")[0]
  if (ripple) {
    ripple.remove()
  }

  button.appendChild(circle)
}

// Add ripple effect styles
const style = document.createElement("style")
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.6);
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button {
        position: relative;
        overflow: hidden;
    }
`
document.head.appendChild(style)

// Add ripple effect to all buttons
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", createRipple)
})

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  console.log("SariSari Store Enhanced - Ready!")

  // Add fade-in animation to hero content
  const heroContent = document.querySelector(".hero-content")
  const heroVisual = document.querySelector(".hero-visual")

  if (heroContent && heroVisual) {
    heroContent.style.opacity = "0"
    heroContent.style.transform = "translateY(30px)"
    heroVisual.style.opacity = "0"
    heroVisual.style.transform = "translateX(30px)"

    setTimeout(() => {
      heroContent.style.transition = "opacity 0.8s ease, transform 0.8s ease"
      heroVisual.style.transition = "opacity 0.8s ease, transform 0.8s ease"
      heroContent.style.opacity = "1"
      heroContent.style.transform = "translateY(0)"
      heroVisual.style.opacity = "1"
      heroVisual.style.transform = "translateX(0)"
    }, 100)
  }
})
