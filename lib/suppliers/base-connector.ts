export interface SupplierProductData {
  externalSku: string;
  title: string;
  description: string;
  costPrice: number;
  stock: number;
  shippingDays: number;
  images: string[];
  variants: {
    sku: string;
    title: string;
    costPrice: number;
    stock: number;
    options: Record<string, string>;
    images: string[];
  }[];
  category?: string;
  weight?: number;
}

export interface SupplierOrderData {
  externalOrderId: string;
  status: "PENDING" | "PLACED" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "FAILED";
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: Date;
}

export interface PlaceOrderPayload {
  items: {
    supplierSku: string;
    quantity: number;
  }[];
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    phone: string;
  };
}

export abstract class BaseSupplierConnector {
  protected apiKey: string;
  protected apiSecret: string;
  protected baseUrl: string;

  constructor(credentials: { apiKey: string; apiSecret: string; baseUrl?: string }) {
    this.apiKey = credentials.apiKey;
    this.apiSecret = credentials.apiSecret;
    this.baseUrl = credentials.baseUrl || "";
  }

  abstract get type(): string;

  abstract testConnection(): Promise<boolean>;

  abstract fetchCatalog(params: {
    query?: string;
    category?: string;
    page?: number;
    limit?: number;
  }): Promise<{ products: SupplierProductData[]; total: number }>;

  abstract importProduct(externalSku: string): Promise<SupplierProductData>;

  abstract placeOrder(payload: PlaceOrderPayload): Promise<SupplierOrderData>;

  abstract getTracking(externalOrderId: string): Promise<SupplierOrderData>;

  abstract syncInventory(skus: string[]): Promise<Map<string, number>>;
}
