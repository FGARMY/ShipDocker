"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  slug: string;
  image: string;
  count?: number;
}

export function CategoryCard({ title, slug, image, count }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative h-[300px] sm:h-[400px] rounded-[2.5rem] overflow-hidden bg-accent/30 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
    >
      <Link href={`/collections/${slug}`} className="block h-full group">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Immersive Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-white/60 tracking-widest uppercase">
                {count ? `${count} Products` : "Browse Collection"}
              </span>
              
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                <ArrowUpRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
