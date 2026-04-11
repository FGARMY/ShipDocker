import {
  BaseSupplierConnector,
  SupplierProductData,
  SupplierOrderData,
  PlaceOrderPayload,
} from "./base-connector";

// ═══════════════════════════════════════
// Mock catalog data for development
// ═══════════════════════════════════════

const MOCK_PRODUCTS: SupplierProductData[] = [
  {
    externalSku: "ALI-WL-001",
    title: "Minimalist Leather Wallet",
    description: "Premium genuine leather bifold wallet with RFID protection. Slim profile fits perfectly in front pocket.",
    costPrice: 280,
    stock: 450,
    shippingDays: 12,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600",
      "https://images.unsplash.com/photo-1612902456551-404b9a18b646?w=600",
    ],
    variants: [
      { sku: "ALI-WL-001-BK", title: "Black", costPrice: 280, stock: 200, options: { color: "Black" }, images: [] },
      { sku: "ALI-WL-001-BR", title: "Brown", costPrice: 280, stock: 150, options: { color: "Brown" }, images: [] },
      { sku: "ALI-WL-001-TN", title: "Tan", costPrice: 290, stock: 100, options: { color: "Tan" }, images: [] },
    ],
    category: "Accessories",
    weight: 0.12,
  },
  {
    externalSku: "ALI-WH-002",
    title: "Smart Watch Ultra Fitness Tracker",
    description: "Advanced fitness smartwatch with heart rate, SpO2, GPS tracking and 7-day battery life. IP68 waterproof.",
    costPrice: 850,
    stock: 320,
    shippingDays: 10,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
      "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600",
    ],
    variants: [
      { sku: "ALI-WH-002-BK", title: "Midnight Black", costPrice: 850, stock: 150, options: { color: "Black" }, images: [] },
      { sku: "ALI-WH-002-SV", title: "Silver", costPrice: 870, stock: 100, options: { color: "Silver" }, images: [] },
      { sku: "ALI-WH-002-GD", title: "Rose Gold", costPrice: 900, stock: 70, options: { color: "Rose Gold" }, images: [] },
    ],
    category: "Electronics",
    weight: 0.08,
  },
  {
    externalSku: "ALI-HP-003",
    title: "Wireless Noise Cancelling Headphones",
    description: "Premium over-ear headphones with active noise cancellation, 40-hour battery, and Hi-Res audio support.",
    costPrice: 1200,
    stock: 180,
    shippingDays: 14,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600",
    ],
    variants: [
      { sku: "ALI-HP-003-BK", title: "Black", costPrice: 1200, stock: 80, options: { color: "Black" }, images: [] },
      { sku: "ALI-HP-003-WH", title: "White", costPrice: 1200, stock: 60, options: { color: "White" }, images: [] },
      { sku: "ALI-HP-003-NV", title: "Navy", costPrice: 1250, stock: 40, options: { color: "Navy" }, images: [] },
    ],
    category: "Electronics",
    weight: 0.28,
  },
  {
    externalSku: "ALI-BG-004",
    title: "Urban Travel Backpack 40L",
    description: "Anti-theft laptop backpack with USB charging port, waterproof fabric, and expandable design. Fits 17\" laptop.",
    costPrice: 650,
    stock: 500,
    shippingDays: 15,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600",
    ],
    variants: [
      { sku: "ALI-BG-004-BK", title: "Black", costPrice: 650, stock: 250, options: { color: "Black" }, images: [] },
      { sku: "ALI-BG-004-GR", title: "Grey", costPrice: 650, stock: 150, options: { color: "Grey" }, images: [] },
      { sku: "ALI-BG-004-NV", title: "Navy Blue", costPrice: 670, stock: 100, options: { color: "Navy" }, images: [] },
    ],
    category: "Bags",
    weight: 0.85,
  },
  {
    externalSku: "ALI-SG-005",
    title: "Polarized Aviator Sunglasses",
    description: "Classic aviator sunglasses with UV400 polarized lenses and lightweight titanium alloy frame.",
    costPrice: 320,
    stock: 600,
    shippingDays: 8,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    ],
    variants: [
      { sku: "ALI-SG-005-GD", title: "Gold/Green", costPrice: 320, stock: 300, options: { color: "Gold" }, images: [] },
      { sku: "ALI-SG-005-SV", title: "Silver/Blue", costPrice: 320, stock: 200, options: { color: "Silver" }, images: [] },
      { sku: "ALI-SG-005-BK", title: "Black/Grey", costPrice: 330, stock: 100, options: { color: "Black" }, images: [] },
    ],
    category: "Accessories",
    weight: 0.04,
  },
  {
    externalSku: "ALI-SP-006",
    title: "Portable Bluetooth Speaker",
    description: "360° surround sound Bluetooth speaker with 24hr battery, IPX7 waterproof, built-in microphone.",
    costPrice: 580,
    stock: 270,
    shippingDays: 12,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600",
    ],
    variants: [
      { sku: "ALI-SP-006-BK", title: "Black", costPrice: 580, stock: 120, options: { color: "Black" }, images: [] },
      { sku: "ALI-SP-006-RD", title: "Red", costPrice: 580, stock: 80, options: { color: "Red" }, images: [] },
      { sku: "ALI-SP-006-BL", title: "Blue", costPrice: 580, stock: 70, options: { color: "Blue" }, images: [] },
    ],
    category: "Electronics",
    weight: 0.55,
  },
  {
    externalSku: "ALI-PH-007",
    title: "Magnetic Phone Mount for Car",
    description: "Universal magnetic car phone mount with 360° rotation, strong N52 magnets, one-hand operation.",
    costPrice: 180,
    stock: 800,
    shippingDays: 10,
    images: [
      "https://images.unsplash.com/photo-1586953208270-767889fa9b55?w=600",
    ],
    variants: [
      { sku: "ALI-PH-007-BK", title: "Black", costPrice: 180, stock: 500, options: { color: "Black" }, images: [] },
      { sku: "ALI-PH-007-SV", title: "Silver", costPrice: 190, stock: 300, options: { color: "Silver" }, images: [] },
    ],
    category: "Accessories",
    weight: 0.06,
  },
  {
    externalSku: "ALI-LT-008",
    title: "LED Desk Lamp with Wireless Charger",
    description: "Modern LED desk lamp with 5 color temperatures, touch control, USB-C port, and built-in Qi wireless charger.",
    costPrice: 750,
    stock: 200,
    shippingDays: 18,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600",
    ],
    variants: [
      { sku: "ALI-LT-008-WH", title: "White", costPrice: 750, stock: 100, options: { color: "White" }, images: [] },
      { sku: "ALI-LT-008-BK", title: "Black", costPrice: 750, stock: 100, options: { color: "Black" }, images: [] },
    ],
    category: "Home",
    weight: 1.2,
  },
];

