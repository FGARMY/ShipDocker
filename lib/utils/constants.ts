export const STORE_ID = "default-store";

export const ORDER_STATUSES = {
  PENDING: { label: "Pending", color: "warning" },
  CONFIRMED: { label: "Confirmed", color: "primary" },
  PROCESSING: { label: "Processing", color: "primary" },
  PARTIALLY_SHIPPED: { label: "Partially Shipped", color: "primary" },
  SHIPPED: { label: "Shipped", color: "success" },
  DELIVERED: { label: "Delivered", color: "success" },
  CANCELLED: { label: "Cancelled", color: "destructive" },
  REFUNDED: { label: "Refunded", color: "muted" },
} as const;

export const PAYMENT_STATUSES = {
  UNPAID: { label: "Unpaid", color: "warning" },
  PAID: { label: "Paid", color: "success" },
  PARTIALLY_REFUNDED: { label: "Partial Refund", color: "warning" },
  REFUNDED: { label: "Refunded", color: "muted" },
  FAILED: { label: "Failed", color: "destructive" },
} as const;

export const SUPPLIER_TYPES = {
  ALIEXPRESS: { label: "AliExpress", icon: "🌍" },
  CJ_DROPSHIPPING: { label: "CJ Dropshipping", icon: "📦" },
  SPOCKET: { label: "Spocket", icon: "🚀" },
  PRINTFUL: { label: "Printful", icon: "🎨" },
  PRINTIFY: { label: "Printify", icon: "🖨️" },
  CSV_IMPORT: { label: "CSV Import", icon: "📄" },
  CUSTOM: { label: "Custom", icon: "⚙️" },
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const SHIPPING_DAYS = {
  EXPRESS: { min: 3, max: 7, label: "Express (3-7 days)" },
  STANDARD: { min: 7, max: 15, label: "Standard (7-15 days)" },
  ECONOMY: { min: 15, max: 30, label: "Economy (15-30 days)" },
} as const;
