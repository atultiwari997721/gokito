import AdminSidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="md:ml-64 min-h-screen">
        <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <h2 className="text-xl font-bold text-white">Dashboard Overview</h2>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                A
             </div>
          </div>
        </div>
        <div className="p-8">
            {children}
        </div>
      </main>
    </div>
  );
}
