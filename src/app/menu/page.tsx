import MenuClient from "@/components/MenuClient";
import Navbar from "@/components/Navbar";
import { db } from "@/lib/db";

export default function MenuPage() {
  const products = db.products.getAll();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/20 to-background">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
          Our <span className="text-primary">Menu</span>
        </h1>
        <p className="text-center text-gray-400 max-w-2xl mx-auto">
          Explore our curated selection of premium dishes prepared with the finest ingredients.
        </p>
      </div>

      <MenuClient products={products} />
    </main>
  );
}
