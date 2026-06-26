import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  /* ----------------------------
     Cart
  ---------------------------- */

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("popfresh-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  /* ----------------------------
     Cart Drawer
  ---------------------------- */

  const [isCartOpen, setIsCartOpen] = useState(false);

  /* ----------------------------
     Persist Cart
  ---------------------------- */

  useEffect(() => {
    localStorage.setItem(
      "popfresh-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  /* ----------------------------
     Add To Cart
  ---------------------------- */

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantity,
                  product.stock
                ),
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity,
        },
      ];
    });

    // Automatically open drawer
    setIsCartOpen(true);
  };

  /* ----------------------------
     Buy Now
  ---------------------------- */

  const buyNow = (product, quantity = 1) => {
    setCart([
      {
        ...product,
        quantity,
      },
    ]);

    // Buy Now should NOT open drawer
    setIsCartOpen(false);
  };

  /* ----------------------------
     Remove Product
  ---------------------------- */

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  /* ----------------------------
     Update Quantity
  ---------------------------- */

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  /* ----------------------------
     Clear Cart
  ---------------------------- */

  const clearCart = () => {
    setCart([]);
  };

  /* ----------------------------
     Totals
  ---------------------------- */

  const totalItems = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + item.sellingPrice * item.quantity,
      0
    );
  }, [cart]);

  const shipping =
    subtotal >= 499 || subtotal === 0
      ? 0
      : 49;

  const total = subtotal + shipping;

  /* ----------------------------
     Provider
  ---------------------------- */

  return (
    <CartContext.Provider
      value={{
        // Cart
        cart,
        setCart,

        // Actions
        addToCart,
        buyNow,
        removeFromCart,
        updateQuantity,
        clearCart,

        // Totals
        totalItems,
        subtotal,
        shipping,
        total,

        // Drawer
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}