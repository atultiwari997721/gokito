"use client";

import Navbar from "@/components/Navbar";
import StatusBadge from "@/components/admin/StatusBadge";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Clock, MapPin, Package, Truck } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const STATUS_STEPS = [
  { label: "Order Received", icon: Clock },
  { label: "Preparing", icon: Package },
  { label: "Out for Delivery", icon: Truck },
  { label: "Delivered", icon: Check },
];

export default function TrackOrderPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 5000); // Polling every 5s
    return () => clearInterval(interval);
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const data = await api.orders.getById(orderId);
      setOrder(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!order) return <div className="min-h-screen flex items-center justify-center text-white">Order not found</div>;

  const currentStepIndex = STATUS_STEPS.findIndex((s) => s.label === order.status);
  // Default to 0 if cancelled or unknown, or handle separately.
  // Ideally "Cancelled" should be handled.
  
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-10 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Status Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card border border-white/5 p-6 rounded-3xl">
               <h1 className="text-2xl font-bold text-white mb-2">Order Tracking</h1>
               <p className="text-gray-400 text-sm mb-6">ID: <span className="font-mono text-primary">{order.id}</span></p>

               <div className="space-y-8 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-white/10" />

                  {STATUS_STEPS.map((step, index) => {
                    const isCompleted = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    const Icon = step.icon;

                    return (
                      <div key={step.label} className="relative flex items-center gap-4">
                        <div 
                          className={cn(
                            "w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 bg-background transition-colors",
                            isCompleted ? "border-primary text-primary" : "border-white/20 text-gray-600",
                            isCurrent && "bg-primary/10 shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                           <h4 className={cn("font-bold text-lg", isCompleted ? "text-white" : "text-gray-600")}>{step.label}</h4>
                           {isCurrent && <span className="text-xs text-primary animate-pulse">In Progress...</span>}
                        </div>
                      </div>
                    );
                  })}
               </div>
            </div>

            <div className="bg-card border border-white/5 p-6 rounded-3xl">
              <h3 className="font-bold text-white mb-4">Order Summary</h3>
              <div className="space-y-3">
                 {order.items?.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between text-sm">
                       <span className="text-gray-400">{item.quantity}x {item.name}</span>
                       <span className="text-white font-medium">${item.price}</span>
                    </div>
                 ))}
                 <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-white mt-4">
                    <span>Total</span>
                    <span>${order.total?.toFixed(2)}</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Map Simulation */}
          <div className="lg:col-span-2">
             <div className="bg-card border border-white/5 rounded-3xl h-[600px] relative overflow-hidden group">
                {/* Map Background (Pattern or Image) */}
                <div className="absolute inset-0 bg-[#1a1a1a] opacity-50 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-74.006,40.7128,12,0/800x600?access_token=YOUR_TOKEN')] bg-cover bg-center grayscale" 
                     style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px), radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}>
                </div>

                {/* Animated Route/Marker */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="relative w-full h-full">
                      {/* Simple visual representation of a path */}
                      <svg className="absolute top-1/2 left-1/4 w-1/2 h-20 stroke-primary/30 stroke-2 fill-none stroke-dashed">
                         <path d="M0,40 Q150,-50 300,40" />
                      </svg>
                      
                      {/* Bike Marker */}
                      <motion.div 
                        animate={{ 
                             x: currentStepIndex === 0 ? 0 : currentStepIndex === 1 ? 100 : currentStepIndex === 2 ? 300 : 400,
                             opacity: currentStepIndex === 3 ? 0 : 1
                        }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/4 -mt-6 transform -translate-x-1/2"
                      >
                         <div className="w-12 h-12 bg-primary text-black rounded-full flex items-center justify-center shadow-lg shadow-primary/40">
                             <Truck className="w-6 h-6" />
                         </div>
                         <div className="text-xs text-primary font-bold text-center mt-2 bg-black/50 px-2 rounded">Driver</div>
                      </motion.div>

                      {/* Destination */}
                      <div className="absolute top-1/2 right-[25%] -mt-6">
                          <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center border-4 border-card">
                             <MapPin className="w-6 h-6 text-red-500" />
                          </div>
                      </div>
                   </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur border border-white/10 p-4 rounded-xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                       {/* Driver Avatar */}
                    </div>
                    <div>
                       <h4 className="text-white font-bold">Driver: Michael</h4>
                       <p className="text-xs text-gray-400">Arriving in 15 mins</p>
                    </div>
                    <div className="ml-auto">
                       <button className="px-4 py-2 bg-green-500 text-black font-bold text-xs rounded-full">Call Driver</button>
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </main>
  );
}
