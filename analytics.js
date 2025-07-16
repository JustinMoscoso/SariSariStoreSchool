/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  color: #333;
  line-height: 1.6;
}

/* Variables */
:root {
  --primary-color: #2563eb;
  --primary-hover: #1d4ed8;
  --secondary-color: #64748b;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  --white: #ffffff;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* Navigation */
.navbar {
  background: var(--primary-color);
  padding: 1rem 0;
  box-shadow: var(--shadow-lg);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-back {
  color: var(--white);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: opacity 0.2s;
}

.nav-back:hover {
  opacity: 0.8;
  color: var(--white);
}

.nav-title {
  color: var(--white);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.nav-actions {
  display: flex;
  gap: 1rem;
}

/* Buttons */
.btn-primary {
  background: var(--primary-color);
  color: var(--white);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.btn-primary:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--secondary-color);
  color: var(--white);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.btn-secondary:hover {
  background: #475569;
  transform: translateY(-1px);
}

.btn-ghost {
  background: transparent;
  color: var(--white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.1);
}

.btn-outline {
  background: transparent;
  color: var(--white);
  border: 1px solid var(--white);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.btn-outline:hover {
  background: var(--white);
  color: var(--primary-color);
}

.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
}

.btn-warning {
  background: var(--warning-color);
  color: var(--white);
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-warning:hover {
  background: #d97706;
}

.btn-danger {
  background: var(--danger-color);
  color: var(--white);
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-danger:hover {
  background: #dc2626;
}

.btn-success {
  background: var(--success-color);
  color: var(--white);
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-success:hover {
  background: #059669;
}

/* Main Container */
.main-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Summary Cards */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: var(--white);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s;
}

.summary-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.summary-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--white);
}

.summary-icon.total {
  background: var(--primary-color);
}

.summary-icon.low {
  background: var(--warning-color);
}

.summary-icon.out {
  background: var(--danger-color);
}

.summary-icon.value {
  background: var(--success-color);
}

.summary-content h3 {
  font-size: 0.875rem;
  color: var(--gray-600);
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.summary-value {
  font-size: 1.75rem;
  font-weight: bold;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.summary-change {
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.summary-change.positive {
  color: var(--success-color);
}

.summary-change.negative {
  color: var(--danger-color);
}

/* Controls Section */
.controls-section {
  background: var(--white);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.controls-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  min-width: 300px;
}

.search-box i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-400);
}

.search-box input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.search-box input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.filter-group {
  display: flex;
  gap: 0.5rem;
}

.filter-select {
  padding: 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: var(--white);
  cursor: pointer;
}

.controls-right {
  display: flex;
  gap: 1rem;
}

/* Table Container */
.table-container {
  background: var(--white);
  border-radius: 0.75rem;
  box-shadow: var(--shadow);
  overflow: hidden;
  margin-bottom: 2rem;
}

.table-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--gray-900);
}

.table-actions {
  display: flex;
  gap: 0.5rem;
}

/* Table View */
.table-view {
  display: none;
}

.table-view.active {
  display: block;
}

.table-wrapper {
  overflow-x: auto;
}

.inventory-table {
  width: 100%;
  border-collapse: collapse;
}

.inventory-table th {
  background: var(--gray-50);
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--gray-700);
  font-size: 0.875rem;
  border-bottom: 1px solid var(--gray-200);
}

.inventory-table td {
  padding: 1rem;
  border-bottom: 1px solid var(--gray-200);
  vertical-align: middle;
}

.inventory-table tr:hover {
  background: var(--gray-50);
}

.product-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.product-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background: var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.product-details h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.product-details p {
  font-size: 0.75rem;
  color: var(--gray-500);
  margin: 0;
}

.stock-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stock-bar {
  width: 60px;
  height: 4px;
  background: var(--gray-200);
  border-radius: 2px;
  overflow: hidden;
}

.stock-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s;
}

.stock-fill.high {
  background: var(--success-color);
}

.stock-fill.medium {
  background: var(--warning-color);
}

