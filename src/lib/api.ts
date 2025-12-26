const API_URL = "/api";

export const api = {
  products: {
    getAll: async () => {
      const res = await fetch(`${API_URL}/products`);
      return res.json();
    },
  },
  orders: {
    create: async (data: any) => {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    getById: async (id: string) => {
      const res = await fetch(`${API_URL}/orders/${id}`);
      if (!res.ok) throw new Error("Order not found");
      return res.json();
    },
    updateStatus: async (id: string, status: string) => {
      const res = await fetch(`${API_URL}/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      return res.json();
    },
  },
};
