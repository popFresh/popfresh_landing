import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import { calculatePricing } from "../api/pricing.api";

const CartContext = createContext();

export function CartProvider({ children }) {
  /* --------------------------------------------------
      CART
  -------------------------------------------------- */

  const [cart, setCart] = useState(() => {
    const savedCart =
      localStorage.getItem("popfresh-cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  /* --------------------------------------------------
      CART DRAWER
  -------------------------------------------------- */

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  /* --------------------------------------------------
      PRICING
  -------------------------------------------------- */

  const [pricing, setPricing] = useState({
    subtotal: 0,
    shipping: 0,
    discount: 0,
    total: 0,
  });

  const [pricingLoading, setPricingLoading] =
    useState(false);

  const [appliedCoupon, setAppliedCoupon] =
    useState(null);

  /* --------------------------------------------------
      LOCAL STORAGE
  -------------------------------------------------- */

  useEffect(() => {
    localStorage.setItem(
      "popfresh-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  /* --------------------------------------------------
      RESET PRICING
  -------------------------------------------------- */

  const resetPricing = () => {
    setAppliedCoupon(null);

    setPricing({
      subtotal: 0,
      shipping: 0,
      discount: 0,
      total: 0,
    });
  };

  /* --------------------------------------------------
      REFRESH PRICING
  -------------------------------------------------- */

  const refreshPricing = useCallback(
    async (
      couponCode = appliedCoupon
    ) => {
      if (cart.length === 0) {
        resetPricing();
        return;
      }

      try {
        setPricingLoading(true);

        const data =
          await calculatePricing({
            cartItems: cart.map(
              (item) => ({
                id: item.id,
                quantity:
                  item.quantity,
              })
            ),

            couponCode,
          });

        setPricing({
          subtotal: data.subtotal,
          shipping: data.shipping,
          discount: data.discount,
          total: data.total,
        });

        setAppliedCoupon(
          data.coupon?.code ?? null
        );

        return data;
      } catch (err) {
        // console.error(err);

        

        throw err;
      } finally {
        setPricingLoading(false);
      }
    },
    [cart, appliedCoupon]
  );

  /* --------------------------------------------------
      AUTO RECALCULATE
  -------------------------------------------------- */

  useEffect(() => {
    refreshPricing().catch(() => {});
  }, [cart, refreshPricing]);

  /* --------------------------------------------------
      COUPONS
  -------------------------------------------------- */

const applyCoupon = async (couponCode) => {
  try {
    await refreshPricing(couponCode);

    return {
      success: true,
    };

  } catch (err) {

    return {
      success: false,
      message:
        err.response?.data?.message ??
        "Something went wrong.",
    };

  }
};
  const removeCoupon = async () => {
    await refreshPricing(null);
  };

  /* --------------------------------------------------
      ADD TO CART
  -------------------------------------------------- */

  const addToCart = (
    product,
    quantity = 1
  ) => {
    setCart((prevCart) => {
      const existing =
        prevCart.find(
          (item) =>
            item.id === product.id
        );

        if (existing) {
  if (existing.quantity >= product.stock) {
    toast.info(
      `Cannot add more. Only ${product.stock} item${
        product.stock > 1 ? "s" : ""
      } available in stock.`
    );

    return prevCart;
  }

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

    //   if (existing) {
    //     return prevCart.map(
    //       (item) =>
    //         item.id === product.id
    //           ? {
    //               ...item,
    //               quantity:
    //                 Math.min(
    //                   item.quantity +
    //                     quantity,
    //                   product.stock
    //                 ),
    //             }
    //           : item
    //     );
    //   }

      return [
        ...prevCart,
        {
          ...product,
          quantity,
        },
      ];
    });

    setIsCartOpen(true);
  };

  /* --------------------------------------------------
      BUY NOW
  -------------------------------------------------- */

  const buyNow = (
    product,
    quantity = 1
  ) => {
    setCart([
      {
        ...product,
        quantity,
      },
    ]);

    setIsCartOpen(false);
  };

  /* --------------------------------------------------
      REMOVE
  -------------------------------------------------- */

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  /* --------------------------------------------------
      UPDATE QUANTITY
  -------------------------------------------------- */

  const updateQuantity = (id, quantity) => {
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }

  setCart((prev) => {
    const product = prev.find((item) => item.id === id);

    if (!product) return prev;

    if (quantity > product.stock) {
      toast.info(
        `Cannot add more. Only ${product.stock} item${
          product.stock > 1 ? "s" : ""
        } available in stock.`
      );

      return prev;
    }

    return prev.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity,
          }
        : item
    );
  });
};

/* --------------------------------------------------
      CLEAR CART
  -------------------------------------------------- */

  const clearCart = () => {
    setCart([]);
  };

  /* --------------------------------------------------
      TOTAL ITEMS
  -------------------------------------------------- */

  const totalItems = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [cart]);
    /* --------------------------------------------------
      PROVIDER
  -------------------------------------------------- */

  return (
    <CartContext.Provider
      value={{
        /* -----------------------------
            Cart
        ----------------------------- */

        cart,
        setCart,

        /* -----------------------------
            Drawer
        ----------------------------- */

        isCartOpen,
        setIsCartOpen,

        /* -----------------------------
            Actions
        ----------------------------- */

        addToCart,
        buyNow,
        removeFromCart,
        updateQuantity,
        clearCart,

        /* -----------------------------
            Pricing
        ----------------------------- */

        pricing,
        pricingLoading,

        appliedCoupon,

        refreshPricing,
        applyCoupon,
        removeCoupon,

        /* -----------------------------
            Cart Stats
        ----------------------------- */

        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* --------------------------------------------------
    HOOK
-------------------------------------------------- */

export function useCart() {
  return useContext(CartContext);
}

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import { getShippingRule } from "../api/shippingRule.api.js";
// import { calculatePricing } from "../api/pricing.api";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   /* ----------------------------
//      Cart
//   ---------------------------- */

//   const [cart, setCart] = useState(() => {
//     const savedCart = localStorage.getItem("popfresh-cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   const [shippingRule, setShippingRule] =
//   useState(null);

//   const [shippingLoading, setShippingLoading] =
//   useState(true);

//   /* ----------------------------
//      Cart Drawer
//   ---------------------------- */

//   const [isCartOpen, setIsCartOpen] = useState(false);

  

//   /* ----------------------------
//      Persist Cart
//   ---------------------------- */

//   useEffect(() => {
//     localStorage.setItem(
//       "popfresh-cart",
//       JSON.stringify(cart)
//     );
//   }, [cart]);


  
//   ////////PRICING FETCHING
//   const [pricing, setPricing] = useState({
//   subtotal: 0,
//   shipping: 0,
//   discount: 0,
//   total: 0,
// });

// const [pricingLoading, setPricingLoading] =
//   useState(false);

// const [appliedCoupon, setAppliedCoupon] =
//   useState(null);

// if (cart.length === 0) {

//   setAppliedCoupon(null);

//   setPricing({

//     subtotal: 0,

//     shipping: 0,

//     discount: 0,

//     total: 0,

//   });

//   return;
// }
// const refreshPricing = async (
//   couponCode = appliedCoupon
// ) => {

//   try {

//     setPricingLoading(true);

//     const data =
//       await calculatePricing({

//         cartItems: cart.map((item) => ({
//           id: item.id,
//           quantity: item.quantity,
//         })),

//         couponCode,

//       });

//     setPricing({

//       subtotal: data.subtotal,

//       shipping: data.shipping,

//       discount: data.discount,

//       total: data.total,

//     });

//     setAppliedCoupon(
//       data.coupon?.code ?? null
//     );

//   } catch (err) {

//   console.error(err);

//   setPricing({

//     subtotal:0,

//     shipping:0,

//     discount:0,

//     total:0,

//   });

//   throw err;

// } finally {

//     setPricingLoading(false);

//   }

// };

// useEffect(() => {

//   if (cart.length === 0) {

//     setAppliedCoupon(null);

//     setPricing({

//       subtotal:0,

//       shipping:0,

//       discount:0,

//       total:0,

//     });

//     setPricingLoading(false)
//     return;

//   }

//   refreshPricing();

// },[cart]);

// const applyCoupon = async (coupon) => {

//   try {

//     await refreshPricing(coupon);

//     return true;

//   }

//   catch {

//     return false;

//   }

// };

// const removeCoupon = async () => {

  

//   await refreshPricing("");

// };


//   const refreshShippingRule = async () => {

//   try {

//     setShippingLoading(true);

//     const rule =
//       await getShippingRule();

//     setShippingRule(rule);

//   } catch (err) {

//     console.error(
//       "Failed to fetch shipping rule",
//       err
//     );

//   } finally {

//     setShippingLoading(false);

//   }

// };

// useEffect(() => {

//   refreshShippingRule();

// }, []);
//   /* ----------------------------
//      Add To Cart
//   ---------------------------- */

//   const addToCart = (product, quantity = 1) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find(
//         (item) => item.id === product.id
//       );

//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? {
//                 ...item,
//                 quantity: Math.min(
//                   item.quantity + quantity,
//                   product.stock
//                 ),
//               }
//             : item
//         );
//       }

//       return [
//         ...prevCart,
//         {
//           ...product,
//           quantity,
//         },
//       ];
//     });

//     // Automatically open drawer
//     setIsCartOpen(true);
//   };

//   /* ----------------------------
//      Buy Now
//   ---------------------------- */

//   const buyNow = (product, quantity = 1) => {
//     setCart([
//       {
//         ...product,
//         quantity,
//       },
//     ]);

//     // Buy Now should NOT open drawer
//     setIsCartOpen(false);
//   };

//   /* ----------------------------
//      Remove Product
//   ---------------------------- */

//   const removeFromCart = (id) => {
//     setCart((prev) =>
//       prev.filter((item) => item.id !== id)
//     );
//   };

//   /* ----------------------------
//      Update Quantity
//   ---------------------------- */

//   const updateQuantity = (id, quantity) => {
//     if (quantity <= 0) {
//       removeFromCart(id);
//       return;
//     }

//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               quantity,
//             }
//           : item
//       )
//     );
//   };

//   /* ----------------------------
//      Clear Cart
//   ---------------------------- */

//   const clearCart = () => {
//     setCart([]);
//   };

//   /* ----------------------------
//      Totals
//   ---------------------------- */

//   const totalItems = useMemo(() => {
//     return cart.reduce(
//       (total, item) => total + item.quantity,
//       0
//     );
//   }, [cart]);

//   const subtotal = useMemo(() => {
//     return cart.reduce(
//       (total, item) =>
//         total + item.sellingPrice * item.quantity,
//       0
//     );
//   }, [cart]);

//   const shipping = useMemo(() => {

//   if (!shippingRule) return 0;

//   if (subtotal === 0) return 0;

//   return subtotal >= Number(
//     shippingRule.freeShippingThreshold
//   )
//     ? 0
//     : Number(
//         shippingRule.shippingCharge
//       );

// }, [subtotal, shippingRule]);

//   const total = subtotal + shipping;

//   /* ----------------------------
//      Provider
//   ---------------------------- */

//   return (
//     <CartContext.Provider
//       value={{
//         // Cart
//         cart,
//         setCart,

//         // Actions
//         addToCart,
//         buyNow,
//         removeFromCart,
//         updateQuantity,
//         clearCart,

//         // Totals
// totalItems,

// pricing,
// pricingLoading,

// appliedCoupon,

// applyCoupon,
// removeCoupon,

// refreshPricing,

// shippingRule,
// shippingLoading,
// refreshShippingRule,
//         // Drawer
//         isCartOpen,
//         setIsCartOpen,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(CartContext);
// }