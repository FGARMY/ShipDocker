"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface CategoryCardProps {
  slug: string;
  image: string;
  title: string;
  count: number;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function CategoryCard({ slug, image, title, count }: CategoryCardProps) {
  return (
    <motion.div variants={item}>
      <Link
        href={`/collections/${slug}`}
        className="group block relative aspect-[4/5] rounded-2xl overflow-hidden"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          quality={60}
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg">{title}</h3>
          <p className="text-white/70 text-sm mt-0.5">{count} products</p>
        </div>
      </Link>
    </motion.div>
  );
}
