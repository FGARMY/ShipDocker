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
        className="group block relative"
      >
        <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-accent/50">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            quality={85}
            priority={true}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Desktop Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent hidden md:block" />
          <div className="absolute bottom-4 left-4 right-4 hidden md:block">
            <h3 className="text-white font-bold text-lg">{title}</h3>
            <p className="text-white/70 text-sm mt-0.5">{count} products</p>
          </div>
        </div>
        
        {/* Mobile Info (below image) */}
        <div className="mt-3 md:hidden">
          <h3 className="font-bold text-sm text-foreground">{title}</h3>
          <p className="text-muted-foreground text-[10px] uppercase tracking-wider font-semibold">{count} products</p>
        </div>
      </Link>
    </motion.div>
  );
}