export class AliExpressConnector extends BaseSupplierConnector {
  get type() { return "ALIEXPRESS"; }

  async testConnection(): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 500));
    return true;
  }

  async fetchCatalog(params: { query?: string; category?: string; page?: number; limit?: number }) {
    await new Promise((r) => setTimeout(r, 300));
    let filtered = [...MOCK_PRODUCTS];
    if (params.query) {
      const q = params.query.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (params.category) {
      filtered = filtered.filter((p) => p.category === params.category);
    }
    const page = params.page || 1;
    const limit = params.limit || 20;
    const start = (page - 1) * limit;
    return { products: filtered.slice(start, start + limit), total: filtered.length };
  }

  async importProduct(externalSku: string): Promise<SupplierProductData> {
    await new Promise((r) => setTimeout(r, 200));
    const product = MOCK_PRODUCTS.find((p) => p.externalSku === externalSku);
    if (!product) throw new Error(`Product ${externalSku} not found in AliExpress catalog`);
    return product;
  }

  async placeOrder(payload: PlaceOrderPayload): Promise<SupplierOrderData> {
    await new Promise((r) => setTimeout(r, 400));
    return {
      externalOrderId: `AE-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      status: "PLACED",
      estimatedDelivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    };
  }

  async getTracking(externalOrderId: string): Promise<SupplierOrderData> {
    await new Promise((r) => setTimeout(r, 200));
    return {
      externalOrderId,
      status: "SHIPPED",
      trackingNumber: `TRACK${Date.now().toString(36).toUpperCase()}`,
      carrier: "YunExpress",
    };
  }

  async syncInventory(skus: string[]): Promise<Map<string, number>> {
    await new Promise((r) => setTimeout(r, 300));
    const map = new Map<string, number>();
    for (const sku of skus) {
      map.set(sku, Math.floor(Math.random() * 500) + 10);
    }
    return map;
  }
}
