"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-card border border-white/5 rounded-3xl overflow-hidden group relative"
    >
      {/* Image Area (unchanged) */}
      <div className="relative h-48 w-full bg-secondary/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-white/20">
            <span className="text-4xl">🍕</span> 
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              {product.category}
            </span>
            <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>
          <span className="text-lg font-bold text-white">${product.price}</span>
        </div>
        
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {product.description}
        </p>

        <button
          onClick={() => addItem({ productId: product.id, name: product.name, price: product.price })}
          className="w-full py-3 bg-white/5 hover:bg-primary hover:text-black border border-white/10 rounded-xl flex items-center justify-center gap-2 transition-all font-medium group-hover:border-primary/50"
        >
          <Plus className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
