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

const VALID_COMBO_SIZES = [2, 3, 4];

const EMPTY_PRICING = {
  subtotal: 0,
  shipping: 0,
  discount: 0,
  total: 0,
};

export function CartProvider({ children }) {
  /* ==================================================
      CART
  ================================================== */

  const [cart, setCart] = useState(() => {
    try {
      const savedCart =
        localStorage.getItem("popfresh-cart");

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      if (!Array.isArray(parsedCart)) {
        return [];
      }

      /*
        Make old combo items safe.

        CartItem.jsx expects:
          item.images[0]

        Older combo objects may not have images.
        So we always guarantee an images array.
      */
      return parsedCart.map((item) => ({
        ...item,
        images: Array.isArray(item.images)
          ? item.images
          : [],
      }));
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );

      return [];
    }
  });

  /* ==================================================
      CART DRAWER
  ================================================== */

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  /* ==================================================
      PRICING
  ================================================== */

  const [pricing, setPricing] =
    useState(EMPTY_PRICING);

  const [pricingLoading, setPricingLoading] =
    useState(false);

  const [appliedCoupon, setAppliedCoupon] =
    useState(null);

  /* ==================================================
      LOCAL STORAGE
  ================================================== */

  useEffect(() => {
    localStorage.setItem(
      "popfresh-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  /* ==================================================
      RESET PRICING
  ================================================== */

  const resetPricing = useCallback(() => {
    setAppliedCoupon(null);
    setPricing(EMPTY_PRICING);
  }, []);

  /* ==================================================
      REFRESH PRICING
  ================================================== */

  const refreshPricing = useCallback(
    async (couponCode = appliedCoupon) => {
      if (cart.length === 0) {
        resetPricing();
        return;
      }

      try {
        setPricingLoading(true);

        /*
        ==================================================
          TRANSFORM CART FOR BACKEND
        ==================================================

        NORMAL PRODUCT:

        {
          id,
          quantity
        }

        COMBO:

        {
          type: "COMBO",
          packSize,
          selections: [
            {
              productId,
              quantity
            }
          ]
        }
        */

        const cartItems = cart.map((item) => {
          /* ============================================
              COMBO
          ============================================ */

          if (item.type === "COMBO") {
  return {
    type: "COMBO",

    // IMPORTANT:
    // Backend pricing.service.js expects item.quantity
    quantity: Number(item.quantity ?? 1),

    packSize: Number(
      item.packSize
    ),

    selections:
      Array.isArray(
        item.selections
      )
        ? item.selections.map(
            (selection) => ({
              productId:
                selection.productId,

              quantity:
                Number(
                  selection.quantity ?? 1
                ),
            })
          )
        : [],
  };
}

          /* ============================================
              NORMAL PRODUCT
          ============================================ */

          return {
            id: item.id,
            quantity: Number(
              item.quantity
            ),
          };
        });

        const data =
          await calculatePricing({
            cartItems,
            couponCode,
          });

        setPricing({
          subtotal: Number(
            data.subtotal ?? 0
          ),

          shipping: Number(
            data.shipping ?? 0
          ),

          discount: Number(
            data.discount ?? 0
          ),

          total: Number(
            data.total ?? 0
          ),
        });

        setAppliedCoupon(
          data.coupon?.code ?? null
        );

        return data;
      } catch (error) {
        throw error;
      } finally {
        setPricingLoading(false);
      }
    },
    [
      cart,
      appliedCoupon,
      resetPricing,
    ]
  );

  /* ==================================================
      AUTO RECALCULATE PRICING
  ================================================== */

  useEffect(() => {
    refreshPricing().catch(() => {});
  }, [cart, refreshPricing]);

  /* ==================================================
      APPLY COUPON
  ================================================== */

  const applyCoupon = async (
    couponCode
  ) => {
    if (!couponCode?.trim()) {
      return {
        success: false,
        message: "Please enter a coupon code.",
      };
    }

    try {
      await refreshPricing(
        couponCode.trim().toUpperCase()
      );

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,

        message:
          error.response?.data?.message ??
          "Unable to apply coupon.",
      };
    }
  };

  /* ==================================================
      REMOVE COUPON
  ================================================== */

  const removeCoupon = async () => {
    try {
      await refreshPricing(null);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,

        message:
          error.response?.data?.message ??
          "Unable to remove coupon.",
      };
    }
  };

  /* ==================================================
      ADD NORMAL PRODUCT
  ================================================== */

  const addToCart = (
    product,
    quantity = 1
  ) => {
    if (!product?.id) {
      toast.error(
        "Unable to add this product."
      );

      return;
    }

    const requestedQuantity =
      Number(quantity);

    if (
      !Number.isInteger(
        requestedQuantity
      ) ||
      requestedQuantity < 1
    ) {
      toast.error(
        "Invalid product quantity."
      );

      return;
    }

    setCart((prevCart) => {
      const existing =
        prevCart.find(
          (item) =>
            item.id === product.id &&
            item.type !== "COMBO"
        );

      /* ============================================
          EXISTING PRODUCT
      ============================================ */

      if (existing) {
        const currentQuantity =
          Number(
            existing.quantity ?? 0
          );

        const stock =
          Number(product.stock ?? 0);

        if (
          currentQuantity >= stock
        ) {
          toast.info(
            `Cannot add more. Only ${stock} item${
              stock > 1 ? "s" : ""
            } available in stock.`
          );

          return prevCart;
        }

        const newQuantity =
          Math.min(
            currentQuantity +
              requestedQuantity,
            stock
          );

        if (
          newQuantity ===
          currentQuantity
        ) {
          return prevCart;
        }

        return prevCart.map(
          (item) =>
            item.id === product.id &&
            item.type !== "COMBO"
              ? {
                  ...item,

                  quantity:
                    newQuantity,

                  /*
                    Make sure existing
                    products always have
                    an images array.
                  */
                  images:
                    Array.isArray(
                      item.images
                    )
                      ? item.images
                      : Array.isArray(
                          product.images
                        )
                      ? product.images
                      : [],
                }
              : item
        );
      }

      /* ============================================
          NEW PRODUCT
      ============================================ */

      const stock =
        Number(product.stock ?? 0);

      if (stock <= 0) {
        toast.info(
          `${product.name} is currently out of stock.`
        );

        return prevCart;
      }

      if (
        requestedQuantity > stock
      ) {
        toast.info(
          `Only ${stock} ${product.name} available in stock.`
        );

        return prevCart;
      }

      return [
        ...prevCart,

        {
          ...product,

          type: "PRODUCT",

          quantity:
            requestedQuantity,

          images:
            Array.isArray(
              product.images
            )
              ? product.images
              : [],
        },
      ];
    });

    setIsCartOpen(true);
  };

  /* ==================================================
      ADD COMBO TO CART
  ================================================== */

  const addComboToCart = (
    packSize,
    selections,
    price = null
  ) => {
    /* ============================================
        VALIDATE PACK SIZE
    ============================================ */

    const normalizedPackSize =
      Number(packSize);

    if (
      !VALID_COMBO_SIZES.includes(
        normalizedPackSize
      )
    ) {
      toast.error(
        "Invalid combo pack size."
      );

      return false;
    }

    /* ============================================
        VALIDATE SELECTIONS
    ============================================ */

    if (
      !Array.isArray(selections) ||
      selections.length !==
        normalizedPackSize
    ) {
      toast.error(
        `Please select ${normalizedPackSize} flavours.`
      );

      return false;
    }

    const invalidSelection =
      selections.some(
        (selection) =>
          !selection?.productId
      );

    if (invalidSelection) {
      toast.error(
        "Please select all flavours."
      );

      return false;
    }

    /* ============================================
        NORMALIZE PRICE
    ============================================ */

    const comboPrice =
      price !== null &&
      price !== undefined &&
      !Number.isNaN(Number(price))
        ? Number(price)
        : null;

    /*
      IMPORTANT:

      Combo cart items get their own ID.

      This means:

      Pack 2 combo
      Pack 3 combo
      Pack 4 combo

      can coexist in cart.
    */

    const comboItem = {
      id: `combo-${normalizedPackSize}-${Date.now()}`,

      type: "COMBO",

      name: `PopFresh Pack of ${normalizedPackSize}`,

      title: `PopFresh Pack of ${normalizedPackSize}`,

      packSize:
        normalizedPackSize,

      selections:
        selections.map(
          (selection) => ({
            productId:
              selection.productId,

            quantity: Number(
              selection.quantity ?? 1
            ),

            /*
              Keep optional frontend
              presentation information
              if BuildYourCombo provides it.
            */
            name:
              selection.name ??
              selection.productName ??
              null,

            image:
              selection.image ??
              selection.imageUrl ??
              null,
          })
        ),

      /*
        This is only a frontend
        display/reference value.

        Backend calculatePricing()
        remains the authority on price.
      */
      price: comboPrice,

      quantity: 1,

      /*
        CartItem.jsx expects images[0].
        Therefore this MUST exist.

        If BuildYourCombo passes an image
        for the combo, it can be used here.
      */
      images:
        selections
          .map(
            (selection) =>
              selection.image ??
              selection.imageUrl ??
              null
          )
          .filter(Boolean),

      /*
        Helps old cart UI components
        that expect these fields.
      */
      sellingPrice: comboPrice ?? 0,

      mrp: comboPrice ?? 0,
    };

    setCart((prevCart) => [
      ...prevCart,
      comboItem,
    ]);

    setIsCartOpen(true);

    return true;
  };

  /* ==================================================
      BUY NOW - NORMAL PRODUCT
  ================================================== */

  const buyNow = (
    product,
    quantity = 1
  ) => {
    if (!product?.id) {
      toast.error(
        "Unable to buy this product."
      );

      return;
    }

    const requestedQuantity =
      Number(quantity);

    const stock =
      Number(product.stock ?? 0);

    if (
      !Number.isInteger(
        requestedQuantity
      ) ||
      requestedQuantity < 1
    ) {
      toast.error(
        "Invalid product quantity."
      );

      return;
    }

    if (stock <= 0) {
      toast.info(
        `${product.name} is currently out of stock.`
      );

      return;
    }

    if (
      requestedQuantity > stock
    ) {
      toast.info(
        `Only ${stock} ${product.name} available in stock.`
      );

      return;
    }

    setCart([
      {
        ...product,

        type: "PRODUCT",

        quantity:
          requestedQuantity,

        images:
          Array.isArray(
            product.images
          )
            ? product.images
            : [],
      },
    ]);

    setIsCartOpen(false);
  };

  /* ==================================================
      BUY NOW - COMBO
  ================================================== */

  const buyComboNow = (
    packSize,
    selections,
    price = null
  ) => {
    /* ============================================
        VALIDATE PACK SIZE
    ============================================ */

    const normalizedPackSize =
      Number(packSize);

    if (
      !VALID_COMBO_SIZES.includes(
        normalizedPackSize
      )
    ) {
      toast.error(
        "Invalid combo pack size."
      );

      return false;
    }

    /* ============================================
        VALIDATE SELECTIONS
    ============================================ */

    if (
      !Array.isArray(selections) ||
      selections.length !==
        normalizedPackSize
    ) {
      toast.error(
        `Please select ${normalizedPackSize} flavours.`
      );

      return false;
    }

    const invalidSelection =
      selections.some(
        (selection) =>
          !selection?.productId
      );

    if (invalidSelection) {
      toast.error(
        "Please select all flavours."
      );

      return false;
    }

    /*
      THIS FIXES:

      ReferenceError:
      price is not defined

      because price is now explicitly
      accepted as an argument.
    */

    const comboPrice =
      price !== null &&
      price !== undefined &&
      !Number.isNaN(Number(price))
        ? Number(price)
        : null;

    const comboItem = {
      id: `combo-${normalizedPackSize}-${Date.now()}`,

      type: "COMBO",

      name: `PopFresh Pack of ${normalizedPackSize}`,

      title: `PopFresh Pack of ${normalizedPackSize}`,

      packSize:
        normalizedPackSize,

      selections:
        selections.map(
          (selection) => ({
            productId:
              selection.productId,

            quantity: Number(
              selection.quantity ?? 1
            ),

            name:
              selection.name ??
              selection.productName ??
              null,

            image:
              selection.image ??
              selection.imageUrl ??
              null,
          })
        ),

      /*
        Frontend display price only.
        Backend remains authoritative.
      */
      price: comboPrice,

      sellingPrice:
        comboPrice ?? 0,

      mrp:
        comboPrice ?? 0,

      quantity: 1,

      /*
        IMPORTANT FIX FOR CARTITEM.JSX

        It expects:

          item.images[0]

        So combo always gets images.
      */
      images:
        selections
          .map(
            (selection) =>
              selection.image ??
              selection.imageUrl ??
              null
          )
          .filter(Boolean),
    };

    setCart([comboItem]);

    setIsCartOpen(false);

    return true;
  };

  /* ==================================================
      REMOVE FROM CART
  ================================================== */

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => item.id !== id
      )
    );
  };

  /* ==================================================
      UPDATE QUANTITY
  ================================================== */

  const updateQuantity = (
    id,
    quantity
  ) => {
    const newQuantity =
      Number(quantity);

    if (
      !Number.isInteger(
        newQuantity
      )
    ) {
      return;
    }

    /* ============================================
        REMOVE
    ============================================ */

    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prevCart) => {
      const item =
        prevCart.find(
          (cartItem) =>
            cartItem.id === id
        );

      if (!item) {
        return prevCart;
      }

      /* ============================================
          COMBO
      ============================================ */

      if (
        item.type === "COMBO"
      ) {
        /*
          For V1, each combo object represents
          ONE combo pack.

          We still allow quantity to be changed
          in the UI, but note:

          Your current backend calculatePricing()
          calculates one combo price per cart
          item and does NOT multiply comboPrice
          by item.quantity.

          Therefore keeping combo quantity at 1
          is safest until backend combo quantity
          support is added.
        */

        if (newQuantity > 1) {
          toast.info(
            "For combos, please add another combo pack separately."
          );

          return prevCart;
        }

        return prevCart.map(
          (cartItem) =>
            cartItem.id === id
              ? {
                  ...cartItem,

                  quantity: 1,

                  images:
                    Array.isArray(
                      cartItem.images
                    )
                      ? cartItem.images
                      : [],
                }
              : cartItem
        );
      }

      /* ============================================
          NORMAL PRODUCT
      ============================================ */

      const stock =
        Number(
          item.stock ?? 0
        );

      if (
        newQuantity > stock
      ) {
        toast.info(
          `Cannot add more. Only ${stock} item${
            stock > 1 ? "s" : ""
          } available in stock.`
        );

        return prevCart;
      }

      return prevCart.map(
        (cartItem) =>
          cartItem.id === id
            ? {
                ...cartItem,

                quantity:
                  newQuantity,

                images:
                  Array.isArray(
                    cartItem.images
                  )
                    ? cartItem.images
                    : [],
              }
            : cartItem
      );
    });
  };

  /* ==================================================
      CLEAR CART
  ================================================== */

  const clearCart = () => {
    setCart([]);
    resetPricing();
  };

  /* ==================================================
      TOTAL ITEMS
  ================================================== */

  const totalItems = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(
          item.quantity ?? 0
        ),
      0
    );
  }, [cart]);

  /* ==================================================
      TOTAL CART VALUE
  ================================================== */

  const cartTotal = useMemo(() => {
    return Number(
      pricing.total ?? 0
    );
  }, [pricing.total]);

  /* ==================================================
      PROVIDER
  ================================================== */

  return (
    <CartContext.Provider
      value={{
        /* ============================================
            CART
        ============================================ */

        cart,

        setCart,

        /* ============================================
            DRAWER
        ============================================ */

        isCartOpen,

        setIsCartOpen,

        /* ============================================
            PRODUCT ACTIONS
        ============================================ */

        addToCart,

        addComboToCart,

        buyNow,

        buyComboNow,

        removeFromCart,

        updateQuantity,

        clearCart,

        /* ============================================
            PRICING
        ============================================ */

        pricing,

        cartTotal,

        pricingLoading,

        appliedCoupon,

        refreshPricing,

        applyCoupon,

        removeCoupon,

        /* ============================================
            CART STATS
        ============================================ */

        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ==================================================
    HOOK
================================================== */

export function useCart() {
  return useContext(CartContext);
}

// worked all good before combo products 
// import {
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
//   useCallback,
// } from "react";
// import { toast } from "react-toastify";
// import { calculatePricing } from "../api/pricing.api";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   /* --------------------------------------------------
//       CART
//   -------------------------------------------------- */

//   const [cart, setCart] = useState(() => {
//     const savedCart =
//       localStorage.getItem("popfresh-cart");

//     return savedCart
//       ? JSON.parse(savedCart)
//       : [];
//   });

//   /* --------------------------------------------------
//       CART DRAWER
//   -------------------------------------------------- */

//   const [isCartOpen, setIsCartOpen] =
//     useState(false);

//   /* --------------------------------------------------
//       PRICING
//   -------------------------------------------------- */

//   const [pricing, setPricing] = useState({
//     subtotal: 0,
//     shipping: 0,
//     discount: 0,
//     total: 0,
//   });

//   const [pricingLoading, setPricingLoading] =
//     useState(false);

//   const [appliedCoupon, setAppliedCoupon] =
//     useState(null);

//   /* --------------------------------------------------
//       LOCAL STORAGE
//   -------------------------------------------------- */

//   useEffect(() => {
//     localStorage.setItem(
//       "popfresh-cart",
//       JSON.stringify(cart)
//     );
//   }, [cart]);

//   /* --------------------------------------------------
//       RESET PRICING
//   -------------------------------------------------- */

//   const resetPricing = () => {
//     setAppliedCoupon(null);

//     setPricing({
//       subtotal: 0,
//       shipping: 0,
//       discount: 0,
//       total: 0,
//     });
//   };

//   /* --------------------------------------------------
//       REFRESH PRICING
//   -------------------------------------------------- */

//   const refreshPricing = useCallback(
//     async (
//       couponCode = appliedCoupon
//     ) => {
//       if (cart.length === 0) {
//         resetPricing();
//         return;
//       }

//       try {
//         setPricingLoading(true);

//         const data =
//           await calculatePricing({
//             cartItems: cart.map(
//               (item) => ({
//                 id: item.id,
//                 quantity:
//                   item.quantity,
//               })
//             ),

//             couponCode,
//           });

//         setPricing({
//           subtotal: data.subtotal,
//           shipping: data.shipping,
//           discount: data.discount,
//           total: data.total,
//         });

//         setAppliedCoupon(
//           data.coupon?.code ?? null
//         );

//         return data;
//       } catch (err) {
//         // console.error(err);

        

//         throw err;
//       } finally {
//         setPricingLoading(false);
//       }
//     },
//     [cart, appliedCoupon]
//   );

//   /* --------------------------------------------------
//       AUTO RECALCULATE
//   -------------------------------------------------- */

//   useEffect(() => {
//     refreshPricing().catch(() => {});
//   }, [cart, refreshPricing]);

//   /* --------------------------------------------------
//       COUPONS
//   -------------------------------------------------- */

// const applyCoupon = async (couponCode) => {
//   try {
//     await refreshPricing(couponCode);

//     return {
//       success: true,
//     };

//   } catch (err) {

//     return {
//       success: false,
//       message:
//         err.response?.data?.message ??
//         "Something went wrong.",
//     };

//   }
// };
//   const removeCoupon = async () => {
//     await refreshPricing(null);
//   };

//   /* --------------------------------------------------
//       ADD TO CART
//   -------------------------------------------------- */

//   const addToCart = (
//     product,
//     quantity = 1
//   ) => {
//     setCart((prevCart) => {
//       const existing =
//         prevCart.find(
//           (item) =>
//             item.id === product.id
//         );

//         if (existing) {
//   if (existing.quantity >= product.stock) {
//     toast.info(
//       `Cannot add more. Only ${product.stock} item${
//         product.stock > 1 ? "s" : ""
//       } available in stock.`
//     );

//     return prevCart;
//   }

//   return prevCart.map((item) =>
//     item.id === product.id
//       ? {
//           ...item,
//           quantity: Math.min(
//             item.quantity + quantity,
//             product.stock
//           ),
//         }
//       : item
//   );
// }

//     //   if (existing) {
//     //     return prevCart.map(
//     //       (item) =>
//     //         item.id === product.id
//     //           ? {
//     //               ...item,
//     //               quantity:
//     //                 Math.min(
//     //                   item.quantity +
//     //                     quantity,
//     //                   product.stock
//     //                 ),
//     //             }
//     //           : item
//     //     );
//     //   }

//       return [
//         ...prevCart,
//         {
//           ...product,
//           quantity,
//         },
//       ];
//     });

//     setIsCartOpen(true);
//   };

//   /* --------------------------------------------------
//       BUY NOW
//   -------------------------------------------------- */

//   const buyNow = (
//     product,
//     quantity = 1
//   ) => {
//     setCart([
//       {
//         ...product,
//         quantity,
//       },
//     ]);

//     setIsCartOpen(false);
//   };

//   /* --------------------------------------------------
//       REMOVE
//   -------------------------------------------------- */

//   const removeFromCart = (id) => {
//     setCart((prev) =>
//       prev.filter(
//         (item) => item.id !== id
//       )
//     );
//   };

//   /* --------------------------------------------------
//       UPDATE QUANTITY
//   -------------------------------------------------- */

//   const updateQuantity = (id, quantity) => {
//   if (quantity <= 0) {
//     removeFromCart(id);
//     return;
//   }

//   setCart((prev) => {
//     const product = prev.find((item) => item.id === id);

//     if (!product) return prev;

//     if (quantity > product.stock) {
//       toast.info(
//         `Cannot add more. Only ${product.stock} item${
//           product.stock > 1 ? "s" : ""
//         } available in stock.`
//       );

//       return prev;
//     }

//     return prev.map((item) =>
//       item.id === id
//         ? {
//             ...item,
//             quantity,
//           }
//         : item
//     );
//   });
// };

// /* --------------------------------------------------
//       CLEAR CART
//   -------------------------------------------------- */

//   const clearCart = () => {
//     setCart([]);
//   };

//   /* --------------------------------------------------
//       TOTAL ITEMS
//   -------------------------------------------------- */

//   const totalItems = useMemo(() => {
//     return cart.reduce(
//       (total, item) =>
//         total + item.quantity,
//       0
//     );
//   }, [cart]);
//     /* --------------------------------------------------
//       PROVIDER
//   -------------------------------------------------- */

//   return (
//     <CartContext.Provider
//       value={{
//         /* -----------------------------
//             Cart
//         ----------------------------- */

//         cart,
//         setCart,

//         /* -----------------------------
//             Drawer
//         ----------------------------- */

//         isCartOpen,
//         setIsCartOpen,

//         /* -----------------------------
//             Actions
//         ----------------------------- */

//         addToCart,
//         buyNow,
//         removeFromCart,
//         updateQuantity,
//         clearCart,

//         /* -----------------------------
//             Pricing
//         ----------------------------- */

//         pricing,
//         pricingLoading,

//         appliedCoupon,

//         refreshPricing,
//         applyCoupon,
//         removeCoupon,

//         /* -----------------------------
//             Cart Stats
//         ----------------------------- */

//         totalItems,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// /* --------------------------------------------------
//     HOOK
// -------------------------------------------------- */

// export function useCart() {
//   return useContext(CartContext);
// }

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