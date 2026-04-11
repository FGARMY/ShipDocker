import { Worker, Job } from "bullmq";
import Redis from "ioredis";
import prisma from "../db";
import { createSupplierConnector } from "../suppliers/connector-factory";
import { OrderRoutePayload, InventorySyncPayload, setupCronJobs } from "./queue";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const connection = new Redis(REDIS_URL, { maxRetriesPerRequest: null });

async function processOrderRouting(job: Job<OrderRoutePayload>) {
  const { orderId } = job.data;
  console.log(`[OrderWorker] Processing routing for order ${orderId}`);

  // Fetch sub-order (SupplierOrder) to route
  const supplierOrder = await prisma.supplierOrder.findUnique({
    where: { id: orderId },
    include: {
      supplier: true,
      order: {
        include: {
          customer: true,
          items: { include: { variant: true } },
        },
      },
    },
  });

  if (!supplierOrder) throw new Error(`SupplierOrder ${orderId} not found`);
  if (supplierOrder.status !== "PENDING") {
    console.log(`[OrderWorker] Order ${orderId} is ${supplierOrder.status}, skipping.`);
    return;
  }

  const creds = typeof supplierOrder.supplier.credentials === "string" ? JSON.parse(supplierOrder.supplier.credentials) : supplierOrder.supplier.credentials;
  const connector = createSupplierConnector(supplierOrder.supplier.type, creds);

  // Filter items mapping to this supplier
  const supplierItems = supplierOrder.order.items.filter(
    (i) => i.variant.supplierId === supplierOrder.supplierId
  );

  const items = supplierItems.map((i) => ({
    supplierSku: i.variant.supplierSku || i.variant.sku,
    quantity: i.quantity,
  }));

  const shippingAddress = supplierOrder.order.shippingAddress as any;
  const addr = typeof shippingAddress === "string" ? JSON.parse(shippingAddress) : shippingAddress;

  try {
    const result = await connector.placeOrder({
      items,
      shippingAddress: addr || { name: "", line1: "", city: "", state: "", country: "", zip: "", phone: "" },
    });

    await prisma.supplierOrder.update({
      where: { id: orderId },
      data: {
        status: "PLACED",
        externalId: result.externalOrderId,
      },
    });
    console.log(`[OrderWorker] Successfully routed order ${orderId} to ${supplierOrder.supplier.name} with ID ${result.externalOrderId}`);
  } catch (error: any) {
    console.error(`[OrderWorker] Failed to route order ${orderId}:`, error.message);
    throw error; // Will be retried by BullMQ
  }
}

async function processInventorySync(job: Job<InventorySyncPayload | Record<string, never>>) {
  console.log(`[InventoryWorker] Starting inventory sync...`);

  const suppliers = await prisma.supplier.findMany({ where: { isActive: true } });

  for (const supplier of suppliers) {
    try {
      if ("supplierId" in job.data && job.data.supplierId && job.data.supplierId !== supplier.id) {
        continue; // Skip if specific supplier requested
      }

      console.log(`[InventoryWorker] Syncing inventory for ${supplier.name}`);
      const creds = typeof supplier.credentials === "string" ? JSON.parse(supplier.credentials) : supplier.credentials;
      const connector = createSupplierConnector(supplier.type, creds);
      
      const variants = await prisma.productVariant.findMany({
        where: { supplierId: supplier.id },
      });

      const skus = variants.map(v => v.supplierSku || v.sku);
      
      const chunkSize = 50;
      for (let i = 0; i < skus.length; i += chunkSize) {
        const batchSkus = skus.slice(i, i + chunkSize);
        const stockData = await connector.syncInventory(batchSkus);

        for (const [sku, stock] of stockData.entries()) {
          await prisma.productVariant.updateMany({
            where: { 
              supplierId: supplier.id,
              OR: [{ supplierSku: sku }, { sku: sku }]
            },
            data: { stock: stock },
          });
        }
      }
      console.log(`[InventoryWorker] Finished syncing ${supplier.name}`);
    } catch (error: any) {
      console.error(`[InventoryWorker] Error syncing ${supplier.name}:`, error.message);
    }
  }
}

// Start Workers
const orderWorker = new Worker("order-routing", processOrderRouting, { connection, concurrency: 5 });
const inventoryWorker = new Worker("inventory-sync", processInventorySync, { connection, concurrency: 1 });

orderWorker.on("completed", (job) => console.log(`[OrderWorker] Job ${job.id} completed.`));
orderWorker.on("failed", (job, err) => console.error(`[OrderWorker] Job ${job?.id} failed:`, err));

inventoryWorker.on("completed", (job) => console.log(`[InventoryWorker] Job ${job.id} completed.`));
inventoryWorker.on("failed", (job, err) => console.error(`[InventoryWorker] Job ${job?.id} failed:`, err));

console.log("🚀 Background workers started successfully.");

setupCronJobs().catch(console.error);

process.on("SIGTERM", async () => {
  await orderWorker.close();
  await inventoryWorker.close();
  await connection.quit();
  process.exit(0);
});
