import {
  BaseSupplierConnector,
  SupplierProductData,
  SupplierOrderData,
  PlaceOrderPayload,
} from "./base-connector";

const CJ_PRODUCTS: SupplierProductData[] = [
  {
    externalSku: "CJ-KB-001",
    title: "Mechanical Gaming Keyboard RGB",
    description: "Hot-swappable mechanical keyboard with per-key RGB, PBT keycaps, gasket mount design.",
    costPrice: 1100,
    stock: 340,
    shippingDays: 8,
    images: ["https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600"],
    variants: [
      { sku: "CJ-KB-001-BK", title: "Black", costPrice: 1100, stock: 170, options: { color: "Black" }, images: [] },
      { sku: "CJ-KB-001-WH", title: "White", costPrice: 1100, stock: 170, options: { color: "White" }, images: [] },
    ],
    category: "Electronics",
    weight: 0.9,
  },
  {
    externalSku: "CJ-MS-002",
    title: "Ergonomic Wireless Mouse",
    description: "Vertical ergonomic mouse with 6 buttons, adjustable DPI up to 4000, rechargeable battery.",
    costPrice: 420,
    stock: 500,
    shippingDays: 7,
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600"],
    variants: [
      { sku: "CJ-MS-002-BK", title: "Black", costPrice: 420, stock: 300, options: { color: "Black" }, images: [] },
      { sku: "CJ-MS-002-SV", title: "Silver", costPrice: 440, stock: 200, options: { color: "Silver" }, images: [] },
    ],
    category: "Electronics",
    weight: 0.12,
  },
  {
    externalSku: "CJ-BT-003",
    title: "Insulated Water Bottle 750ml",
    description: "Double-wall vacuum insulated stainless steel, keeps drinks cold 24hrs or hot 12hrs.",
    costPrice: 350,
    stock: 700,
    shippingDays: 9,
    images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600"],
    variants: [
      { sku: "CJ-BT-003-MT", title: "Matte Black", costPrice: 350, stock: 300, options: { color: "Matte Black" }, images: [] },
      { sku: "CJ-BT-003-WH", title: "Pearl White", costPrice: 350, stock: 200, options: { color: "Pearl White" }, images: [] },
      { sku: "CJ-BT-003-BL", title: "Ocean Blue", costPrice: 360, stock: 200, options: { color: "Ocean Blue" }, images: [] },
    ],
    category: "Home",
    weight: 0.35,
  },
  {
    externalSku: "CJ-YG-004",
    title: "Non-Slip Yoga Mat 6mm",
    description: "Eco-friendly TPE yoga mat with alignment lines, carrying strap, anti-tear surface.",
    costPrice: 480,
    stock: 400,
    shippingDays: 12,
    images: ["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600"],
    variants: [
      { sku: "CJ-YG-004-PP", title: "Purple", costPrice: 480, stock: 150, options: { color: "Purple" }, images: [] },
      { sku: "CJ-YG-004-BK", title: "Black", costPrice: 480, stock: 150, options: { color: "Black" }, images: [] },
      { sku: "CJ-YG-004-BL", title: "Blue", costPrice: 480, stock: 100, options: { color: "Blue" }, images: [] },
    ],
    category: "Sports",
    weight: 0.9,
  },
];

export class CJDropshippingConnector extends BaseSupplierConnector {
  get type() { return "CJ_DROPSHIPPING"; }

  async testConnection() {
    await new Promise((r) => setTimeout(r, 400));
    return true;
  }

  async fetchCatalog(params: { query?: string; category?: string; page?: number; limit?: number }) {
    await new Promise((r) => setTimeout(r, 250));
    let filtered = [...CJ_PRODUCTS];
    if (params.query) {
      const q = params.query.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (params.category) filtered = filtered.filter((p) => p.category === params.category);
    const page = params.page || 1;
    const limit = params.limit || 20;
    const start = (page - 1) * limit;
    return { products: filtered.slice(start, start + limit), total: filtered.length };
  }

  async importProduct(externalSku: string): Promise<SupplierProductData> {
    await new Promise((r) => setTimeout(r, 200));
    const product = CJ_PRODUCTS.find((p) => p.externalSku === externalSku);
    if (!product) throw new Error(`Product ${externalSku} not found`);
    return product;
  }

  async placeOrder(payload: PlaceOrderPayload): Promise<SupplierOrderData> {
    await new Promise((r) => setTimeout(r, 350));
    return {
      externalOrderId: `CJ-${Date.now()}`,
      status: "PLACED",
      estimatedDelivery: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    };
  }

  async getTracking(externalOrderId: string): Promise<SupplierOrderData> {
    await new Promise((r) => setTimeout(r, 200));
    return { externalOrderId, status: "SHIPPED", trackingNumber: `CJP${Date.now().toString(36).toUpperCase()}`, carrier: "CJ Packet" };
  }

  async syncInventory(skus: string[]) {
    await new Promise((r) => setTimeout(r, 200));
    const map = new Map<string, number>();
    skus.forEach((sku) => map.set(sku, Math.floor(Math.random() * 400) + 20));
    return map;
  }
}
