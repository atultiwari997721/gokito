"use client";

import ProductCard from "@/components/ProductCard";
import { CATEGORIES } from "@/data/initialData";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function MenuClient({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Category Filter */}
      <div className="flex overflow-x-auto gap-4 pb-8 scrollbar-hide">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-6 py-2 rounded-full whitespace-nowrap transition-all font-medium border",
              activeCategory === category
                ? "bg-primary text-black border-primary"
                : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No items found in this category.
        </div>
      )}
    </div>
  );
}
