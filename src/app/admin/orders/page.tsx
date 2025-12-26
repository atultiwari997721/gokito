"use client";

import StatusBadge from "@/components/admin/StatusBadge";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const STATUS_OPTIONS = [
  "Order Received",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    // For demo, we might want to poll or just fetch once.
    // In a real app, use SWR or React Query.
    const res = await api.orders.getById(""); // Get All (Need to fix API to support get all via client)
    // Actually api.orders.getById calls /orders/[id].
    // I need api.orders.getAll()
    
    // Quick fix: fetch directly or update api.ts
    const response = await fetch("/api/orders");
    const data = await response.json();
    setOrders(data);
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await api.orders.updateStatus(id, newStatus);
      toast.success("Order status updated");
      fetchOrders(); // Refresh
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Order Management</h1>

      <div className="bg-card border border-white/5 rounded-3xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-gray-400">
            <tr>
              <th className="py-4 pl-6">Order ID</th>
              <th className="py-4">Customer</th>
              <th className="py-4">Items</th>
              <th className="py-4">Total</th>
              <th className="py-4">Current Status</th>
              <th className="py-4 pr-6">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/5 transition-colors">
                <td className="py-4 pl-6 font-mono text-gray-300">{order.id}</td>
                <td className="py-4 font-medium text-white">
                  {order.customerName || "Guest"}
                </td>
                <td className="py-4 text-gray-400">
                  {order.items?.length || 0} items
                </td>
                <td className="py-4 text-gray-300">${order.total?.toFixed(2)}</td>
                <td className="py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="py-4 pr-6">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                    className="bg-black/20 border border-white/10 rounded-lg px-3 py-1 text-xs text-white focus:outline-none focus:border-primary cursor-pointer"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status} className="bg-gray-900">
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
           <div className="p-10 text-center text-gray-500">No orders found.</div>
        )}
      </div>
    </div>
  );
}
