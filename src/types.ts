export type Product = {
  id: number;
  name: string;
  image: string | null;
  price: number;
};

export type PizzaSize = "S" | "M" | "L" | "XL";

export type CartItem = {
  id: string;
  product_id: number;
  product: Product;
  size: PizzaSize;
  quantity: number;
};

export type Order = {
  id: number;
  created_at: string;
  total: number;
  status: PizzaSize;
  user_id: string;
  order_items: CartItem[];
};
