import { INITIAL_ORDERS, PRODUCTS } from "@/data/initialData";

// Simple in-memory store for the demo session.
// In a real app, this would be a database connection.
let orders = [...INITIAL_ORDERS];
let products = [...PRODUCTS];

export const db = {
  orders: {
    getAll: () => orders,
    getById: (id: string) => orders.find((o) => o.id === id),
    add: (order: any) => {
      orders.push(order);
      return order;
    },
    update: (id: string, data: any) => {
      const index = orders.findIndex((o) => o.id === id);
      if (index !== -1) {
        orders[index] = { ...orders[index], ...data };
        return orders[index];
      }
      return null;
    },
  },
  products: {
    getAll: () => products,
  },
};
