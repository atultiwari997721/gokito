import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBadge";
import { db } from "@/lib/db";
import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react";

export default function AdminDashboard() {
  const orders = db.orders.getAll();
  const totalRevenue = orders.reduce((acc, order) => acc + (order.total || 0), 0);
  const totalOrders = orders.length;

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={DollarSign}
          trend="+12.5%"
        />
        <StatCard
          label="Total Orders"
          value={totalOrders.toString()}
          icon={ShoppingBag}
          trend="+5.2%"
        />
        <StatCard
          label="Active Users"
          value="1,204"
          icon={Users}
          trend="+18.2%"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-card border border-white/5 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Recent Orders</h3>
          <Link href="/admin/orders" className="text-sm text-primary hover:underline">
             View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-gray-400 border-b border-white/5">
              <tr>
                <th className="pb-3 pl-4">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="group hover:bg-white/5 transition-colors">
                  <td className="py-4 pl-4 font-mono text-gray-300">{order.id}</td>
                  <td className="py-4 font-medium text-white">{order.customerName || "Guest"}</td>
                  <td className="py-4 text-gray-300">${order.total?.toFixed(2)}</td>
                  <td className="py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-4 pr-4 text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, trend }: any) {
  return (
    <div className="bg-card border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="w-24 h-24" />
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-1">{label}</p>
        <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
        <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
          {trend} from last month
        </span>
      </div>
    </div>
  );
}
