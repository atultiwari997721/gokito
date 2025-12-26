import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { db } from "@/lib/db";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const products = db.products.getAll();
  const featuredProducts = products.filter((p) => p.isPopular);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Future of <span className="text-primary">Food</span> Delivery
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Experience ultra-fast delivery with premium dining options.
              Real-time tracking, seamless payments, and exquisite taste.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/menu"
                className="px-8 py-4 bg-primary text-black font-bold rounded-full hover:bg-primary/90 transition-transform hover:scale-105 flex items-center gap-2"
              >
                Order Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/track"
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all"
              >
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-white">Top Picks for You</h2>
          <Link href="/menu" className="text-primary hover:underline">
            View Full Menu
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto bg-primary/10 border border-primary/20 rounded-3xl p-12 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
             <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">Free Delivery on First Order</h2>
             <p className="text-gray-300 mb-8 max-w-xl mx-auto">Join thousands of happy foodies. Use code <span className="text-white font-mono bg-white/10 px-2 py-1 rounded">GOKITO2025</span> at checkout.</p>
        </div>
      </section>
    </main>
  );
}
