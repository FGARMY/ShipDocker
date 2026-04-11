import { Queue, Worker, QueueEvents, Job } from "bullmq";
import Redis from "ioredis";
import prisma from "../db";
import { createSupplierConnector } from "../suppliers/connector-factory";
import { AppError } from "../utils/errors";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const connection = new Redis(REDIS_URL, {
  maxRetriesPerRequest: null,
});

// Create Queues
export const orderQueue = new Queue("order-routing", { connection });
export const inventoryQueue = new Queue("inventory-sync", { connection });

// Types
export interface OrderRoutePayload {
  orderId: string;
}

export interface InventorySyncPayload {
  supplierId: string;
}

// Add Job Wrappers
export async function enqueueOrderRouting(orderId: string) {
  await orderQueue.add(
    "route-order",
    { orderId },
    {
      attempts: 3,
      backoff: { type: "exponential", delay: 1000 * 60 }, // 1 min, 2 min, 4 min
      removeOnComplete: true,
    }
  );
}

export async function enqueueInventorySync(supplierId: string) {
  await inventoryQueue.add(
    "sync-inventory",
    { supplierId },
    {
      attempts: 2,
      removeOnComplete: true,
      jobId: `sync-${supplierId}-${Date.now()}`,
    }
  );
}

// Setup recurring CRON jobs for inventory sync
export async function setupCronJobs() {
  await inventoryQueue.add(
    "daily-inventory-sync",
    {},
    {
      repeat: {
        pattern: "0 0 * * *", // Run at midnight every day
      },
    }
  );
}
