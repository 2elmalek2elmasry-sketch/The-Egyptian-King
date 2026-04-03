import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "../data/products";

export interface CartItem extends Product { quantity: number; }

interface CartContextValue {
  cart: CartItem[];
  currency: string;
  rate: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  setCurrency: (code: string, rate: number) => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem("ekCart") || "[]"); }
    catch { return []; }
  });
  const [currency, setCurrencyCode] = useState("EGP");
  const [rate, setRate] = useState(1);
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => { localStorage.setItem("ekCart", JSON.stringify(cart)); }, [cart]);

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id: number) { setCart((prev) => prev.filter((i) => i.id !== id)); }
  function setCurrency(code: string, r: number) { setCurrencyCode(code); setRate(r); }

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, currency, rate, addToCart, removeFromCart, setCurrency, cartCount, cartTotal, isCartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
