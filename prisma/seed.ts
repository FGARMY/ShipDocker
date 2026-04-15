import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/security/hash";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  // 1. Create store
  const store = await prisma.store.upsert({
    where: { domain: "localhost" },
    update: {},
    create: {
      id: "default-store",
      name: "SMDrop Store",
      domain: "localhost",
      currency: "INR",
      timezone: "Asia/Kolkata",
      settings: {
        gstRate: 18,
        freeShippingThreshold: 999,
        flatShippingRate: 79,
      },
    },
  });
  console.log(`✅ Store: ${store.name}`);

  // 2. Create admin user
  const adminPassword = await hashPassword(process.env.ADMIN_PASSWORD || "admin123456");
  const admin = await prisma.user.upsert({
    where: { email: "admin@smdrop.com" },
    update: {},
    create: {
      storeId: store.id,
      email: "admin@smdrop.com",
      passwordHash: adminPassword,
      firstName: "Admin",
      lastName: "User",
      role: "SUPER_ADMIN",
    },
  });
  console.log(`✅ Admin: ${admin.email}`);

  // 3. Create suppliers
  const aliexpress = await prisma.supplier.upsert({
    where: { id: "supplier-aliexpress" },
    update: {},
    create: {
      id: "supplier-aliexpress",
      storeId: store.id,
      name: "AliExpress Global",
      type: "ALIEXPRESS",
      credentials: { apiKey: "demo", apiSecret: "demo" },
      isActive: true,
    },
  });

  const cj = await prisma.supplier.upsert({
    where: { id: "supplier-cj" },
    update: {},
    create: {
      id: "supplier-cj",
      storeId: store.id,
      name: "CJ Dropshipping",
      type: "CJ_DROPSHIPPING",
      credentials: { apiKey: "demo", apiSecret: "demo" },
      isActive: true,
    },
  });
  console.log(`✅ Suppliers: AliExpress, CJ Dropshipping`);

  // 4. Create collections
  const electronics = await prisma.collection.upsert({
    where: { id: "col-electronics" },
    update: {},
    create: {
      id: "col-electronics",
      storeId: store.id,
      title: "Electronics",
      slug: "electronics",
      description: "Latest gadgets and electronics",
      imageUrl: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600",
    },
  });

  const accessories = await prisma.collection.upsert({
    where: { id: "col-accessories" },
    update: {},
    create: {
      id: "col-accessories",
      storeId: store.id,
      title: "Accessories",
      slug: "accessories",
      description: "Premium accessories for everyday use",
      imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600",
    },
  });

  const trending = await prisma.collection.upsert({
    where: { id: "col-trending" },
    update: {},
    create: {
      id: "col-trending",
      storeId: store.id,
      title: "Trending",
      slug: "trending",
      description: "Most popular products right now",
    },
  });
  console.log(`✅ Collections: Electronics, Accessories, Trending`);

  // 5. Create products
  const products = [
    {
      id: "prod-1", title: "Minimalist Leather Wallet", slug: "minimalist-leather-wallet",
      description: "Premium genuine leather bifold wallet with RFID protection.",
      images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=600", "https://images.unsplash.com/photo-1612902456551-404b9a18b646?w=600"],
      tags: ["accessories", "wallet", "leather"],
      variants: [
        { id: "v1-bk", title: "Black", sku: "WL-001-BK", costPrice: 280, sellPrice: 599, comparePrice: 899, stock: 200, options: { color: "Black" }, supplierId: aliexpress.id, supplierSku: "ALI-WL-001-BK" },
        { id: "v1-br", title: "Brown", sku: "WL-001-BR", costPrice: 280, sellPrice: 599, comparePrice: 899, stock: 150, options: { color: "Brown" }, supplierId: aliexpress.id, supplierSku: "ALI-WL-001-BR" },
        { id: "v1-tn", title: "Tan", sku: "WL-001-TN", costPrice: 290, sellPrice: 649, comparePrice: 899, stock: 100, options: { color: "Tan" }, supplierId: aliexpress.id, supplierSku: "ALI-WL-001-TN" },
      ],
      collections: [accessories.id, trending.id],
    },
    {
      id: "prod-2", title: "Smart Watch Ultra Fitness", slug: "smart-watch-ultra-fitness",
      description: "Advanced fitness smartwatch with heart rate, SpO2, GPS and 7-day battery.",
      images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"],
      tags: ["electronics", "smartwatch", "fitness"],
      variants: [
        { id: "v2-bk", title: "Midnight Black", sku: "WH-002-BK", costPrice: 850, sellPrice: 1799, comparePrice: 2499, stock: 150, options: { color: "Black" }, supplierId: aliexpress.id, supplierSku: "ALI-WH-002-BK" },
        { id: "v2-sv", title: "Silver", sku: "WH-002-SV", costPrice: 870, sellPrice: 1849, comparePrice: 2499, stock: 100, options: { color: "Silver" }, supplierId: aliexpress.id, supplierSku: "ALI-WH-002-SV" },
      ],
      collections: [electronics.id, trending.id],
    },
    {
      id: "prod-3", title: "Wireless NC Headphones", slug: "wireless-nc-headphones",
      description: "Premium over-ear headphones with active noise cancellation and Hi-Res audio.",
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"],
      tags: ["electronics", "headphones", "audio"],
      variants: [
        { id: "v3-bk", title: "Black", sku: "HP-003-BK", costPrice: 1200, sellPrice: 2499, comparePrice: 3499, stock: 80, options: { color: "Black" }, supplierId: aliexpress.id, supplierSku: "ALI-HP-003-BK" },
        { id: "v3-wh", title: "White", sku: "HP-003-WH", costPrice: 1200, sellPrice: 2499, comparePrice: 3499, stock: 60, options: { color: "White" }, supplierId: aliexpress.id, supplierSku: "ALI-HP-003-WH" },
      ],
      collections: [electronics.id],
    },
    {
      id: "prod-4", title: "Urban Travel Backpack", slug: "urban-travel-backpack",
      description: "Anti-theft laptop backpack with USB charging port and waterproof fabric.",
      images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"],
      tags: ["bags", "backpack", "travel"],
      variants: [
        { id: "v4-bk", title: "Black", sku: "BG-004-BK", costPrice: 650, sellPrice: 1299, comparePrice: 1699, stock: 250, options: { color: "Black" }, supplierId: aliexpress.id, supplierSku: "ALI-BG-004-BK" },
      ],
      collections: [trending.id],
    },
    {
      id: "prod-5", title: "Mechanical Gaming Keyboard", slug: "mechanical-gaming-keyboard",
      description: "Hot-swappable mechanical keyboard with per-key RGB and PBT keycaps.",
      images: ["https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600"],
      tags: ["electronics", "keyboard", "gaming"],
      variants: [
        { id: "v5-bk", title: "Black", sku: "KB-001-BK", costPrice: 1100, sellPrice: 2299, comparePrice: 2999, stock: 170, options: { color: "Black" }, supplierId: cj.id, supplierSku: "CJ-KB-001-BK" },
        { id: "v5-wh", title: "White", sku: "KB-001-WH", costPrice: 1100, sellPrice: 2299, comparePrice: 2999, stock: 170, options: { color: "White" }, supplierId: cj.id, supplierSku: "CJ-KB-001-WH" },
      ],
      collections: [electronics.id],
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        storeId: store.id,
        title: p.title,
        slug: p.slug,
        description: p.description,
        status: "ACTIVE",
        images: p.images,
        tags: p.tags,
        seoTitle: p.title,
        seoDesc: p.description,
        variants: {
          create: p.variants.map((v, i) => ({
            id: v.id,
            title: v.title,
            sku: v.sku,
            costPrice: v.costPrice,
            sellPrice: v.sellPrice,
            comparePrice: v.comparePrice,
            stock: v.stock,
            options: v.options,
            supplierId: v.supplierId,
            supplierSku: v.supplierSku,
            position: i,
          })),
        },
        collections: {
          create: p.collections.map((colId, i) => ({
            collectionId: colId,
            position: i,
          })),
        },
      },
    });
  }
  console.log(`✅ Products: ${products.length} products with variants`);

  // 6. Create coupons
  await prisma.coupon.upsert({
    where: { id: "coupon-first10" },
    update: {},
    create: {
      id: "coupon-first10",
      storeId: store.id,
      code: "FIRST10",
      type: "PERCENTAGE",
      value: 10,
      minOrder: 499,
      isActive: true,
    },
  });

  await prisma.coupon.upsert({
    where: { id: "coupon-flat200" },
    update: {},
    create: {
      id: "coupon-flat200",
      storeId: store.id,
      code: "FLAT200",
      type: "FIXED",
      value: 200,
      minOrder: 999,
      usageLimit: 500,
      isActive: true,
    },
  });
  console.log(`✅ Coupons: FIRST10, FLAT200`);

  // 7. Create shipping zones
  await prisma.shippingZone.upsert({
    where: { id: "zone-india" },
    update: {},
    create: {
      id: "zone-india",
      storeId: store.id,
      name: "India",
      countries: ["IN"],
      rates: {
        create: [
          { name: "Standard Shipping", type: "FLAT", price: 79, freeAbove: 999 },
          { name: "Express Shipping", type: "FLAT", price: 199 },
        ],
      },
    },
  });
  console.log(`✅ Shipping: India zone with rates`);

  // 8. Create sample pages
  await prisma.page.upsert({
    where: { id: "page-about" },
    update: {},
    create: {
      id: "page-about",
      storeId: store.id,
      title: "About Us",
      slug: "about",
      content: "# About SMDrop\n\nWe curate the finest products from global suppliers and deliver them to your doorstep. Our mission is to make premium products accessible to everyone at fair prices.\n\n## Our Promise\n- 🚚 Free shipping on orders over ₹999\n- 🔄 30-day hassle-free returns\n- 🛡️ Secure payments with Razorpay\n- ⭐ 10,000+ happy customers",
      publishedAt: new Date(),
    },
  });

  await prisma.page.upsert({
    where: { id: "page-faq" },
    update: {},
    create: {
      id: "page-faq",
      storeId: store.id,
      title: "FAQ",
      slug: "faq",
      content: "# Frequently Asked Questions\n\n## Shipping\n**How long does delivery take?**\nStandard delivery takes 5-15 business days depending on your location.\n\n## Returns\n**What is your return policy?**\nWe offer a 30-day return policy on all products in original condition.\n\n## Payment\n**What payment methods do you accept?**\nWe accept UPI, credit/debit cards, net banking, and wallets via Razorpay.",
      publishedAt: new Date(),
    },
  });
  console.log(`✅ Pages: About, FAQ`);

  console.log("\n🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