.stock-fill.low {
  background: var(--danger-color);
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.status-badge.in-stock {
  background: #dcfce7;
  color: var(--success-color);
}

.status-badge.low-stock {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.out-of-stock {
  background: #fee2e2;
  color: var(--danger-color);
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.checkbox {
  width: 1rem;
  height: 1rem;
  accent-color: var(--primary-color);
}

/* Grid View */
.grid-view {
  display: none;
  padding: 1.5rem;
}

.grid-view.active {
  display: block;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s;
  position: relative;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.product-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.product-card-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.product-card-info p {
  font-size: 0.875rem;
  color: var(--gray-500);
  margin: 0;
}

.product-card-stats {
  margin-bottom: 1rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--gray-600);
}

.stat-value {
  font-weight: 600;
  color: var(--gray-900);
}

.product-card-actions {
  display: flex;
  gap: 0.5rem;
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--white);
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  box-shadow: var(--shadow);
}

.pagination-info {
  color: var(--gray-600);
  font-size: 0.875rem;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-btn {
  background: var(--white);
  border: 1px solid var(--gray-300);
  color: var(--gray-600);
  padding: 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
}

.pagination-btn:hover:not(:disabled) {
  background: var(--gray-50);
  border-color: var(--gray-400);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-numbers {
  display: flex;
  gap: 0.25rem;
}

.page-number {
  background: var(--white);
  border: 1px solid var(--gray-300);
  color: var(--gray-600);
  padding: 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
}

.page-number:hover {
  background: var(--gray-50);
  border-color: var(--gray-400);
}

.page-number.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: var(--white);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.modal {
  background: var(--white);
  border-radius: 0.75rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
  transform: scale(0.9);
  transition: transform 0.3s;
}

.modal-overlay.active .modal {
  transform: scale(1);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-900);
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: var(--gray-400);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: color 0.2s;
}

.modal-close:hover {
  color: var(--gray-600);
}

.modal-content {
  padding: 1.5rem;
}

/* Forms */
.item-form,
.restock-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: var(--gray-700);
  font-size: 0.875rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.input-group {
  display: flex;
  gap: 0.5rem;
}

.input-group input {
  flex: 1;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--gray-200);
}

/* Restock Form */
.restock-info {
  background: var(--gray-50);
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.restock-info h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
}

.restock-info p {
  font-size: 0.875rem;
  color: var(--gray-600);
  margin: 0;
}

/* Bulk Actions */
.bulk-actions {
  text-align: center;
}

.bulk-actions p {
  margin-bottom: 1.5rem;
  color: var(--gray-600);
}

.bulk-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bulk-buttons button {
  padding: 1rem;
  justify-content: center;
}

/* Loading Overlay */
.loading-overlay {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
}

.loading-overlay.active {
  opacity: 1;
  visibility: visible;
}

.loading-spinner {
  text-align: center;
}

.loading-spinner i {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.loading-spinner p {
  color: var(--gray-600);
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .controls-section {
    flex-direction: column;
    align-items: stretch;
  }

  .controls-left,
  .controls-right {
    justify-content: center;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-actions {
    order: -1;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .search-box {
    min-width: auto;
    width: 100%;
  }

  .filter-group {
    width: 100%;
  }

  .filter-select {
    flex: 1;
  }

  .controls-right {
    width: 100%;
    justify-content: center;
  }

  .table-wrapper {
    font-size: 0.875rem;
  }

  .inventory-table th,
  .inventory-table td {
    padding: 0.75rem 0.5rem;
  }

  .pagination-container {
    flex-direction: column;
    gap: 1rem;
  }

  .bulk-buttons {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .main-container {
    padding: 1rem;
  }

  .summary-card {
    flex-direction: column;
    text-align: center;
  }

  .modal {
    margin: 1rem;
    width: calc(100% - 2rem);
  }

  .action-buttons {
    flex-direction: column;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.summary-card,
.table-container,
.product-card {
  animation: fadeInUp 0.6s ease-out;
}

.summary-card:nth-child(1) {
  animation-delay: 0.1s;
}
.summary-card:nth-child(2) {
  animation-delay: 0.2s;
}
.summary-card:nth-child(3) {
  animation-delay: 0.3s;
}
.summary-card:nth-child(4) {
  animation-delay: 0.4s;
}

/* Hover Effects */
.inventory-table tr {
  transition: background-color 0.2s;
}

.btn-primary,
.btn-secondary,
.btn-warning,
.btn-danger,
.btn-success {
  position: relative;
  overflow: hidden;
}

.btn-primary::before,
.btn-secondary::before,
.btn-warning::before,
.btn-danger::before,
.btn-success::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
}

.btn-primary:hover::before,
.btn-secondary:hover::before,
.btn-warning:hover::before,
.btn-danger:hover::before,
.btn-success:hover::before {
  width: 300px;
  height: 300px;
}
