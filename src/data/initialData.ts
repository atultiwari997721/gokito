export const CATEGORIES = [
  "All",
  "Thali",
  "Tiffins",
  "Pizza",
  "Burger",
  "Sushi",
  "Dessert",
  "Drinks",
];

export const PRODUCTS = [
  {
    id: "1",
    name: "Truffle Mushroom Pizza",
    description: "Wild mushrooms, truffle oil, mozzarella, and fresh thyme.",
    price: 18.99,
    category: "Pizza",
    image: "/images/pizza-1.jpg", // Placeholder
    isPopular: true,
  },
  {
    id: "2",
    name: "Double Smash Burger",
    description: "Two wagyu beef patties, american cheese, pickles, and secret sauce.",
    price: 14.50,
    category: "Burger",
    image: "/images/burger-1.jpg",
    isPopular: true,
  },
  {
    id: "3",
    name: "Dragon Roll",
    description: "Eel, cucumber, topped with avocado and tobiko.",
    price: 22.00,
    category: "Sushi",
    image: "/images/sushi-1.jpg",
    isPopular: false,
  },
  {
    id: "4",
    name: "Chocolate Lava Cake",
    description: "Warm molten chocolate cake with vanilla bean ice cream.",
    price: 9.00,
    category: "Dessert",
    image: "/images/dessert-1.jpg",
    isPopular: true,
  },
  {
    id: "5",
    name: "Classic Veg Thali",
    description: "Includes 4 Rotis, Dal Fry, Paneer Butter Masala, Rice, Salad, Pickle, and Sweet.",
    price: 12.00,
    category: "Thali",
    image: "/images/thali-veg.jpg",
    isPopular: true,
  },
  {
    id: "6",
    name: "Deluxe Punjabi Thali",
    description: "Includes 2 Butter Naan, Dal Makhani, Shahi Paneer, Jeera Rice, Raita, Salad, Papad, and Gulab Jamun.",
    price: 15.50,
    category: "Thali",
    image: "/images/thali-punjabi.jpg",
    isPopular: true,
  },
  {
    id: "7",
    name: "Small Tiffin (Lunch)",
    description: "Perfect for light eaters. 3 Rotis, 1 Seasonal Veg, Dal, and Salad.",
    price: 6.50,
    category: "Tiffins",
    image: "/images/tiffin-small.jpg",
    isPopular: false,
  },
  {
    id: "8",
    name: "Medium Tiffin (Standard)",
    description: "Balanced meal. 4 Rotis, 1 Dry Veg, 1 Gravy Veg, Dal, Rice, and Salad.",
    price: 8.50,
    category: "Tiffins",
    image: "/images/tiffin-medium.jpg",
    isPopular: true,
  },
  {
    id: "9",
    name: "Large Tiffin (Heavy)",
    description: "For the big appetite. 5 Rotis, 2 Gravy Veg, Dal Fry, Jeera Rice, Sweet, Salad, and Pickle.",
    price: 11.00,
    category: "Tiffins",
    image: "/images/tiffin-large.jpg",
    isPopular: false,
  },
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-001",
    customerName: "Alice Johnson",
    items: [
      { productId: "1", quantity: 1 },
      { productId: "4", quantity: 2 },
    ],
    status: "Delivered",
    total: 36.99,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "ORD-002",
    customerName: "Bob Smith",
    items: [{ productId: "2", quantity: 1 }],
    status: "Appetizer Prepared", // Custom status for tracking demo
    total: 14.50,
    createdAt: new Date().toISOString(),
  },
];
