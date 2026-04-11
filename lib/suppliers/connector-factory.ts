import { BaseSupplierConnector } from "./base-connector";
import { AliExpressConnector } from "./aliexpress";
import { CJDropshippingConnector } from "./cj-dropshipping";

const connectorMap: Record<string, new (creds: { apiKey: string; apiSecret: string; baseUrl?: string }) => BaseSupplierConnector> = {
  ALIEXPRESS: AliExpressConnector,
  CJ_DROPSHIPPING: CJDropshippingConnector,
  // Add more connectors here as needed:
  // SPOCKET: SpocketConnector,
  // PRINTFUL: PrintfulConnector,
  // PRINTIFY: PrintifyConnector,
};

export function createSupplierConnector(
  type: string,
  credentials: { apiKey: string; apiSecret: string; baseUrl?: string }
): BaseSupplierConnector {
  const ConnectorClass = connectorMap[type];
  if (!ConnectorClass) {
    throw new Error(`Unknown supplier type: ${type}. Available: ${Object.keys(connectorMap).join(", ")}`);
  }
  return new ConnectorClass(credentials);
}

export function getSupportedSupplierTypes(): string[] {
  return Object.keys(connectorMap);
}
