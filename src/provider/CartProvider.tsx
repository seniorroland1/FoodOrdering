import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";
import { useCreateOrder } from "../api/OrdersApi";
import { useRouter } from "expo-router";
import { useCreateOrderItem } from "../api/OrderItems";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { createOrder, isLoading, isSuccess } = useCreateOrder();
  const {
    createOrderItem,
    isLoading: isCreateOrderItemLoading,
    isSuccess: isCreateOrderItemSuccess,
  } = useCreateOrderItem();

  const router = useRouter();

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
    } else {
      const newCartItem: CartItem = {
        id: randomUUID.toString(),
        product_id: product.id,
        product: product,
        size: size,
        quantity: 1,
      };
      setItems([newCartItem, ...items]);
    }
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };
  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );

  const clearCart = () => {
    setItems([]);
  };

  const checkout = () => {
    const data = createOrder({
      total,
    });
    if (isSuccess) {
      saveOrderItem(data);
    }
  };

  const saveOrderItem = (order) => {
    const order_items = items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      size: item.size,
    }));
    createOrderItem(order_items);
    if (isCreateOrderItemSuccess) {
      clearCart();
      router.push(`/(user)/order/${order.id}`);
    }
  };

  const contextValues = {
    items,
    addItem,
    updateQuantity,
    total,
    checkout,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
