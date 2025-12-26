"use client";

import { useCart } from "@/context/CartContext";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, total, clearCart } = useCart();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsCheckingOut(true);
    try {
      const order = await api.orders.create({
        items,
        total,
        customerName: "Demo User", // Placeholder
      });
      
      clearCart();
      closeCart();
      toast.success("Order placed successfully!");
      router.push(`/track/${order.id}`);
    } catch (error) {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-white/10 z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center text-xl">
                      🍔
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{item.name}</h4>
                      <p className="text-sm text-primary">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="text-sm font-bold text-white">x{item.quantity}</span>
                       <button 
                         onClick={() => removeItem(item.productId)}
                         className="p-1 hover:text-red-400 text-gray-500 transition-colors"
                       >
                         <Minus className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-white/5 bg-white/5">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400">Total</span>
                <span className="text-3xl font-bold text-white">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={items.length === 0 || isCheckingOut}
                className="w-full py-4 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isCheckingOut ? "Processing..." : "Checkout ->"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
