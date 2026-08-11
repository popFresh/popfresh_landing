import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
    Link,
  useNavigate,
} from "react-router-dom";

import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Sparkles,
  ShoppingCart,
  Star,
} from "lucide-react";

import { toast } from "react-toastify";

import {
  getProducts,
  getComboConfigs,
} from "../api/product.api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PopFreshMarquee from "../components/PopFreshMarquee";
import ProductImageSlider from "../components/ProductImageSlider";
import MarketplaceCTA from "../components/MarketplaceCTA";

import { useCart } from "../context/CartContext";


/* =====================================================
   CARD THEMES
===================================================== */

const CARD_THEMES = {
  GREEN: {
    background: "#EAF4EB",
    accent: "#3E8C57",
    text: "#184C35",
  },

  ORANGE: {
    background: "#F8E6DF",
    accent: "#E86A30",
    text: "#184C35",
  },

  RED: {
    background: "#FBE6E2",
    accent: "#D94E43",
    text: "#184C35",
  },

  PURPLE: {
    background: "#F3ECFD",
    accent: "#7C3AED",
    text: "#184C35",
  },

  CREAM: {
    background: "#FBF3DE",
    accent: "#D7A326",
    text: "#184C35",
  },
};


/* =====================================================
   HELPERS
===================================================== */

const getProductImage = (product) => {
  if (!product) {
    return null;
  }

  if (
    Array.isArray(product.images) &&
    product.images.length > 0
  ) {
    const first = product.images[0];

    if (typeof first === "string") {
      return first;
    }

    return (
      first?.imageUrl ||
      first?.url ||
      null
    );
  }

  if (product.imageUrl) {
    return product.imageUrl;
  }

  if (product.image) {
    return product.image;
  }

  return null;
};


const getProductImages = (product) => {
  if (!product) {
    return [];
  }

  if (
    Array.isArray(product.images)
  ) {
    return product.images
      .map((image) => {
        if (typeof image === "string") {
          return image;
        }

        return (
          image?.imageUrl ||
          image?.url ||
          null
        );
      })
      .filter(Boolean);
  }

  const singleImage =
    getProductImage(product);

  return singleImage
    ? [singleImage]
    : [];
};


/* =====================================================
   COMPONENT
===================================================== */

export default function BuildYourCombo() {
  const navigate = useNavigate();

  const {
    addComboToCart,
    buyComboNow,
  } = useCart();


  /* ===================================================
     DATA
  =================================================== */

  const [products, setProducts] =
    useState([]);

  const [comboConfigs, setComboConfigs] =
    useState([]);


  /* ===================================================
     LOADING
  =================================================== */

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(false);


  /* ===================================================
     PACK
  =================================================== */

  const [selectedPackSize, setSelectedPackSize] =
    useState(null);


  /* ===================================================
     SELECTIONS
  ===================================================

     Example:

     Pack 2

     [
       productId,
       productId
     ]

  =================================================== */

  const [comboSelections, setComboSelections] =
    useState([]);


  /* ===================================================
     ACTIVE SLOT
  =================================================== */

  const [activeSlot, setActiveSlot] =
    useState(0);


  /* ===================================================
     GALLERY
  =================================================== */

  const [galleryIndex, setGalleryIndex] =
    useState(0);


  /* ===================================================
     FETCH DATA
  =================================================== */

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [
          productsData,
          configsData,
        ] = await Promise.all([
          getProducts(),
          getComboConfigs(),
        ]);

        const availableProducts =
          Array.isArray(productsData)
            ? productsData.filter(
                (product) =>
                  product?.isActive !== false &&
                  Number(product?.stock ?? 0) > 0
              )
            : [];

        const configs =
          Array.isArray(configsData)
            ? configsData
                .filter((config) =>
                  [2, 3, 4].includes(
                    Number(config.packSize)
                  )
                )
                .sort(
                  (a, b) =>
                    Number(a.packSize) -
                    Number(b.packSize)
                )
            : [];

        setProducts(
          availableProducts
        );

        setComboConfigs(configs);

        /*
          Default to the smallest available
          combo pack.
        */
        if (configs.length > 0) {
          const firstPack =
            Number(
              configs[0].packSize
            );

          setSelectedPackSize(
            firstPack
          );

          setComboSelections(
            Array(firstPack).fill(null)
          );

          setActiveSlot(0);
        }
      } catch (error) {
        console.error(
          "Failed to load combo builder:",
          error
        );

        toast.error(
          "Unable to load the combo builder."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);


  /* ===================================================
     SELECTED CONFIG
  =================================================== */

  const selectedConfig = useMemo(() => {
    if (!selectedPackSize) {
      return null;
    }

    return (
      comboConfigs.find(
        (config) =>
          Number(config.packSize) ===
          Number(selectedPackSize)
      ) || null
    );
  }, [
    comboConfigs,
    selectedPackSize,
  ]);


  /* ===================================================
     SELECTED PRODUCTS
  =================================================== */

  const selectedProducts = useMemo(() => {
    return comboSelections.map(
      (productId) => {
        if (!productId) {
          return null;
        }

        return (
          products.find(
            (product) =>
              product.id === productId
          ) || null
        );
      }
    );
  }, [
    comboSelections,
    products,
  ]);


  /* ===================================================
     SELECTED COUNT
  =================================================== */

  const selectedCount = useMemo(() => {
    return comboSelections.filter(
      Boolean
    ).length;
  }, [comboSelections]);


  /* ===================================================
     ACTIVE PRODUCT
  =================================================== */

  const activeProduct =
    selectedProducts[activeSlot] ||
    selectedProducts.find(Boolean) ||
    products[0] ||
    null;


  /* ===================================================
     GALLERY IMAGES
  =================================================== */

  const galleryImages = useMemo(() => {
    if (!activeProduct) {
      return [];
    }

    return getProductImages(
      activeProduct
    );
  }, [activeProduct]);


  /* ===================================================
     RESET GALLERY WHEN PRODUCT CHANGES
  =================================================== */

  useEffect(() => {
    setGalleryIndex(0);
  }, [activeProduct?.id]);


  /* ===================================================
     CHANGE PACK
  =================================================== */

  const handlePackChange = (
    packSize
  ) => {
    const normalizedPackSize =
      Number(packSize);

    setSelectedPackSize(
      normalizedPackSize
    );

    setComboSelections(
      Array(normalizedPackSize).fill(null)
    );

    setActiveSlot(0);

    setGalleryIndex(0);
  };


  /* ===================================================
     SELECT FLAVOUR
  =================================================== */

  const handleFlavorSelect = (
    productId
  ) => {
    if (
      !selectedPackSize
    ) {
      return;
    }

    const updated = [
      ...comboSelections,
    ];

    /*
      We intentionally allow the same
      flavour multiple times.

      Example:

      Pack of 4

      Pudina
      Pudina
      Cheese
      Peri Peri

      This is useful for a real
      mix-and-match combo.
    */

    updated[activeSlot] =
      productId;

    setComboSelections(
      updated
    );

    /*
      Automatically move to next
      unfilled slot.
    */

    const nextEmpty =
      updated.findIndex(
        (value, index) =>
          !value &&
          index > activeSlot
      );

    if (nextEmpty !== -1) {
      setActiveSlot(nextEmpty);
      return;
    }

    const firstEmpty =
      updated.findIndex(
        (value) => !value
      );

    if (firstEmpty !== -1) {
      setActiveSlot(firstEmpty);
    }
  };


  /* ===================================================
     REMOVE FLAVOUR FROM SLOT
  =================================================== */

  const removeFlavor = (
    index
  ) => {
    const updated = [
      ...comboSelections,
    ];

    updated[index] = null;

    setComboSelections(
      updated
    );

    setActiveSlot(index);
  };


  /* ===================================================
     VALIDATE COMBO
  =================================================== */

  const validateCombo = () => {
    if (!selectedConfig) {
      toast.error(
        "Please select a combo pack."
      );

      return false;
    }

    if (
      comboSelections.length !==
      Number(
        selectedConfig.packSize
      )
    ) {
      toast.error(
        "Please complete your combo."
      );

      return false;
    }

    const hasEmptySlot =
      comboSelections.some(
        (value) => !value
      );

    if (hasEmptySlot) {
      toast.error(
        `Please select all ${selectedConfig.packSize} flavours.`
      );

      return false;
    }

    return true;
  };


  /* ===================================================
     BUILD BACKEND SELECTIONS
  =================================================== */

  const buildSelections = () => {
    return comboSelections.map(
      (productId) => {
        const product =
          products.find(
            (item) =>
              item.id === productId
          );

        return {
          productId,

          quantity: 1,

          /*
            These are frontend presentation
            fields. Backend only needs
            productId + quantity.
          */

          name:
            product?.name ??
            product?.title ??
            "",

          image:
            getProductImage(
              product
            ),
        };
      }
    );
  };


  /* ===================================================
     ADD TO CART
  =================================================== */

  const handleAddToCart = () => {
    if (!validateCombo()) {
      return;
    }

    if (!selectedConfig) {
      return;
    }

    const price =
      Number(
        selectedConfig.price
      );

    if (
      !Number.isFinite(price)
    ) {
      toast.error(
        "Combo price is unavailable."
      );

      return;
    }

    const selections =
      buildSelections();

    try {
      setActionLoading(true);

      const result =
        addComboToCart(
          Number(
            selectedConfig.packSize
          ),

          selections,

          price
        );

      if (result !== false) {
        toast.success(
          "Your combo has been added to cart!"
        );
      }
    } catch (error) {
      console.error(
        "Add combo error:",
        error
      );

      toast.error(
        "Unable to add combo to cart."
      );
    } finally {
      setActionLoading(false);
    }
  };


  /* ===================================================
     BUY NOW
  =================================================== */

  const handleBuyNow = () => {
    if (!validateCombo()) {
      return;
    }

    if (!selectedConfig) {
      return;
    }

    /*
      IMPORTANT:

      Price is declared HERE.

      We don't reference an undefined
      `price` variable anymore.
    */

    const price =
      Number(
        selectedConfig.price
      );

    if (
      !Number.isFinite(price)
    ) {
      toast.error(
        "Combo price is unavailable."
      );

      return;
    }

    const selections =
      buildSelections();

    try {
      setActionLoading(true);

      buyComboNow(
        Number(
          selectedConfig.packSize
        ),

        selections,

        price
      );
    } catch (error) {
      console.error(
        "Buy combo error:",
        error
      );

      toast.error(
        "Unable to continue with your combo."
      );
    } finally {
      setActionLoading(false);
    }
  };


  /* ===================================================
     GALLERY NEXT
  =================================================== */

  const nextImage = () => {
    if (
      galleryImages.length <= 1
    ) {
      return;
    }

    setGalleryIndex(
      (current) =>
        (current + 1) %
        galleryImages.length
    );
  };


  /* ===================================================
     GALLERY PREVIOUS
  =================================================== */

  const previousImage = () => {
    if (
      galleryImages.length <= 1
    ) {
      return;
    }

    setGalleryIndex(
      (current) =>
        current === 0
          ? galleryImages.length - 1
          : current - 1
    );
  };


  /* ===================================================
     SHARED PAGE SECTIONS
  =================================================== */

  const reviews = [
    {
      name: "Priya",
      city: "Delhi",
      text: "Best makhana I've ever tasted.",
    },
    {
      name: "Rohan",
      city: "Mumbai",
      text: "Premium quality and amazing crunch.",
    },
    {
      name: "Sneha",
      city: "Bangalore",
      text: "Healthy snacking finally tastes good.",
    },
    {
      name: "Arjun",
      city: "Chennai",
      text: "Peri Peri flavour is my favourite.",
    },
    {
      name: "Megha",
      city: "Pune",
      text: "Packaging feels very premium.",
    },
  ];

  const marketplaceProduct =
    products.find(
      (product) => product?.amazon || product?.flipkart
    ) || products[0];

  /* ===================================================
     LOADING
  =================================================== */

  if (loading) {
    return (
      <>
        <Navbar alwaysCapsule />

        <main className="min-h-screen bg-[#F6F3EC] flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="flex gap-3">
              <span className="h-4 w-4 rounded-full bg-[#184C35] animate-bounce" />

              <span
                className="h-4 w-4 rounded-full bg-[#3E8C57] animate-bounce"
                style={{
                  animationDelay:
                    "150ms",
                }}
              />

              <span
                className="h-4 w-4 rounded-full bg-[#D7A326] animate-bounce"
                style={{
                  animationDelay:
                    "300ms",
                }}
              />
            </div>

            <p className="mt-8 text-sm uppercase tracking-[0.2em] text-[#184C35]">
              Preparing your combo...
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }


  /* ===================================================
     NO CONFIG
  =================================================== */

  if (
    !loading &&
    comboConfigs.length === 0
  ) {
    return (
      <>
        <Navbar alwaysCapsule />

        <main className="min-h-screen bg-[#F6F3EC] pt-40 px-5 flex items-center justify-center">
          <div className="max-w-lg text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white border border-[#E8E1D5]">
              <Sparkles
                size={26}
                className="text-[#184C35]"
              />
            </div>

            <h1
              className="text-4xl md:text-5xl text-[#174C35]"
              style={{
                fontFamily:
                  "Fraunces, serif",
              }}
            >
              Combos coming soon.
            </h1>

            <p className="mt-5 text-[#667085] leading-7">
              Our custom combo builder is
              currently unavailable.
            </p>

            <button
              onClick={() =>
                navigate("/products")
              }
              className="mt-8 rounded-full bg-[#174C35] px-7 py-3.5 text-white font-semibold"
            >
              Explore Products
            </button>
          </div>
        </main>

        <Footer />
      </>
    );
  }


  /* ===================================================
     CURRENT MAIN IMAGE
  =================================================== */

  const currentImage =
    galleryImages[
      galleryIndex
    ] ||
    getProductImage(
      activeProduct
    );


  /* ===================================================
     RENDER
  =================================================== */

  return (
    <>
      <Navbar alwaysCapsule />

      <main className="min-h-screen bg-[#F6F3EC] pt-32 md:pt-36 pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          {/* =================================================
              INTRO
          ================================================= */}

          {/* <section className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF4EB] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[#184C35] uppercase">
              <Sparkles size={14} />

              Build Your Own
            </div>

            <h1
              className="
                mt-6
                max-w-4xl
                text-[#174C35]
                text-[46px]
                leading-[1.05]
                sm:text-[58px]
                md:text-[68px]
                lg:text-[76px]
              "
              style={{
                fontFamily:
                  "Fraunces, serif",
              }}
            >
              Your flavours.
              <br />

              <span className="italic">
                Your perfect combo.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base md:text-lg leading-8 text-[#667085]">
              Pick your pack size, choose
              your favourite PopFresh
              flavours and create a box
              made exactly for you.
            </p>
          </section> */}


          {/* =================================================
              MAIN BUILDER
          ================================================= */}

          <section
            className="
              mt-12
              lg:mt-16
              grid
              lg:grid-cols-[0.95fr_1.05fr]
              gap-10
              xl:gap-16
              items-start
            "
          >

            {/* ===============================================
                LEFT — VISUAL
            =============================================== */}

            <div className="lg:sticky lg:top-28">

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[34px]
                  border
                  border-[#E8E1D5]
                  bg-white
                  shadow-[0_20px_60px_rgba(24,76,53,0.07)]
                "
              >

                {/* Top label */}

                {/* <div className="absolute left-6 top-6 z-10">
                  <span className="inline-flex rounded-full bg-[#174C35] px-5 py-2.5 text-[10px] font-bold tracking-[0.18em] text-white">
                    POPFRESH
                  </span>
                </div> */}


                {/* Main image */}

                <div
                  className="
                    relative
                    flex
                    h-[420px]
                    sm:h-[500px]
                    md:h-[560px]
                    items-center
                    justify-center
                    overflow-hidden
                    bg-white

                    p-8
                    sm:p-12
                  "
                >

                  {currentImage ? (
                    <img
                      src={currentImage}
                      alt={
                        activeProduct?.name ||
                        "PopFresh flavour"
                      }
                      className="
                        max-h-full
                        max-w-full
                        object-contain
                        transition-all
                        duration-500
                        hover:scale-[1.025]
                      "
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <Sparkles
                        size={42}
                        className="text-[#3E8C57]"
                      />

                      <p className="mt-4 text-sm text-[#667085]">
                        Choose a flavour to
                        preview it
                      </p>
                    </div>
                  )}


                  {/* Previous */}

                  {galleryImages.length >
                    1 && (
                    <button
                      type="button"
                      onClick={
                        previousImage
                      }
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        bg-white/90
                        text-[#174C35]
                        shadow-md
                        backdrop-blur
                        transition
                        hover:scale-105
                      "
                    >
                      <ChevronLeft
                        size={20}
                      />
                    </button>
                  )}


                  {/* Next */}

                  {galleryImages.length >
                    1 && (
                    <button
                      type="button"
                      onClick={nextImage}
                      className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        bg-white/90
                        text-[#174C35]
                        shadow-md
                        backdrop-blur
                        transition
                        hover:scale-105
                      "
                    >
                      <ChevronRight
                        size={20}
                      />
                    </button>
                  )}

                </div>


                {/* Gallery thumbnails */}

                {galleryImages.length >
                  0 && (
                  <div className="border-t border-[#ECE7DB] bg-white px-5 py-5">
                    <div className="flex gap-3 overflow-x-auto pb-1">

                      {galleryImages.map(
                        (
                          image,
                          index
                        ) => (
                          <button
                            key={`${image}-${index}`}
                            type="button"
                            onClick={() =>
                              setGalleryIndex(
                                index
                              )
                            }
                            className={`
                              flex
                              h-16
                              w-16
                              shrink-0
                              items-center
                              justify-center
                              overflow-hidden
                              rounded-2xl
                              border-2
                              bg-[#FBF3DE]
                              transition-all
                              ${
                                galleryIndex ===
                                index
                                  ? "border-[#174C35] shadow-sm"
                                  : "border-transparent hover:border-[#174C35]/30"
                              }
                            `}
                          >
                            <img
                              src={image}
                              alt=""
                              className="h-full w-full object-contain"
                            />
                          </button>
                        )
                      )}

                    </div>
                  </div>
                )}

              </div>


              {/* Selected flavour strip */}

              <div className="mt-5 flex flex-wrap gap-2">

                {selectedProducts.map(
                  (
                    selected,
                    index
                  ) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setActiveSlot(
                          index
                        );

                        if (
                          selected
                        ) {
                          setGalleryIndex(
                            0
                          );
                        }
                      }}
                      className={`
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        transition
                        ${
                          activeSlot ===
                          index
                            ? "border-[#174C35] bg-[#EAF4EB] text-[#174C35]"
                            : "border-[#E1D9CB] bg-white text-[#667085]"
                        }
                      `}
                    >

                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F3EFE6] text-[10px]">
                        {index + 1}
                      </span>

                      {selected
                        ? selected.name
                        : "Choose flavour"}

                    </button>
                  )
                )}

              </div>

            </div>


            {/* ===============================================
                RIGHT — BUILDER
            =============================================== */}

            <div>

              {/* STEP 1 */}

              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] text-[#667085] uppercase">
                  Step 01
                </p>

                <h2
                  className="mt-2 text-3xl md:text-4xl text-[#174C35]"
                  style={{
                    fontFamily:
                      "Fraunces, serif",
                  }}
                >
                  Choose your pack
                </h2>

                <div className="mt-6 flex flex-wrap gap-3">

                  {comboConfigs.map(
                    (config) => {
                      const packSize =
                        Number(
                          config.packSize
                        );

                      const isSelected =
                        Number(
                          selectedPackSize
                        ) ===
                        packSize;

                      return (
                        <button
                          key={config.id}
                          type="button"
                          onClick={() =>
                            handlePackChange(
                              packSize
                            )
                          }
                          className={`
                            rounded-full
                            border-2
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            transition-all
                            duration-200
                            ${
                              isSelected
                                ? "border-[#174C35] bg-[#174C35] text-white shadow-[0_8px_20px_rgba(24,76,53,0.16)]"
                                : "border-[#D8D1C4] bg-white text-[#174C35] hover:border-[#174C35]"
                            }
                          `}
                        >
                          Pack of{" "}
                          {packSize}

                          <span
                            className={`ml-2 ${
                              isSelected
                                ? "text-white/80"
                                : "text-[#667085]"
                            }`}
                          >
                            ₹
                            {Number(
                              config.price
                            )}
                          </span>
                        </button>
                      );
                    }
                  )}

                </div>
              </div>


              {/* STEP 2 */}

              <div className="mt-12">

                <div className="flex items-end justify-between gap-4">

                  <div>
                    <p className="text-[11px] font-bold tracking-[0.2em] text-[#667085] uppercase">
                      Step 02
                    </p>

                    <h2
                      className="mt-2 text-3xl md:text-4xl text-[#174C35]"
                      style={{
                        fontFamily:
                          "Fraunces, serif",
                      }}
                    >
                      Fill your box
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-[#667085]">
                      Choose a slot and pick
                      one of your favourite
                      flavours.
                    </p>
                  </div>

                  <div className="hidden sm:flex shrink-0 items-center gap-2 rounded-full bg-white border border-[#E5DED1] px-4 py-2 text-xs font-semibold text-[#174C35]">
                    <Check
                      size={14}
                    />

                    {selectedCount}/
                    {selectedPackSize ||
                      0}{" "}
                    selected
                  </div>

                </div>


                {/* MOBILE COUNT */}

                <div className="mt-5 flex sm:hidden w-fit items-center gap-2 rounded-full bg-white border border-[#E5DED1] px-4 py-2 text-xs font-semibold text-[#174C35]">
                  <Check
                    size={14}
                  />

                  {selectedCount}/
                  {selectedPackSize ||
                    0}{" "}
                  selected
                </div>


                {/* SLOT CAPSULES */}

                <div className="mt-7 flex flex-wrap gap-2">

                  {comboSelections.map(
                    (
                      productId,
                      index
                    ) => {
                      const selected =
                        products.find(
                          (product) =>
                            product.id ===
                            productId
                        );

                      const isActive =
                        activeSlot ===
                        index;

                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() =>
                            setActiveSlot(
                              index
                            )
                          }
                          className={`
                            group
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border-2
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            transition-all
                            ${
                              isActive
                                ? "border-[#174C35] bg-[#EAF4EB] text-[#174C35]"
                                : "border-[#DED6C9] bg-white text-[#667085]"
                            }
                          `}
                        >

                          <span
                            className={`
                              flex
                              h-7
                              w-7
                              items-center
                              justify-center
                              rounded-full
                              text-xs
                              ${
                                selected
                                  ? "bg-[#174C35] text-white"
                                  : "bg-[#F1ECE3] text-[#667085]"
                              }
                            `}
                          >
                            {selected ? (
                              <Check
                                size={13}
                              />
                            ) : (
                              index + 1
                            )}
                          </span>

                          <span>
                            {selected
                              ? selected.name
                              : `Choose flavour`}
                          </span>

                          {selected && (
                            <span
                              onClick={(
                                event
                              ) => {
                                event.stopPropagation();

                                removeFlavor(
                                  index
                                );
                              }}
                              className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#174C35]/10 text-[#174C35] hover:bg-[#174C35]/20"
                            >
                              ×
                            </span>
                          )}

                        </button>
                      );
                    }
                  )}

                </div>


                {/* FLAVOUR CAPSULES */}

                <div className="mt-8">

                  <div className="flex items-center justify-between mb-4">

                    <p className="text-sm font-semibold text-[#174C35]">
                      Choose flavour for Slot{" "}
                      {activeSlot + 1}
                    </p>

                    <span className="text-xs text-[#98A2B3]">
                      Tap to select
                    </span>

                  </div>


                  <div className="flex flex-wrap gap-3">

                    {products.map(
                      (product) => {
                        const selected =
                          comboSelections[
                            activeSlot
                          ] ===
                          product.id;

                        const image =
                          getProductImage(
                            product
                          );

                        const theme =
                          CARD_THEMES[
                            product.cardTheme
                          ] ||
                          CARD_THEMES.GREEN;

                        return (
                          <button
                            key={
                              product.id
                            }
                            type="button"
                            onClick={() =>
                              handleFlavorSelect(
                                product.id
                              )
                            }
                            className={`
                              group
                              relative
                              inline-flex
                              items-center
                              gap-3
                              rounded-full
                              border-2
                              bg-white
                              pl-2
                              pr-5
                              py-2
                              text-left
                              transition-all
                              duration-200
                              ${
                                selected
                                  ? "border-[#174C35] bg-[#EAF4EB] shadow-[0_6px_18px_rgba(24,76,53,0.10)]"
                                  : "border-[#E3DBCE] hover:border-[#174C35]/50 hover:-translate-y-0.5"
                              }
                            `}
                          >

                            {/* Product image */}

                            <span
                              className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full"
                              style={{
                                background:
                                  theme.background,
                              }}
                            >
                              {image ? (
                                <img
                                  src={image}
                                  alt=""
                                  className="h-full w-full object-contain p-1"
                                />
                              ) : (
                                <Sparkles
                                  size={16}
                                  style={{
                                    color:
                                      theme.accent,
                                  }}
                                />
                              )}
                            </span>


                            {/* Product name */}

                            <span>
                              <span className="block text-sm font-semibold text-[#174C35]">
                                {
                                  product.name
                                }
                              </span>

                              <span className="block text-[11px] text-[#98A2B3]">
                                {product.weight ||
                                  "PopFresh"}
                              </span>
                            </span>


                            {/* Check */}

                            {selected && (
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#174C35] text-white">
                                <Check
                                  size={13}
                                />
                              </span>
                            )}

                          </button>
                        );
                      }
                    )}

                  </div>

                </div>

              </div>


              {/* SUMMARY */}

              <div
                className="
                  mt-12
                  rounded-[28px]
                  border
                  border-[#E5DED1]
                  bg-white
                  p-6
                  md:p-7
                  shadow-[0_15px_45px_rgba(24,76,53,0.05)]
                "
              >

                <div className="flex items-start justify-between gap-6">

                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#667085]">
                      Your combo
                    </p>

                    <h3
                      className="mt-2 text-2xl text-[#174C35]"
                      style={{
                        fontFamily:
                          "Fraunces, serif",
                      }}
                    >
                      Pack of{" "}
                      {selectedPackSize}
                    </h3>
                  </div>


                  <div className="text-right">
                    <p className="text-3xl font-bold text-[#184C35]">
                      ₹
                      {selectedConfig
                        ? Number(
                            selectedConfig.price
                          )
                        : 0}
                    </p>
                  </div>

                </div>


                {/* Selected flavour summary */}

                <div className="mt-6 flex flex-wrap gap-2">

                  {selectedProducts.map(
                    (
                      product,
                      index
                    ) => (
                      <div
                        key={index}
                        className={`
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          px-3
                          py-2
                          text-xs
                          font-medium
                          ${
                            product
                              ? "bg-[#EAF4EB] text-[#184C35]"
                              : "bg-[#F5F1E9] text-[#98A2B3]"
                          }
                        `}
                      >

                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold">
                          {index + 1}
                        </span>

                        {product
                          ? product.name
                          : "Choose flavour"}

                      </div>
                    )
                  )}

                </div>


                {/* Progress */}

                <div className="mt-6">

                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-[#667085]">
                      Combo progress
                    </span>

                    <span className="font-semibold text-[#174C35]">
                      {selectedCount}/
                      {selectedPackSize}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#EFE9DD]">
                    <div
                      className="h-full rounded-full bg-[#3E8C57] transition-all duration-300"
                      style={{
                        width: `${
                          selectedPackSize
                            ? (selectedCount /
                                selectedPackSize) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>

                </div>


                {/* Actions */}

                <div className="mt-7 grid gap-3 sm:grid-cols-2">

                  <button
                    type="button"
                    disabled={
                      actionLoading ||
                      selectedCount !==
                        Number(
                          selectedPackSize
                        )
                    }
                    onClick={
                      handleAddToCart
                    }
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      border-2
                      border-[#174C35]
                      px-6
                      py-4
                      text-sm
                      font-bold
                      text-[#174C35]
                      transition-all
                      hover:bg-[#EAF4EB]
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    <ShoppingCart
                      size={18}
                    />

                    Add to cart
                  </button>


                  <button
                    type="button"
                    disabled={
                      actionLoading ||
                      selectedCount !==
                        Number(
                          selectedPackSize
                        )
                    }
                    onClick={
                      handleBuyNow
                    }
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      bg-[#174C35]
                      px-6
                      py-4
                      text-sm
                      font-bold
                      text-white
                      shadow-[0_10px_25px_rgba(24,76,53,0.18)]
                      transition-all
                      hover:-translate-y-0.5
                      hover:bg-[#123E2B]
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    {actionLoading
                      ? "Please wait..."
                      : "Buy this combo"}

                    {!actionLoading && (
                      <ArrowRight
                        size={18}
                      />
                    )}
                  </button>

                </div>


                {/* Small reassurance */}

                <p className="mt-5 text-center text-xs leading-5 text-[#98A2B3]">
                  Choose {selectedPackSize}{" "}
                  flavours to complete
                  your custom PopFresh box.
                </p>

              </div>

            </div>

          </section>


         

          {/* =================================================
              POPFRESH MARQUEE
          ================================================= */}

          <div
            className="
              mt-24
              mb-24
              relative
              left-1/2
              right-1/2
              -ml-[50vw]
              -mr-[50vw]
              w-screen
            "
          >
            <PopFreshMarquee />
          </div>

          {/* =================================================
              CUSTOMERS ALSO BOUGHT
          ================================================= */}

          <section className="mt-8">
            <div className="mb-12 text-center">
              <span
                className="
                  inline-flex
                  rounded-full
                  bg-[#E9E3D8]
                  px-5
                  py-2
                  text-xs
                  tracking-[0.18em]
                  font-medium
                  text-[#174C35]
                "
              >
                YOU MAY ALSO LIKE
              </span>

              <h2
                className="
                  mt-5
                  text-[#174C35]
                  text-4xl
                  md:text-5xl
                "
                style={{
                  fontFamily: "Fraunces, serif",
                }}
              >
                Customers Also Bought
              </h2>

              <p className="mt-4 text-[#667085]">
                Explore more delicious flavours from PopFresh.
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.slice(0, 3).map((item) => {
                const image = getProductImage(item);
                const theme =
                  CARD_THEMES[item.cardTheme] ||
                  CARD_THEMES.GREEN;

                const sellingPrice = Number(
                  item.discountPrice ?? item.price ?? 0
                );
                const mrp = Number(item.price ?? 0);

                return (
                  <Link
                    key={item.id}
                    to={`/products/${item.slug}`}
                    className="
                      group
                      flex
                      flex-col
                      overflow-hidden
                      rounded-[32px]
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                    "
                    style={{
                      background: theme.background,
                    }}
                  >
                    {/* Badge */}
                    <div className="p-6 pb-0">
                      <span
                        className="
                          inline-flex
                          rounded-full
                          px-4
                          py-2
                          text-white
                          text-[11px]
                          tracking-[0.15em]
                          font-medium
                        "
                        style={{
                          background: theme.accent,
                        }}
                      >
                        {item.badge || "POPFRESH"}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="px-6 pt-6">
                      <div
                        className="
                          relative
                          h-[420px]
                          sm:h-[440px]
                          w-full
                          overflow-hidden
                          rounded-[24px]
                          bg-white/40
                          [&>div]:!h-full
                          [&_img]:!h-full
                          [&_img]:!w-full
                          [&_img]:!object-contain
                        "
                      >
                        <ProductImageSlider
                          images={
                            Array.isArray(item.images)
                              ? item.images
                                  .map((img) =>
                                    typeof img === "string"
                                      ? img
                                      : img?.imageUrl || img?.url
                                  )
                                  .filter(Boolean)
                              : []
                          }
                          title={item.name}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6">
                      <h3
                        className="text-[#174C35] text-2xl leading-tight"
                        style={{
                          fontFamily: "Fraunces, serif",
                        }}
                      >
                        {item.name}
                      </h3>

                      <p className="mt-4 text-[#667085] leading-7 flex-1">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-5">
                        {(Array.isArray(item.highlights)
                          ? item.highlights
                          : []
                        )
                          .slice(0, 3)
                          .map((tag) => (
                            <span
                              key={tag}
                              className="
                                rounded-full
                                bg-white
                                px-3
                                py-1
                                text-sm
                                text-[#174C35]
                              "
                            >
                              {tag}
                            </span>
                          ))}
                      </div>

                      <div className="mt-6 flex items-center gap-3">
                        <span
                          className="text-3xl font-bold"
                          style={{
                            color: theme.text,
                          }}
                        >
                          ₹{sellingPrice}
                        </span>

                        {mrp > sellingPrice && (
                          <span className="text-lg line-through text-gray-400">
                            ₹{mrp}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        className="
                          mt-7
                          w-full
                          rounded-full
                          py-4
                          text-white
                          font-semibold
                          transition-all
                          duration-300
                          group-hover:shadow-lg
                        "
                        style={{
                          background: theme.accent,
                        }}
                      >
                        View Product
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* =================================================
              AVAILABLE ON AMAZON / FLIPKART
          ================================================= */}

          {marketplaceProduct && (
            <div className="mt-24">
              <MarketplaceCTA
                amazon={marketplaceProduct.amazon}
                flipkart={marketplaceProduct.flipkart}
              />
            </div>
          )}

          {/* =================================================
              CUSTOMER REVIEWS
          ================================================= */}

          <section
            className="
              mt-28
              relative
              left-1/2
              right-1/2
              -ml-[50vw]
              -mr-[50vw]
              w-screen
              overflow-hidden
            "
          >
            <div className="text-center mb-12">
              <span
                className="
                  inline-flex
                  rounded-full
                  bg-[#E9E3D8]
                  px-5
                  py-2
                  text-xs
                  tracking-[0.18em]
                  font-medium
                  text-[#174C35]
                "
              >
                CUSTOMER LOVE
              </span>

              <h2
                className="
                  mt-5
                  text-[#174C35]
                  text-4xl
                  md:text-5xl
                "
                style={{
                  fontFamily: "Fraunces, serif",
                }}
              >
                Loved By Snackers
              </h2>

              <p className="mt-4 text-[#667085]">
                Thousands of happy crunches across India.
              </p>
            </div>

            <div
              className="
                flex
                gap-6
                animate-[marquee_30s_linear_infinite]
                w-max
                px-6
              "
            >
              {[...reviews, ...reviews].map((review, index) => (
                <div
                  key={`${review.name}-${index}`}
                  className="
                    w-[280px]
                    md:w-[330px]
                    rounded-[30px]
                    bg-white
                    p-8
                    border
                    border-[#ECE7DB]
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-xl
                  "
                >
                  <div className="flex gap-1 text-[#E4C06A] mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill="currentColor"
                      />
                    ))}
                  </div>

                  <p
                    className="
                      text-[#174C35]
                      text-lg
                      leading-8
                    "
                  >
                    "{review.text}"
                  </p>

                  <div className="mt-8">
                    <h4 className="font-semibold text-[#174C35]">
                      {review.name}
                    </h4>

                    <span className="text-[#667085] text-sm">
                      {review.city}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}



// import {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//     Link,
//   useNavigate,
// } from "react-router-dom";

// import {
//   ArrowRight,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Minus,
//   Plus,
//   Sparkles,
//   ShoppingCart,
//   Star,
// } from "lucide-react";

// import { toast } from "react-toastify";

// import {
//   getProducts,
//   getComboConfigs,
// } from "../api/product.api";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import PopFreshMarquee from "../components/PopFreshMarquee";
// import ProductImageSlider from "../components/ProductImageSlider";
// import MarketplaceCTA from "../components/MarketplaceCTA";

// import { useCart } from "../context/CartContext";


// /* =====================================================
//    CARD THEMES
// ===================================================== */

// const CARD_THEMES = {
//   GREEN: {
//     background: "#EAF4EB",
//     accent: "#3E8C57",
//     text: "#184C35",
//   },

//   ORANGE: {
//     background: "#F8E6DF",
//     accent: "#E86A30",
//     text: "#184C35",
//   },

//   RED: {
//     background: "#FBE6E2",
//     accent: "#D94E43",
//     text: "#184C35",
//   },

//   PURPLE: {
//     background: "#F3ECFD",
//     accent: "#7C3AED",
//     text: "#184C35",
//   },

//   CREAM: {
//     background: "#FBF3DE",
//     accent: "#D7A326",
//     text: "#184C35",
//   },
// };


// /* =====================================================
//    HELPERS
// ===================================================== */

// const getProductImage = (product) => {
//   if (!product) {
//     return null;
//   }

//   if (
//     Array.isArray(product.images) &&
//     product.images.length > 0
//   ) {
//     const first = product.images[0];

//     if (typeof first === "string") {
//       return first;
//     }

//     return (
//       first?.imageUrl ||
//       first?.url ||
//       null
//     );
//   }

//   if (product.imageUrl) {
//     return product.imageUrl;
//   }

//   if (product.image) {
//     return product.image;
//   }

//   return null;
// };


// const getProductImages = (product) => {
//   if (!product) {
//     return [];
//   }

//   if (
//     Array.isArray(product.images)
//   ) {
//     return product.images
//       .map((image) => {
//         if (typeof image === "string") {
//           return image;
//         }

//         return (
//           image?.imageUrl ||
//           image?.url ||
//           null
//         );
//       })
//       .filter(Boolean);
//   }

//   const singleImage =
//     getProductImage(product);

//   return singleImage
//     ? [singleImage]
//     : [];
// };


// /* =====================================================
//    COMPONENT
// ===================================================== */

// export default function BuildYourCombo() {
//   const navigate = useNavigate();

//   const {
//     addComboToCart,
//     buyComboNow,
//   } = useCart();


//   /* ===================================================
//      DATA
//   =================================================== */

//   const [products, setProducts] =
//     useState([]);

//   const [comboConfigs, setComboConfigs] =
//     useState([]);


//   /* ===================================================
//      LOADING
//   =================================================== */

//   const [loading, setLoading] =
//     useState(true);

//   const [actionLoading, setActionLoading] =
//     useState(false);


//   /* ===================================================
//      PACK
//   =================================================== */

//   const [selectedPackSize, setSelectedPackSize] =
//     useState(null);


//   /* ===================================================
//      SELECTIONS
//   ===================================================

//      Example:

//      Pack 2

//      [
//        productId,
//        productId
//      ]

//   =================================================== */

//   const [comboSelections, setComboSelections] =
//     useState([]);


//   /* ===================================================
//      ACTIVE SLOT
//   =================================================== */

//   const [activeSlot, setActiveSlot] =
//     useState(0);


//   /* ===================================================
//      GALLERY
//   =================================================== */

//   const [galleryIndex, setGalleryIndex] =
//     useState(0);


//   /* ===================================================
//      FETCH DATA
//   =================================================== */

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true);

//         const [
//           productsData,
//           configsData,
//         ] = await Promise.all([
//           getProducts(),
//           getComboConfigs(),
//         ]);

//         const availableProducts =
//           Array.isArray(productsData)
//             ? productsData.filter(
//                 (product) =>
//                   product?.isActive !== false &&
//                   Number(product?.stock ?? 0) > 0
//               )
//             : [];

//         const configs =
//           Array.isArray(configsData)
//             ? configsData
//                 .filter((config) =>
//                   [2, 3, 4].includes(
//                     Number(config.packSize)
//                   )
//                 )
//                 .sort(
//                   (a, b) =>
//                     Number(a.packSize) -
//                     Number(b.packSize)
//                 )
//             : [];

//         setProducts(
//           availableProducts
//         );

//         setComboConfigs(configs);

//         /*
//           Default to the smallest available
//           combo pack.
//         */
//         if (configs.length > 0) {
//           const firstPack =
//             Number(
//               configs[0].packSize
//             );

//           setSelectedPackSize(
//             firstPack
//           );

//           setComboSelections(
//             Array(firstPack).fill(null)
//           );

//           setActiveSlot(0);
//         }
//       } catch (error) {
//         console.error(
//           "Failed to load combo builder:",
//           error
//         );

//         toast.error(
//           "Unable to load the combo builder."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);


//   /* ===================================================
//      SELECTED CONFIG
//   =================================================== */

//   const selectedConfig = useMemo(() => {
//     if (!selectedPackSize) {
//       return null;
//     }

//     return (
//       comboConfigs.find(
//         (config) =>
//           Number(config.packSize) ===
//           Number(selectedPackSize)
//       ) || null
//     );
//   }, [
//     comboConfigs,
//     selectedPackSize,
//   ]);


//   /* ===================================================
//      SELECTED PRODUCTS
//   =================================================== */

//   const selectedProducts = useMemo(() => {
//     return comboSelections.map(
//       (productId) => {
//         if (!productId) {
//           return null;
//         }

//         return (
//           products.find(
//             (product) =>
//               product.id === productId
//           ) || null
//         );
//       }
//     );
//   }, [
//     comboSelections,
//     products,
//   ]);


//   /* ===================================================
//      SELECTED COUNT
//   =================================================== */

//   const selectedCount = useMemo(() => {
//     return comboSelections.filter(
//       Boolean
//     ).length;
//   }, [comboSelections]);


//   /* ===================================================
//      ACTIVE PRODUCT
//   =================================================== */

//   const activeProduct =
//     selectedProducts[activeSlot] ||
//     selectedProducts.find(Boolean) ||
//     products[0] ||
//     null;


//   /* ===================================================
//      GALLERY IMAGES
//   =================================================== */

//   const galleryImages = useMemo(() => {
//     if (!activeProduct) {
//       return [];
//     }

//     return getProductImages(
//       activeProduct
//     );
//   }, [activeProduct]);


//   /* ===================================================
//      RESET GALLERY WHEN PRODUCT CHANGES
//   =================================================== */

//   useEffect(() => {
//     setGalleryIndex(0);
//   }, [activeProduct?.id]);


//   /* ===================================================
//      CHANGE PACK
//   =================================================== */

//   const handlePackChange = (
//     packSize
//   ) => {
//     const normalizedPackSize =
//       Number(packSize);

//     setSelectedPackSize(
//       normalizedPackSize
//     );

//     setComboSelections(
//       Array(normalizedPackSize).fill(null)
//     );

//     setActiveSlot(0);

//     setGalleryIndex(0);
//   };


//   /* ===================================================
//      SELECT FLAVOUR
//   =================================================== */

//   const handleFlavorSelect = (
//     productId
//   ) => {
//     if (
//       !selectedPackSize
//     ) {
//       return;
//     }

//     const updated = [
//       ...comboSelections,
//     ];

//     /*
//       We intentionally allow the same
//       flavour multiple times.

//       Example:

//       Pack of 4

//       Pudina
//       Pudina
//       Cheese
//       Peri Peri

//       This is useful for a real
//       mix-and-match combo.
//     */

//     updated[activeSlot] =
//       productId;

//     setComboSelections(
//       updated
//     );

//     /*
//       Automatically move to next
//       unfilled slot.
//     */

//     const nextEmpty =
//       updated.findIndex(
//         (value, index) =>
//           !value &&
//           index > activeSlot
//       );

//     if (nextEmpty !== -1) {
//       setActiveSlot(nextEmpty);
//       return;
//     }

//     const firstEmpty =
//       updated.findIndex(
//         (value) => !value
//       );

//     if (firstEmpty !== -1) {
//       setActiveSlot(firstEmpty);
//     }
//   };


//   /* ===================================================
//      REMOVE FLAVOUR FROM SLOT
//   =================================================== */

//   const removeFlavor = (
//     index
//   ) => {
//     const updated = [
//       ...comboSelections,
//     ];

//     updated[index] = null;

//     setComboSelections(
//       updated
//     );

//     setActiveSlot(index);
//   };


//   /* ===================================================
//      VALIDATE COMBO
//   =================================================== */

//   const validateCombo = () => {
//     if (!selectedConfig) {
//       toast.error(
//         "Please select a combo pack."
//       );

//       return false;
//     }

//     if (
//       comboSelections.length !==
//       Number(
//         selectedConfig.packSize
//       )
//     ) {
//       toast.error(
//         "Please complete your combo."
//       );

//       return false;
//     }

//     const hasEmptySlot =
//       comboSelections.some(
//         (value) => !value
//       );

//     if (hasEmptySlot) {
//       toast.error(
//         `Please select all ${selectedConfig.packSize} flavours.`
//       );

//       return false;
//     }

//     return true;
//   };


//   /* ===================================================
//      BUILD BACKEND SELECTIONS
//   =================================================== */

//   const buildSelections = () => {
//     return comboSelections.map(
//       (productId) => {
//         const product =
//           products.find(
//             (item) =>
//               item.id === productId
//           );

//         return {
//           productId,

//           quantity: 1,

//           /*
//             These are frontend presentation
//             fields. Backend only needs
//             productId + quantity.
//           */

//           name:
//             product?.name ??
//             product?.title ??
//             "",

//           image:
//             getProductImage(
//               product
//             ),
//         };
//       }
//     );
//   };


//   /* ===================================================
//      ADD TO CART
//   =================================================== */

//   const handleAddToCart = () => {
//     if (!validateCombo()) {
//       return;
//     }

//     if (!selectedConfig) {
//       return;
//     }

//     const price =
//       Number(
//         selectedConfig.price
//       );

//     if (
//       !Number.isFinite(price)
//     ) {
//       toast.error(
//         "Combo price is unavailable."
//       );

//       return;
//     }

//     const selections =
//       buildSelections();

//     try {
//       setActionLoading(true);

//       const result =
//         addComboToCart(
//           Number(
//             selectedConfig.packSize
//           ),

//           selections,

//           price
//         );

//       if (result !== false) {
//         toast.success(
//           "Your combo has been added to cart!"
//         );
//       }
//     } catch (error) {
//       console.error(
//         "Add combo error:",
//         error
//       );

//       toast.error(
//         "Unable to add combo to cart."
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };


//   /* ===================================================
//      BUY NOW
//   =================================================== */

//   const handleBuyNow = () => {
//     if (!validateCombo()) {
//       return;
//     }

//     if (!selectedConfig) {
//       return;
//     }

//     /*
//       IMPORTANT:

//       Price is declared HERE.

//       We don't reference an undefined
//       `price` variable anymore.
//     */

//     const price =
//       Number(
//         selectedConfig.price
//       );

//     if (
//       !Number.isFinite(price)
//     ) {
//       toast.error(
//         "Combo price is unavailable."
//       );

//       return;
//     }

//     const selections =
//       buildSelections();

//     try {
//       setActionLoading(true);

//       buyComboNow(
//         Number(
//           selectedConfig.packSize
//         ),

//         selections,

//         price
//       );
//     } catch (error) {
//       console.error(
//         "Buy combo error:",
//         error
//       );

//       toast.error(
//         "Unable to continue with your combo."
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };


//   /* ===================================================
//      GALLERY NEXT
//   =================================================== */

//   const nextImage = () => {
//     if (
//       galleryImages.length <= 1
//     ) {
//       return;
//     }

//     setGalleryIndex(
//       (current) =>
//         (current + 1) %
//         galleryImages.length
//     );
//   };


//   /* ===================================================
//      GALLERY PREVIOUS
//   =================================================== */

//   const previousImage = () => {
//     if (
//       galleryImages.length <= 1
//     ) {
//       return;
//     }

//     setGalleryIndex(
//       (current) =>
//         current === 0
//           ? galleryImages.length - 1
//           : current - 1
//     );
//   };


//   /* ===================================================
//      SHARED PAGE SECTIONS
//   =================================================== */

//   const reviews = [
//     {
//       name: "Priya",
//       city: "Delhi",
//       text: "Best makhana I've ever tasted.",
//     },
//     {
//       name: "Rohan",
//       city: "Mumbai",
//       text: "Premium quality and amazing crunch.",
//     },
//     {
//       name: "Sneha",
//       city: "Bangalore",
//       text: "Healthy snacking finally tastes good.",
//     },
//     {
//       name: "Arjun",
//       city: "Chennai",
//       text: "Peri Peri flavour is my favourite.",
//     },
//     {
//       name: "Megha",
//       city: "Pune",
//       text: "Packaging feels very premium.",
//     },
//   ];

//   const marketplaceProduct =
//     products.find(
//       (product) => product?.amazon || product?.flipkart
//     ) || products[0];

//   /* ===================================================
//      LOADING
//   =================================================== */

//   if (loading) {
//     return (
//       <>
//         <Navbar alwaysCapsule />

//         <main className="min-h-screen bg-[#F6F3EC] flex items-center justify-center">
//           <div className="flex flex-col items-center">
//             <div className="flex gap-3">
//               <span className="h-4 w-4 rounded-full bg-[#184C35] animate-bounce" />

//               <span
//                 className="h-4 w-4 rounded-full bg-[#3E8C57] animate-bounce"
//                 style={{
//                   animationDelay:
//                     "150ms",
//                 }}
//               />

//               <span
//                 className="h-4 w-4 rounded-full bg-[#D7A326] animate-bounce"
//                 style={{
//                   animationDelay:
//                     "300ms",
//                 }}
//               />
//             </div>

//             <p className="mt-8 text-sm uppercase tracking-[0.2em] text-[#184C35]">
//               Preparing your combo...
//             </p>
//           </div>
//         </main>

//         <Footer />
//       </>
//     );
//   }


//   /* ===================================================
//      NO CONFIG
//   =================================================== */

//   if (
//     !loading &&
//     comboConfigs.length === 0
//   ) {
//     return (
//       <>
//         <Navbar alwaysCapsule />

//         <main className="min-h-screen bg-[#F6F3EC] pt-40 px-5 flex items-center justify-center">
//           <div className="max-w-lg text-center">
//             <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white border border-[#E8E1D5]">
//               <Sparkles
//                 size={26}
//                 className="text-[#184C35]"
//               />
//             </div>

//             <h1
//               className="text-4xl md:text-5xl text-[#174C35]"
//               style={{
//                 fontFamily:
//                   "Fraunces, serif",
//               }}
//             >
//               Combos coming soon.
//             </h1>

//             <p className="mt-5 text-[#667085] leading-7">
//               Our custom combo builder is
//               currently unavailable.
//             </p>

//             <button
//               onClick={() =>
//                 navigate("/products")
//               }
//               className="mt-8 rounded-full bg-[#174C35] px-7 py-3.5 text-white font-semibold"
//             >
//               Explore Products
//             </button>
//           </div>
//         </main>

//         <Footer />
//       </>
//     );
//   }


//   /* ===================================================
//      CURRENT MAIN IMAGE
//   =================================================== */

//   const currentImage =
//     galleryImages[
//       galleryIndex
//     ] ||
//     getProductImage(
//       activeProduct
//     );


//   /* ===================================================
//      RENDER
//   =================================================== */

//   return (
//     <>
//       <Navbar alwaysCapsule />

//       <main className="min-h-screen bg-[#F6F3EC] pt-32 md:pt-36 pb-24">
//         <div className="mx-auto max-w-7xl px-5 lg:px-8">

//           {/* =================================================
//               INTRO
//           ================================================= */}

//           {/* <section className="max-w-4xl">
//             <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF4EB] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-[#184C35] uppercase">
//               <Sparkles size={14} />

//               Build Your Own
//             </div>

//             <h1
//               className="
//                 mt-6
//                 max-w-4xl
//                 text-[#174C35]
//                 text-[46px]
//                 leading-[1.05]
//                 sm:text-[58px]
//                 md:text-[68px]
//                 lg:text-[76px]
//               "
//               style={{
//                 fontFamily:
//                   "Fraunces, serif",
//               }}
//             >
//               Your flavours.
//               <br />

//               <span className="italic">
//                 Your perfect combo.
//               </span>
//             </h1>

//             <p className="mt-6 max-w-2xl text-base md:text-lg leading-8 text-[#667085]">
//               Pick your pack size, choose
//               your favourite PopFresh
//               flavours and create a box
//               made exactly for you.
//             </p>
//           </section> */}


//           {/* =================================================
//               MAIN BUILDER
//           ================================================= */}

//           <section
//             className="
//               mt-12
//               lg:mt-16
//               grid
//               lg:grid-cols-[0.95fr_1.05fr]
//               gap-10
//               xl:gap-16
//               items-start
//             "
//           >

//             {/* ===============================================
//                 LEFT — VISUAL
//             =============================================== */}

//             <div className="lg:sticky lg:top-28">

//               <div
//                 className="
//                   relative
//                   overflow-hidden
//                   rounded-[34px]
//                   border
//                   border-[#E8E1D5]
//                   bg-white
//                   shadow-[0_20px_60px_rgba(24,76,53,0.07)]
//                 "
//               >

//                 {/* Top label */}

//                 {/* <div className="absolute left-6 top-6 z-10">
//                   <span className="inline-flex rounded-full bg-[#174C35] px-5 py-2.5 text-[10px] font-bold tracking-[0.18em] text-white">
//                     POPFRESH
//                   </span>
//                 </div> */}


//                 {/* Main image */}

//                 <div
//                   className="
//                     relative
//                     flex
//                     h-[420px]
//                     sm:h-[500px]
//                     md:h-[560px]
//                     items-center
//                     justify-center
//                     overflow-hidden
//                     bg-white

//                     p-8
//                     sm:p-12
//                   "
//                 >

//                   {currentImage ? (
//                     <img
//                       src={currentImage}
//                       alt={
//                         activeProduct?.name ||
//                         "PopFresh flavour"
//                       }
//                       className="
//                         max-h-full
//                         max-w-full
//                         object-contain
//                         transition-all
//                         duration-500
//                         hover:scale-[1.025]
//                       "
//                     />
//                   ) : (
//                     <div className="flex flex-col items-center justify-center text-center">
//                       <Sparkles
//                         size={42}
//                         className="text-[#3E8C57]"
//                       />

//                       <p className="mt-4 text-sm text-[#667085]">
//                         Choose a flavour to
//                         preview it
//                       </p>
//                     </div>
//                   )}


//                   {/* Previous */}

//                   {galleryImages.length >
//                     1 && (
//                     <button
//                       type="button"
//                       onClick={
//                         previousImage
//                       }
//                       className="
//                         absolute
//                         left-4
//                         top-1/2
//                         -translate-y-1/2
//                         flex
//                         h-11
//                         w-11
//                         items-center
//                         justify-center
//                         rounded-full
//                         bg-white/90
//                         text-[#174C35]
//                         shadow-md
//                         backdrop-blur
//                         transition
//                         hover:scale-105
//                       "
//                     >
//                       <ChevronLeft
//                         size={20}
//                       />
//                     </button>
//                   )}


//                   {/* Next */}

//                   {galleryImages.length >
//                     1 && (
//                     <button
//                       type="button"
//                       onClick={nextImage}
//                       className="
//                         absolute
//                         right-4
//                         top-1/2
//                         -translate-y-1/2
//                         flex
//                         h-11
//                         w-11
//                         items-center
//                         justify-center
//                         rounded-full
//                         bg-white/90
//                         text-[#174C35]
//                         shadow-md
//                         backdrop-blur
//                         transition
//                         hover:scale-105
//                       "
//                     >
//                       <ChevronRight
//                         size={20}
//                       />
//                     </button>
//                   )}

//                 </div>


//                 {/* Gallery thumbnails */}

//                 {galleryImages.length >
//                   0 && (
//                   <div className="border-t border-[#ECE7DB] bg-white px-5 py-5">
//                     <div className="flex gap-3 overflow-x-auto pb-1">

//                       {galleryImages.map(
//                         (
//                           image,
//                           index
//                         ) => (
//                           <button
//                             key={`${image}-${index}`}
//                             type="button"
//                             onClick={() =>
//                               setGalleryIndex(
//                                 index
//                               )
//                             }
//                             className={`
//                               flex
//                               h-16
//                               w-16
//                               shrink-0
//                               items-center
//                               justify-center
//                               overflow-hidden
//                               rounded-2xl
//                               border-2
//                               bg-[#FBF3DE]
//                               transition-all
//                               ${
//                                 galleryIndex ===
//                                 index
//                                   ? "border-[#174C35] shadow-sm"
//                                   : "border-transparent hover:border-[#174C35]/30"
//                               }
//                             `}
//                           >
//                             <img
//                               src={image}
//                               alt=""
//                               className="h-full w-full object-contain"
//                             />
//                           </button>
//                         )
//                       )}

//                     </div>
//                   </div>
//                 )}

//               </div>


//               {/* Selected flavour strip */}

//               <div className="mt-5 flex flex-wrap gap-2">

//                 {selectedProducts.map(
//                   (
//                     selected,
//                     index
//                   ) => (
//                     <button
//                       key={index}
//                       type="button"
//                       onClick={() => {
//                         setActiveSlot(
//                           index
//                         );

//                         if (
//                           selected
//                         ) {
//                           setGalleryIndex(
//                             0
//                           );
//                         }
//                       }}
//                       className={`
//                         inline-flex
//                         items-center
//                         gap-2
//                         rounded-full
//                         border
//                         px-4
//                         py-2
//                         text-xs
//                         font-semibold
//                         transition
//                         ${
//                           activeSlot ===
//                           index
//                             ? "border-[#174C35] bg-[#EAF4EB] text-[#174C35]"
//                             : "border-[#E1D9CB] bg-white text-[#667085]"
//                         }
//                       `}
//                     >

//                       <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F3EFE6] text-[10px]">
//                         {index + 1}
//                       </span>

//                       {selected
//                         ? selected.name
//                         : "Choose flavour"}

//                     </button>
//                   )
//                 )}

//               </div>

//             </div>


//             {/* ===============================================
//                 RIGHT — BUILDER
//             =============================================== */}

//             <div>

//               {/* STEP 1 */}

//               <div>
//                 <p className="text-[11px] font-bold tracking-[0.2em] text-[#667085] uppercase">
//                   Step 01
//                 </p>

//                 <h2
//                   className="mt-2 text-3xl md:text-4xl text-[#174C35]"
//                   style={{
//                     fontFamily:
//                       "Fraunces, serif",
//                   }}
//                 >
//                   Choose your pack
//                 </h2>

//                 <div className="mt-6 flex flex-wrap gap-3">

//                   {comboConfigs.map(
//                     (config) => {
//                       const packSize =
//                         Number(
//                           config.packSize
//                         );

//                       const isSelected =
//                         Number(
//                           selectedPackSize
//                         ) ===
//                         packSize;

//                       return (
//                         <button
//                           key={config.id}
//                           type="button"
//                           onClick={() =>
//                             handlePackChange(
//                               packSize
//                             )
//                           }
//                           className={`
//                             rounded-full
//                             border-2
//                             px-5
//                             py-3
//                             text-sm
//                             font-semibold
//                             transition-all
//                             duration-200
//                             ${
//                               isSelected
//                                 ? "border-[#174C35] bg-[#174C35] text-white shadow-[0_8px_20px_rgba(24,76,53,0.16)]"
//                                 : "border-[#D8D1C4] bg-white text-[#174C35] hover:border-[#174C35]"
//                             }
//                           `}
//                         >
//                           Pack of{" "}
//                           {packSize}

//                           <span
//                             className={`ml-2 ${
//                               isSelected
//                                 ? "text-white/80"
//                                 : "text-[#667085]"
//                             }`}
//                           >
//                             ₹
//                             {Number(
//                               config.price
//                             )}
//                           </span>
//                         </button>
//                       );
//                     }
//                   )}

//                 </div>
//               </div>


//               {/* STEP 2 */}

//               <div className="mt-12">

//                 <div className="flex items-end justify-between gap-4">

//                   <div>
//                     <p className="text-[11px] font-bold tracking-[0.2em] text-[#667085] uppercase">
//                       Step 02
//                     </p>

//                     <h2
//                       className="mt-2 text-3xl md:text-4xl text-[#174C35]"
//                       style={{
//                         fontFamily:
//                           "Fraunces, serif",
//                       }}
//                     >
//                       Fill your box
//                     </h2>

//                     <p className="mt-3 text-sm leading-6 text-[#667085]">
//                       Choose a slot and pick
//                       one of your favourite
//                       flavours.
//                     </p>
//                   </div>

//                   <div className="hidden sm:flex shrink-0 items-center gap-2 rounded-full bg-white border border-[#E5DED1] px-4 py-2 text-xs font-semibold text-[#174C35]">
//                     <Check
//                       size={14}
//                     />

//                     {selectedCount}/
//                     {selectedPackSize ||
//                       0}{" "}
//                     selected
//                   </div>

//                 </div>


//                 {/* MOBILE COUNT */}

//                 <div className="mt-5 flex sm:hidden w-fit items-center gap-2 rounded-full bg-white border border-[#E5DED1] px-4 py-2 text-xs font-semibold text-[#174C35]">
//                   <Check
//                     size={14}
//                   />

//                   {selectedCount}/
//                   {selectedPackSize ||
//                     0}{" "}
//                   selected
//                 </div>


//                 {/* SLOT CAPSULES */}

//                 <div className="mt-7 flex flex-wrap gap-2">

//                   {comboSelections.map(
//                     (
//                       productId,
//                       index
//                     ) => {
//                       const selected =
//                         products.find(
//                           (product) =>
//                             product.id ===
//                             productId
//                         );

//                       const isActive =
//                         activeSlot ===
//                         index;

//                       return (
//                         <button
//                           key={index}
//                           type="button"
//                           onClick={() =>
//                             setActiveSlot(
//                               index
//                             )
//                           }
//                           className={`
//                             group
//                             inline-flex
//                             items-center
//                             gap-2
//                             rounded-full
//                             border-2
//                             px-4
//                             py-2.5
//                             text-sm
//                             font-semibold
//                             transition-all
//                             ${
//                               isActive
//                                 ? "border-[#174C35] bg-[#EAF4EB] text-[#174C35]"
//                                 : "border-[#DED6C9] bg-white text-[#667085]"
//                             }
//                           `}
//                         >

//                           <span
//                             className={`
//                               flex
//                               h-7
//                               w-7
//                               items-center
//                               justify-center
//                               rounded-full
//                               text-xs
//                               ${
//                                 selected
//                                   ? "bg-[#174C35] text-white"
//                                   : "bg-[#F1ECE3] text-[#667085]"
//                               }
//                             `}
//                           >
//                             {selected ? (
//                               <Check
//                                 size={13}
//                               />
//                             ) : (
//                               index + 1
//                             )}
//                           </span>

//                           <span>
//                             {selected
//                               ? selected.name
//                               : `Choose flavour`}
//                           </span>

//                           {selected && (
//                             <span
//                               onClick={(
//                                 event
//                               ) => {
//                                 event.stopPropagation();

//                                 removeFlavor(
//                                   index
//                                 );
//                               }}
//                               className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#174C35]/10 text-[#174C35] hover:bg-[#174C35]/20"
//                             >
//                               ×
//                             </span>
//                           )}

//                         </button>
//                       );
//                     }
//                   )}

//                 </div>


//                 {/* FLAVOUR CAPSULES */}

//                 <div className="mt-8">

//                   <div className="flex items-center justify-between mb-4">

//                     <p className="text-sm font-semibold text-[#174C35]">
//                       Choose flavour for Slot{" "}
//                       {activeSlot + 1}
//                     </p>

//                     <span className="text-xs text-[#98A2B3]">
//                       Tap to select
//                     </span>

//                   </div>


//                   <div className="flex flex-wrap gap-3">

//                     {products.map(
//                       (product) => {
//                         const selected =
//                           comboSelections[
//                             activeSlot
//                           ] ===
//                           product.id;

//                         const image =
//                           getProductImage(
//                             product
//                           );

//                         const theme =
//                           CARD_THEMES[
//                             product.cardTheme
//                           ] ||
//                           CARD_THEMES.GREEN;

//                         return (
//                           <button
//                             key={
//                               product.id
//                             }
//                             type="button"
//                             onClick={() =>
//                               handleFlavorSelect(
//                                 product.id
//                               )
//                             }
//                             className={`
//                               group
//                               relative
//                               inline-flex
//                               items-center
//                               gap-3
//                               rounded-full
//                               border-2
//                               bg-white
//                               pl-2
//                               pr-5
//                               py-2
//                               text-left
//                               transition-all
//                               duration-200
//                               ${
//                                 selected
//                                   ? "border-[#174C35] bg-[#EAF4EB] shadow-[0_6px_18px_rgba(24,76,53,0.10)]"
//                                   : "border-[#E3DBCE] hover:border-[#174C35]/50 hover:-translate-y-0.5"
//                               }
//                             `}
//                           >

//                             {/* Product image */}

//                             <span
//                               className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full"
//                               style={{
//                                 background:
//                                   theme.background,
//                               }}
//                             >
//                               {image ? (
//                                 <img
//                                   src={image}
//                                   alt=""
//                                   className="h-full w-full object-contain p-1"
//                                 />
//                               ) : (
//                                 <Sparkles
//                                   size={16}
//                                   style={{
//                                     color:
//                                       theme.accent,
//                                   }}
//                                 />
//                               )}
//                             </span>


//                             {/* Product name */}

//                             <span>
//                               <span className="block text-sm font-semibold text-[#174C35]">
//                                 {
//                                   product.name
//                                 }
//                               </span>

//                               <span className="block text-[11px] text-[#98A2B3]">
//                                 {product.weight ||
//                                   "PopFresh"}
//                               </span>
//                             </span>


//                             {/* Check */}

//                             {selected && (
//                               <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#174C35] text-white">
//                                 <Check
//                                   size={13}
//                                 />
//                               </span>
//                             )}

//                           </button>
//                         );
//                       }
//                     )}

//                   </div>

//                 </div>

//               </div>


//               {/* SUMMARY */}

//               <div
//                 className="
//                   mt-12
//                   rounded-[28px]
//                   border
//                   border-[#E5DED1]
//                   bg-white
//                   p-6
//                   md:p-7
//                   shadow-[0_15px_45px_rgba(24,76,53,0.05)]
//                 "
//               >

//                 <div className="flex items-start justify-between gap-6">

//                   <div>
//                     <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#667085]">
//                       Your combo
//                     </p>

//                     <h3
//                       className="mt-2 text-2xl text-[#174C35]"
//                       style={{
//                         fontFamily:
//                           "Fraunces, serif",
//                       }}
//                     >
//                       Pack of{" "}
//                       {selectedPackSize}
//                     </h3>
//                   </div>


//                   <div className="text-right">
//                     <p className="text-3xl font-bold text-[#184C35]">
//                       ₹
//                       {selectedConfig
//                         ? Number(
//                             selectedConfig.price
//                           )
//                         : 0}
//                     </p>
//                   </div>

//                 </div>


//                 {/* Selected flavour summary */}

//                 <div className="mt-6 flex flex-wrap gap-2">

//                   {selectedProducts.map(
//                     (
//                       product,
//                       index
//                     ) => (
//                       <div
//                         key={index}
//                         className={`
//                           inline-flex
//                           items-center
//                           gap-2
//                           rounded-full
//                           px-3
//                           py-2
//                           text-xs
//                           font-medium
//                           ${
//                             product
//                               ? "bg-[#EAF4EB] text-[#184C35]"
//                               : "bg-[#F5F1E9] text-[#98A2B3]"
//                           }
//                         `}
//                       >

//                         <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold">
//                           {index + 1}
//                         </span>

//                         {product
//                           ? product.name
//                           : "Choose flavour"}

//                       </div>
//                     )
//                   )}

//                 </div>


//                 {/* Progress */}

//                 <div className="mt-6">

//                   <div className="mb-2 flex items-center justify-between text-xs">
//                     <span className="text-[#667085]">
//                       Combo progress
//                     </span>

//                     <span className="font-semibold text-[#174C35]">
//                       {selectedCount}/
//                       {selectedPackSize}
//                     </span>
//                   </div>

//                   <div className="h-2 overflow-hidden rounded-full bg-[#EFE9DD]">
//                     <div
//                       className="h-full rounded-full bg-[#3E8C57] transition-all duration-300"
//                       style={{
//                         width: `${
//                           selectedPackSize
//                             ? (selectedCount /
//                                 selectedPackSize) *
//                               100
//                             : 0
//                         }%`,
//                       }}
//                     />
//                   </div>

//                 </div>


//                 {/* Actions */}

//                 <div className="mt-7 grid gap-3 sm:grid-cols-2">

//                   <button
//                     type="button"
//                     disabled={
//                       actionLoading ||
//                       selectedCount !==
//                         Number(
//                           selectedPackSize
//                         )
//                     }
//                     onClick={
//                       handleAddToCart
//                     }
//                     className="
//                       inline-flex
//                       items-center
//                       justify-center
//                       gap-2
//                       rounded-full
//                       border-2
//                       border-[#174C35]
//                       px-6
//                       py-4
//                       text-sm
//                       font-bold
//                       text-[#174C35]
//                       transition-all
//                       hover:bg-[#EAF4EB]
//                       disabled:cursor-not-allowed
//                       disabled:opacity-40
//                     "
//                   >
//                     <ShoppingCart
//                       size={18}
//                     />

//                     Add to cart
//                   </button>


//                   <button
//                     type="button"
//                     disabled={
//                       actionLoading ||
//                       selectedCount !==
//                         Number(
//                           selectedPackSize
//                         )
//                     }
//                     onClick={
//                       handleBuyNow
//                     }
//                     className="
//                       inline-flex
//                       items-center
//                       justify-center
//                       gap-2
//                       rounded-full
//                       bg-[#174C35]
//                       px-6
//                       py-4
//                       text-sm
//                       font-bold
//                       text-white
//                       shadow-[0_10px_25px_rgba(24,76,53,0.18)]
//                       transition-all
//                       hover:-translate-y-0.5
//                       hover:bg-[#123E2B]
//                       disabled:cursor-not-allowed
//                       disabled:opacity-40
//                     "
//                   >
//                     {actionLoading
//                       ? "Please wait..."
//                       : "Buy this combo"}

//                     {!actionLoading && (
//                       <ArrowRight
//                         size={18}
//                       />
//                     )}
//                   </button>

//                 </div>


//                 {/* Small reassurance */}

//                 <p className="mt-5 text-center text-xs leading-5 text-[#98A2B3]">
//                   Choose {selectedPackSize}{" "}
//                   flavours to complete
//                   your custom PopFresh box.
//                 </p>

//               </div>

//             </div>

//           </section>


         

//           {/* =================================================
//               POPFRESH MARQUEE
//           ================================================= */}

//           <div
//             className="
//               mt-24
//               mb-24
//               relative
//               left-1/2
//               right-1/2
//               -ml-[50vw]
//               -mr-[50vw]
//               w-screen
//             "
//           >
//             <PopFreshMarquee />
//           </div>

//           {/* =================================================
//               CUSTOMERS ALSO BOUGHT
//           ================================================= */}

//           <section className="mt-8">
//             <div className="mb-12 text-center">
//               <span
//                 className="
//                   inline-flex
//                   rounded-full
//                   bg-[#E9E3D8]
//                   px-5
//                   py-2
//                   text-xs
//                   tracking-[0.18em]
//                   font-medium
//                   text-[#174C35]
//                 "
//               >
//                 YOU MAY ALSO LIKE
//               </span>

//               <h2
//                 className="
//                   mt-5
//                   text-[#174C35]
//                   text-4xl
//                   md:text-5xl
//                 "
//                 style={{
//                   fontFamily: "Fraunces, serif",
//                 }}
//               >
//                 Customers Also Bought
//               </h2>

//               <p className="mt-4 text-[#667085]">
//                 Explore more delicious flavours from PopFresh.
//               </p>
//             </div>

//             <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
//               {products.slice(0, 3).map((item) => {
//                 const image = getProductImage(item);
//                 const theme =
//                   CARD_THEMES[item.cardTheme] ||
//                   CARD_THEMES.GREEN;

//                 const sellingPrice = Number(
//                   item.discountPrice ?? item.price ?? 0
//                 );
//                 const mrp = Number(item.price ?? 0);

//                 return (
//                   <Link
//                     key={item.id}
//                     to={`/products/${item.slug}`}
//                     className="
//                       group
//                       flex
//                       flex-col
//                       overflow-hidden
//                       rounded-[32px]
//                       transition-all
//                       duration-300
//                       hover:-translate-y-2
//                       hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
//                     "
//                     style={{
//                       background: theme.background,
//                     }}
//                   >
//                     {/* Badge */}
//                     <div className="p-6 pb-0">
//                       <span
//                         className="
//                           inline-flex
//                           rounded-full
//                           px-4
//                           py-2
//                           text-white
//                           text-[11px]
//                           tracking-[0.15em]
//                           font-medium
//                         "
//                         style={{
//                           background: theme.accent,
//                         }}
//                       >
//                         {item.badge || "POPFRESH"}
//                       </span>
//                     </div>

//                     {/* Image */}
//                     <div className="px-6 pt-6">
//                       <div className="overflow-hidden rounded-[24px] bg-white/40">
//                         <ProductImageSlider
//                           images={
//                             Array.isArray(item.images)
//                               ? item.images
//                                   .map((img) =>
//                                     typeof img === "string"
//                                       ? img
//                                       : img?.imageUrl || img?.url
//                                   )
//                                   .filter(Boolean)
//                               : []
//                           }
//                           title={item.name}
//                         />
//                       </div>
//                     </div>

//                     {/* Content */}
//                     <div className="flex flex-col flex-1 p-6">
//                       <h3
//                         className="text-[#174C35] text-2xl leading-tight"
//                         style={{
//                           fontFamily: "Fraunces, serif",
//                         }}
//                       >
//                         {item.name}
//                       </h3>

//                       <p className="mt-4 text-[#667085] leading-7 flex-1">
//                         {item.description}
//                       </p>

//                       <div className="flex flex-wrap gap-2 mt-5">
//                         {(Array.isArray(item.highlights)
//                           ? item.highlights
//                           : []
//                         )
//                           .slice(0, 3)
//                           .map((tag) => (
//                             <span
//                               key={tag}
//                               className="
//                                 rounded-full
//                                 bg-white
//                                 px-3
//                                 py-1
//                                 text-sm
//                                 text-[#174C35]
//                               "
//                             >
//                               {tag}
//                             </span>
//                           ))}
//                       </div>

//                       <div className="mt-6 flex items-center gap-3">
//                         <span
//                           className="text-3xl font-bold"
//                           style={{
//                             color: theme.text,
//                           }}
//                         >
//                           ₹{sellingPrice}
//                         </span>

//                         {mrp > sellingPrice && (
//                           <span className="text-lg line-through text-gray-400">
//                             ₹{mrp}
//                           </span>
//                         )}
//                       </div>

//                       <button
//                         type="button"
//                         className="
//                           mt-7
//                           w-full
//                           rounded-full
//                           py-4
//                           text-white
//                           font-semibold
//                           transition-all
//                           duration-300
//                           group-hover:shadow-lg
//                         "
//                         style={{
//                           background: theme.accent,
//                         }}
//                       >
//                         View Product
//                       </button>
//                     </div>
//                   </Link>
//                 );
//               })}
//             </div>
//           </section>

//           {/* =================================================
//               AVAILABLE ON AMAZON / FLIPKART
//           ================================================= */}

//           {marketplaceProduct && (
//             <div className="mt-24">
//               <MarketplaceCTA
//                 amazon={marketplaceProduct.amazon}
//                 flipkart={marketplaceProduct.flipkart}
//               />
//             </div>
//           )}

//           {/* =================================================
//               CUSTOMER REVIEWS
//           ================================================= */}

//           <section
//             className="
//               mt-28
//               relative
//               left-1/2
//               right-1/2
//               -ml-[50vw]
//               -mr-[50vw]
//               w-screen
//               overflow-hidden
//             "
//           >
//             <div className="text-center mb-12">
//               <span
//                 className="
//                   inline-flex
//                   rounded-full
//                   bg-[#E9E3D8]
//                   px-5
//                   py-2
//                   text-xs
//                   tracking-[0.18em]
//                   font-medium
//                   text-[#174C35]
//                 "
//               >
//                 CUSTOMER LOVE
//               </span>

//               <h2
//                 className="
//                   mt-5
//                   text-[#174C35]
//                   text-4xl
//                   md:text-5xl
//                 "
//                 style={{
//                   fontFamily: "Fraunces, serif",
//                 }}
//               >
//                 Loved By Snackers
//               </h2>

//               <p className="mt-4 text-[#667085]">
//                 Thousands of happy crunches across India.
//               </p>
//             </div>

//             <div
//               className="
//                 flex
//                 gap-6
//                 animate-[marquee_30s_linear_infinite]
//                 w-max
//                 px-6
//               "
//             >
//               {[...reviews, ...reviews].map((review, index) => (
//                 <div
//                   key={`${review.name}-${index}`}
//                   className="
//                     w-[280px]
//                     md:w-[330px]
//                     rounded-[30px]
//                     bg-white
//                     p-8
//                     border
//                     border-[#ECE7DB]
//                     shadow-sm
//                     transition-all
//                     duration-300
//                     hover:-translate-y-2
//                     hover:shadow-xl
//                   "
//                 >
//                   <div className="flex gap-1 text-[#E4C06A] mb-5">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         size={18}
//                         fill="currentColor"
//                       />
//                     ))}
//                   </div>

//                   <p
//                     className="
//                       text-[#174C35]
//                       text-lg
//                       leading-8
//                     "
//                   >
//                     "{review.text}"
//                   </p>

//                   <div className="mt-8">
//                     <h4 className="font-semibold text-[#174C35]">
//                       {review.name}
//                     </h4>

//                     <span className="text-[#667085] text-sm">
//                       {review.city}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }




// import {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   useNavigate,
// } from "react-router-dom";

// import {
//   ArrowRight,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   ShoppingCart,
//   Sparkles,
// } from "lucide-react";

// import { toast } from "react-toastify";

// import {
//   getProducts,
//   getComboConfigs,
// } from "../api/product.api";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// import { useCart } from "../context/CartContext";

// /* =====================================================
//    CARD THEMES
// ===================================================== */

// const CARD_THEMES = {
//   GREEN: {
//     background: "#EAF4EB",
//     accent: "#3E8C57",
//     text: "#184C35",
//   },

//   ORANGE: {
//     background: "#F8E6DF",
//     accent: "#E86A30",
//     text: "#184C35",
//   },

//   RED: {
//     background: "#FBE6E2",
//     accent: "#D94E43",
//     text: "#184C35",
//   },

//   PURPLE: {
//     background: "#F3ECFD",
//     accent: "#7C3AED",
//     text: "#184C35",
//   },

//   CREAM: {
//     background: "#FBF3DE",
//     accent: "#D7A326",
//     text: "#184C35",
//   },
// };

// /* =====================================================
//    CONSTANTS
// ===================================================== */

// const VALID_PACK_SIZES = [2, 3, 4];

// /* =====================================================
//    HELPERS
// ===================================================== */

// /**
//  * Returns the first available image for a product.
//  */
// const getProductImage = (product) => {
//   if (!product) {
//     return null;
//   }

//   if (
//     Array.isArray(product.images) &&
//     product.images.length > 0
//   ) {
//     const first = product.images[0];

//     if (typeof first === "string") {
//       return first;
//     }

//     return (
//       first?.imageUrl ||
//       first?.url ||
//       null
//     );
//   }

//   if (product.imageUrl) {
//     return product.imageUrl;
//   }

//   if (product.image) {
//     return product.image;
//   }

//   return null;
// };

// /**
//  * Returns all product images for the gallery.
//  */
// const getProductImages = (product) => {
//   if (!product) {
//     return [];
//   }

//   if (Array.isArray(product.images)) {
//     return product.images
//       .map((image) => {
//         if (typeof image === "string") {
//           return image;
//         }

//         return (
//           image?.imageUrl ||
//           image?.url ||
//           null
//         );
//       })
//       .filter(Boolean);
//   }

//   const singleImage =
//     getProductImage(product);

//   return singleImage
//     ? [singleImage]
//     : [];
// };

// /* =====================================================
//    COMPONENT
// ===================================================== */

// export default function BuildYourCombo() {
//   const navigate = useNavigate();

//   const {
//     addComboToCart,
//     buyComboNow,
//   } = useCart();

//   /* ===================================================
//      DATA
//   =================================================== */

//   const [products, setProducts] =
//     useState([]);

//   const [comboConfigs, setComboConfigs] =
//     useState([]);

//   /* ===================================================
//      LOADING
//   =================================================== */

//   const [loading, setLoading] =
//     useState(true);

//   const [actionLoading, setActionLoading] =
//     useState(false);

//   /* ===================================================
//      PACK
//   =================================================== */

//   const [selectedPackSize, setSelectedPackSize] =
//     useState(null);

//   /* ===================================================
//      SELECTIONS

//      Example:

//      Pack 2

//      [
//        productId,
//        productId
//      ]

//      Same product can be selected
//      multiple times.
//   =================================================== */

//   const [comboSelections, setComboSelections] =
//     useState([]);

//   /* ===================================================
//      ACTIVE SLOT
//   =================================================== */

//   const [activeSlot, setActiveSlot] =
//     useState(0);

//   /* ===================================================
//      GALLERY
//   =================================================== */

//   const [galleryIndex, setGalleryIndex] =
//     useState(0);

//   /* ===================================================
//      FETCH DATA
//   =================================================== */

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true);

//         const [
//           productsData,
//           configsData,
//         ] = await Promise.all([
//           getProducts(),
//           getComboConfigs(),
//         ]);

//         /* -----------------------------------------------
//            AVAILABLE PRODUCTS

//            Only active products with stock should
//            be available for combo selection.
//         ----------------------------------------------- */

//         const availableProducts =
//           Array.isArray(productsData)
//             ? productsData.filter(
//                 (product) =>
//                   product?.isActive !== false &&
//                   Number(product?.stock ?? 0) > 0
//               )
//             : [];

//         /* -----------------------------------------------
//            AVAILABLE COMBO CONFIGURATIONS

//            IMPORTANT:
//            Customer should only see combos that are
//            configured AND active from the admin panel.
//         ----------------------------------------------- */

//         const configs =
//           Array.isArray(configsData)
//             ? configsData
//                 .filter(
//                   (config) =>
//                     VALID_PACK_SIZES.includes(
//                       Number(config.packSize)
//                     ) &&
//                     config.isActive === true
//                 )
//                 .sort(
//                   (a, b) =>
//                     Number(a.packSize) -
//                     Number(b.packSize)
//                 )
//             : [];

//         setProducts(
//           availableProducts
//         );

//         setComboConfigs(configs);

//         /* -----------------------------------------------
//            DEFAULT PACK

//            Automatically select the smallest active
//            combo pack.
//         ----------------------------------------------- */

//         if (configs.length > 0) {
//           const firstPack =
//             Number(
//               configs[0].packSize
//             );

//           setSelectedPackSize(
//             firstPack
//           );

//           setComboSelections(
//             Array(firstPack).fill(null)
//           );

//           setActiveSlot(0);
//         }
//       } catch (error) {
//         console.error(
//           "Failed to load combo builder:",
//           error
//         );

//         toast.error(
//           "Unable to load the combo builder."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   /* ===================================================
//      SELECTED CONFIG
//   =================================================== */

//   const selectedConfig = useMemo(() => {
//     if (!selectedPackSize) {
//       return null;
//     }

//     return (
//       comboConfigs.find(
//         (config) =>
//           Number(config.packSize) ===
//           Number(selectedPackSize)
//       ) || null
//     );
//   }, [
//     comboConfigs,
//     selectedPackSize,
//   ]);

//   /* ===================================================
//      SELECTED PRODUCTS
//   =================================================== */

//   const selectedProducts = useMemo(() => {
//     return comboSelections.map(
//       (productId) => {
//         if (!productId) {
//           return null;
//         }

//         return (
//           products.find(
//             (product) =>
//               product.id === productId
//           ) || null
//         );
//       }
//     );
//   }, [
//     comboSelections,
//     products,
//   ]);

//   /* ===================================================
//      SELECTED COUNT
//   =================================================== */

//   const selectedCount = useMemo(() => {
//     return comboSelections.filter(
//       Boolean
//     ).length;
//   }, [comboSelections]);

//   /* ===================================================
//      ACTIVE PRODUCT

//      The currently selected slot's product is
//      displayed in the large preview.
//   =================================================== */

//   const activeProduct =
//     selectedProducts[activeSlot] ||
//     selectedProducts.find(Boolean) ||
//     products[0] ||
//     null;

//   /* ===================================================
//      GALLERY IMAGES
//   =================================================== */

//   const galleryImages = useMemo(() => {
//     if (!activeProduct) {
//       return [];
//     }

//     return getProductImages(
//       activeProduct
//     );
//   }, [activeProduct]);

//   /* ===================================================
//      RESET GALLERY WHEN PRODUCT CHANGES
//   =================================================== */

//   useEffect(() => {
//     setGalleryIndex(0);
//   }, [activeProduct?.id]);

//   /* ===================================================
//      SELECTED SELLING PRICE

//      If discountedPrice exists, customer pays that.

//      Otherwise customer pays normal price.
//   =================================================== */

//   const comboSellingPrice = useMemo(() => {
//     if (!selectedConfig) {
//       return 0;
//     }

//     const discountedPrice =
//       Number(
//         selectedConfig.discountPrice
//       );

//     const normalPrice =
//       Number(
//         selectedConfig.price
//       );

//     if (
//       Number.isFinite(discountedPrice) &&
//       discountedPrice > 0
//     ) {
//       return discountedPrice;
//     }

//     return Number.isFinite(normalPrice)
//       ? normalPrice
//       : 0;
//   }, [selectedConfig]);

//   /* ===================================================
//      CHANGE PACK
//   =================================================== */

//   const handlePackChange = (
//     packSize
//   ) => {
//     const normalizedPackSize =
//       Number(packSize);

//     setSelectedPackSize(
//       normalizedPackSize
//     );

//     /*
//       Reset all flavour selections whenever
//       the pack size changes.

//       Example:

//       Pack 2 -> Pack 4

//       Old selections should not carry over.
//     */

//     setComboSelections(
//       Array(normalizedPackSize).fill(null)
//     );

//     setActiveSlot(0);

//     setGalleryIndex(0);
//   };

//   /* ===================================================
//      SELECT FLAVOUR
//   =================================================== */

//   const handleFlavorSelect = (
//     productId
//   ) => {
//     if (!selectedPackSize) {
//       return;
//     }

//     const updated = [
//       ...comboSelections,
//     ];

//     /*
//       Same flavour can intentionally be selected
//       multiple times.

//       Example:

//       Pack of 4

//       Pudina
//       Pudina
//       Cheese
//       Peri Peri
//     */

//     updated[activeSlot] =
//       productId;

//     setComboSelections(
//       updated
//     );

//     /*
//       Automatically move to the next empty slot.
//     */

//     const nextEmpty =
//       updated.findIndex(
//         (value, index) =>
//           !value &&
//           index > activeSlot
//       );

//     if (nextEmpty !== -1) {
//       setActiveSlot(nextEmpty);
//       return;
//     }

//     /*
//       If there is no empty slot after the current
//       slot, find the first empty slot.
//     */

//     const firstEmpty =
//       updated.findIndex(
//         (value) => !value
//       );

//     if (firstEmpty !== -1) {
//       setActiveSlot(firstEmpty);
//     }
//   };

//   /* ===================================================
//      REMOVE FLAVOUR FROM SLOT
//   =================================================== */

//   const removeFlavor = (
//     index
//   ) => {
//     const updated = [
//       ...comboSelections,
//     ];

//     updated[index] = null;

//     setComboSelections(
//       updated
//     );

//     setActiveSlot(index);
//   };

//   /* ===================================================
//      VALIDATE COMBO
//   =================================================== */

//   const validateCombo = () => {
//     if (!selectedConfig) {
//       toast.error(
//         "Please select a combo pack."
//       );

//       return false;
//     }

//     if (
//       comboSelections.length !==
//       Number(
//         selectedConfig.packSize
//       )
//     ) {
//       toast.error(
//         "Please complete your combo."
//       );

//       return false;
//     }

//     const hasEmptySlot =
//       comboSelections.some(
//         (value) => !value
//       );

//     if (hasEmptySlot) {
//       toast.error(
//         `Please select all ${selectedConfig.packSize} flavours.`
//       );

//       return false;
//     }

//     if (
//       comboSellingPrice <= 0 ||
//       !Number.isFinite(comboSellingPrice)
//     ) {
//       toast.error(
//         "Combo price is unavailable."
//       );

//       return false;
//     }

//     return true;
//   };

//   /* ===================================================
//      BUILD BACKEND SELECTIONS
//   =================================================== */

//   const buildSelections = () => {
//     return comboSelections.map(
//       (productId) => {
//         const product =
//           products.find(
//             (item) =>
//               item.id === productId
//           );

//         return {
//           productId,

//           /*
//             Every selected slot represents
//             one product inside the combo.
//           */

//           quantity: 1,

//           /*
//             Presentation-only fields.

//             Backend pricing only needs:
//               productId
//               quantity
//           */

//           name:
//             product?.name ??
//             product?.title ??
//             "",

//           image:
//             getProductImage(
//               product
//             ),
//         };
//       }
//     );
//   };

//   /* ===================================================
//      ADD TO CART
//   =================================================== */

//   const handleAddToCart = () => {
//     if (!validateCombo()) {
//       return;
//     }

//     if (!selectedConfig) {
//       return;
//     }

//     const selections =
//       buildSelections();

//     try {
//       setActionLoading(true);

//       const result =
//         addComboToCart(
//           Number(
//             selectedConfig.packSize
//           ),

//           selections,

//           comboSellingPrice
//         );

//       if (result !== false) {
//         toast.success(
//           "Your combo has been added to cart!"
//         );
//       }
//     } catch (error) {
//       console.error(
//         "Add combo error:",
//         error
//       );

//       toast.error(
//         "Unable to add combo to cart."
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   /* ===================================================
//      BUY NOW
//   =================================================== */

//   const handleBuyNow = () => {
//     if (!validateCombo()) {
//       return;
//     }

//     if (!selectedConfig) {
//       return;
//     }

//     const selections =
//       buildSelections();

//     try {
//       setActionLoading(true);

//       buyComboNow(
//         Number(
//           selectedConfig.packSize
//         ),

//         selections,

//         comboSellingPrice
//       );
//     } catch (error) {
//       console.error(
//         "Buy combo error:",
//         error
//       );

//       toast.error(
//         "Unable to continue with your combo."
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   /* ===================================================
//      GALLERY NEXT
//   =================================================== */

//   const nextImage = () => {
//     if (
//       galleryImages.length <= 1
//     ) {
//       return;
//     }

//     setGalleryIndex(
//       (current) =>
//         (current + 1) %
//         galleryImages.length
//     );
//   };

//   /* ===================================================
//      GALLERY PREVIOUS
//   =================================================== */

//   const previousImage = () => {
//     if (
//       galleryImages.length <= 1
//     ) {
//       return;
//     }

//     setGalleryIndex(
//       (current) =>
//         current === 0
//           ? galleryImages.length - 1
//           : current - 1
//     );
//   };

//   /* ===================================================
//      LOADING
//   =================================================== */

//   if (loading) {
//     return (
//       <>
//         <Navbar alwaysCapsule />

//         <main className="flex min-h-screen items-center justify-center bg-[#F6F3EC]">
//           <div className="flex flex-col items-center">

//             <div className="flex gap-3">
//               <span className="h-4 w-4 animate-bounce rounded-full bg-[#184C35]" />

//               <span
//                 className="h-4 w-4 animate-bounce rounded-full bg-[#3E8C57]"
//                 style={{
//                   animationDelay:
//                     "150ms",
//                 }}
//               />

//               <span
//                 className="h-4 w-4 animate-bounce rounded-full bg-[#D7A326]"
//                 style={{
//                   animationDelay:
//                     "300ms",
//                 }}
//               />
//             </div>

//             <p className="mt-8 text-sm uppercase tracking-[0.2em] text-[#184C35]">
//               Preparing your combo...
//             </p>

//           </div>
//         </main>

//         <Footer />
//       </>
//     );
//   }

//   /* ===================================================
//      NO ACTIVE CONFIGURATION
//   =================================================== */

//   if (
//     !loading &&
//     comboConfigs.length === 0
//   ) {
//     return (
//       <>
//         <Navbar alwaysCapsule />

//         <main className="flex min-h-screen items-center justify-center bg-[#F6F3EC] px-5 pt-32">

//           <div className="max-w-lg text-center">

//             <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#E8E1D5] bg-white">
//               <Sparkles
//                 size={26}
//                 className="text-[#184C35]"
//               />
//             </div>

//             <h1
//               className="text-4xl text-[#174C35] md:text-5xl"
//               style={{
//                 fontFamily:
//                   "Fraunces, serif",
//               }}
//             >
//               Combos coming soon.
//             </h1>

//             <p className="mt-5 leading-7 text-[#667085]">
//               Our custom combo builder is
//               currently unavailable.
//             </p>

//             <button
//               type="button"
//               onClick={() =>
//                 navigate("/products")
//               }
//               className="
//                 mt-8
//                 rounded-full
//                 bg-[#174C35]
//                 px-7
//                 py-3.5
//                 font-semibold
//                 text-white
//                 transition
//                 hover:bg-[#123E2B]
//               "
//             >
//               Explore Products
//             </button>

//           </div>

//         </main>

//         <Footer />
//       </>
//     );
//   }

//   /* ===================================================
//      CURRENT MAIN IMAGE
//   =================================================== */

//   const currentImage =
//     galleryImages[
//       galleryIndex
//     ] ||
//     getProductImage(
//       activeProduct
//     );

//   /* ===================================================
//      RENDER
//   =================================================== */

//   return (
//     <>
//       <Navbar alwaysCapsule />

//       <main className="min-h-screen bg-[#F6F3EC] pb-24 pt-32 md:pt-36">

//         <div className="mx-auto max-w-7xl px-5 lg:px-8">

//           {/* =================================================
//               INTRO
//           ================================================= */}

//           <section className="max-w-4xl">

//             <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF4EB] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#184C35]">
//               <Sparkles size={14} />
//               Build Your Own
//             </div>

//             <h1
//               className="
//                 mt-6
//                 max-w-4xl
//                 text-[46px]
//                 leading-[1.05]
//                 text-[#174C35]
//                 sm:text-[58px]
//                 md:text-[68px]
//                 lg:text-[76px]
//               "
//               style={{
//                 fontFamily:
//                   "Fraunces, serif",
//               }}
//             >
//               Your flavours.
//               <br />

//               <span className="italic">
//                 Your perfect combo.
//               </span>
//             </h1>

//             <p className="mt-6 max-w-2xl text-base leading-8 text-[#667085] md:text-lg">
//               Pick your pack size, choose
//               your favourite PopFresh
//               flavours and create a box
//               made exactly for you.
//             </p>

//           </section>

//           {/* =================================================
//               MAIN BUILDER
//           ================================================= */}

//           <section
//             className="
//               mt-12
//               grid
//               items-start
//               gap-10
//               lg:mt-16
//               lg:grid-cols-[0.95fr_1.05fr]
//               xl:gap-16
//             "
//           >

//             {/* ===============================================
//                 LEFT — VISUAL
//             =============================================== */}

//             <div className="lg:sticky lg:top-28">

//               <div
//                 className="
//                   relative
//                   overflow-hidden
//                   rounded-[34px]
//                   border
//                   border-[#E8E1D5]
//                   bg-white
//                   shadow-[0_20px_60px_rgba(24,76,53,0.07)]
//                 "
//               >

//                 {/* Top label */}

//                 <div className="absolute left-6 top-6 z-10">
//                   <span className="inline-flex rounded-full bg-[#174C35] px-5 py-2.5 text-[10px] font-bold tracking-[0.18em] text-white">
//                     POPFRESH
//                   </span>
//                 </div>

//                 {/* Main image */}

//                 <div
//                   className="
//                     relative
//                     flex
//                     h-[420px]
//                     items-center
//                     justify-center
//                     overflow-hidden
//                     bg-[#FBF3DE]
//                     p-8
//                     sm:h-[500px]
//                     sm:p-12
//                     md:h-[560px]
//                   "
//                 >

//                   {currentImage ? (
//                     <img
//                       src={currentImage}
//                       alt={
//                         activeProduct?.name ||
//                         "PopFresh flavour"
//                       }
//                       className="
//                         max-h-full
//                         max-w-full
//                         object-contain
//                         transition-all
//                         duration-500
//                         hover:scale-[1.025]
//                       "
//                     />
//                   ) : (
//                     <div className="flex flex-col items-center justify-center text-center">

//                       <Sparkles
//                         size={42}
//                         className="text-[#3E8C57]"
//                       />

//                       <p className="mt-4 text-sm text-[#667085]">
//                         Choose a flavour to
//                         preview it
//                       </p>

//                     </div>
//                   )}

//                   {/* Previous */}

//                   {galleryImages.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={
//                         previousImage
//                       }
//                       aria-label="Previous image"
//                       className="
//                         absolute
//                         left-4
//                         top-1/2
//                         flex
//                         h-11
//                         w-11
//                         -translate-y-1/2
//                         items-center
//                         justify-center
//                         rounded-full
//                         bg-white/90
//                         text-[#174C35]
//                         shadow-md
//                         backdrop-blur
//                         transition
//                         hover:scale-105
//                       "
//                     >
//                       <ChevronLeft
//                         size={20}
//                       />
//                     </button>
//                   )}

//                   {/* Next */}

//                   {galleryImages.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={
//                         nextImage
//                       }
//                       aria-label="Next image"
//                       className="
//                         absolute
//                         right-4
//                         top-1/2
//                         flex
//                         h-11
//                         w-11
//                         -translate-y-1/2
//                         items-center
//                         justify-center
//                         rounded-full
//                         bg-white/90
//                         text-[#174C35]
//                         shadow-md
//                         backdrop-blur
//                         transition
//                         hover:scale-105
//                       "
//                     >
//                       <ChevronRight
//                         size={20}
//                       />
//                     </button>
//                   )}

//                 </div>

//                 {/* Gallery thumbnails */}

//                 {galleryImages.length > 0 && (
//                   <div className="border-t border-[#ECE7DB] bg-white px-5 py-5">

//                     <div className="flex gap-3 overflow-x-auto pb-1">

//                       {galleryImages.map(
//                         (
//                           image,
//                           index
//                         ) => (
//                           <button
//                             key={`${image}-${index}`}
//                             type="button"
//                             onClick={() =>
//                               setGalleryIndex(
//                                 index
//                               )
//                             }
//                             className={`
//                               flex
//                               h-16
//                               w-16
//                               shrink-0
//                               items-center
//                               justify-center
//                               overflow-hidden
//                               rounded-2xl
//                               border-2
//                               bg-[#FBF3DE]
//                               transition-all
//                               ${
//                                 galleryIndex ===
//                                 index
//                                   ? "border-[#174C35] shadow-sm"
//                                   : "border-transparent hover:border-[#174C35]/30"
//                               }
//                             `}
//                           >
//                             <img
//                               src={image}
//                               alt=""
//                               className="h-full w-full object-contain"
//                             />
//                           </button>
//                         )
//                       )}

//                     </div>

//                   </div>
//                 )}

//               </div>

//               {/* Selected flavour strip */}

//               <div className="mt-5 flex flex-wrap gap-2">

//                 {selectedProducts.map(
//                   (
//                     selected,
//                     index
//                   ) => (
//                     <button
//                       key={index}
//                       type="button"
//                       onClick={() => {
//                         setActiveSlot(
//                           index
//                         );

//                         if (selected) {
//                           setGalleryIndex(
//                             0
//                           );
//                         }
//                       }}
//                       className={`
//                         inline-flex
//                         items-center
//                         gap-2
//                         rounded-full
//                         border
//                         px-4
//                         py-2
//                         text-xs
//                         font-semibold
//                         transition
//                         ${
//                           activeSlot ===
//                           index
//                             ? "border-[#174C35] bg-[#EAF4EB] text-[#174C35]"
//                             : "border-[#E1D9CB] bg-white text-[#667085]"
//                         }
//                       `}
//                     >

//                       <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F3EFE6] text-[10px]">
//                         {index + 1}
//                       </span>

//                       {selected
//                         ? selected.name
//                         : "Choose flavour"}

//                     </button>
//                   )
//                 )}

//               </div>

//             </div>

//             {/* ===============================================
//                 RIGHT — BUILDER
//             =============================================== */}

//             <div>

//               {/* =================================================
//                   STEP 1
//               ================================================= */}

//               <div>

//                 <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#667085]">
//                   Step 01
//                 </p>

//                 <h2
//                   className="mt-2 text-3xl text-[#174C35] md:text-4xl"
//                   style={{
//                     fontFamily:
//                       "Fraunces, serif",
//                   }}
//                 >
//                   Choose your pack
//                 </h2>

//                 <div className="mt-6 flex flex-wrap gap-3">

//                   {comboConfigs.map(
//                     (config) => {
//                       const packSize =
//                         Number(
//                           config.packSize
//                         );

//                       const isSelected =
//                         Number(
//                           selectedPackSize
//                         ) === packSize;

//                       const normalPrice =
//                         Number(
//                           config.price
//                         );

//                       const discountPrice =
//                         Number(
//                           config.discountPrice
//                         );

//                       const hasDiscount =
//                         Number.isFinite(
//                           discountPrice
//                         ) &&
//                         discountPrice > 0 &&
//                         discountPrice <
//                           normalPrice;

//                       const sellingPrice =
//                         hasDiscount
//                           ? discountPrice
//                           : normalPrice;

//                       return (
//                         <button
//                           key={config.id}
//                           type="button"
//                           onClick={() =>
//                             handlePackChange(
//                               packSize
//                             )
//                           }
//                           className={`
//                             rounded-full
//                             border-2
//                             px-5
//                             py-3
//                             text-sm
//                             font-semibold
//                             transition-all
//                             duration-200
//                             ${
//                               isSelected
//                                 ? "border-[#174C35] bg-[#174C35] text-white shadow-[0_8px_20px_rgba(24,76,53,0.16)]"
//                                 : "border-[#D8D1C4] bg-white text-[#174C35] hover:border-[#174C35]"
//                             }
//                           `}
//                         >

//                           Pack of{" "}
//                           {packSize}

//                           <span
//                             className={`
//                               ml-2
//                               ${
//                                 isSelected
//                                   ? "text-white/80"
//                                   : "text-[#667085]"
//                               }
//                             `}
//                           >
//                             ₹
//                             {sellingPrice.toLocaleString(
//                               "en-IN"
//                             )}
//                           </span>

//                           {hasDiscount && (
//                             <span
//                               className={`
//                                 ml-1
//                                 text-xs
//                                 line-through
//                                 ${
//                                   isSelected
//                                     ? "text-white/50"
//                                     : "text-[#98A2B3]"
//                                 }
//                               `}
//                             >
//                               ₹
//                               {normalPrice.toLocaleString(
//                                 "en-IN"
//                               )}
//                             </span>
//                           )}

//                         </button>
//                       );
//                     }
//                   )}

//                 </div>

//               </div>

//               {/* =================================================
//                   STEP 2
//               ================================================= */}

//               <div className="mt-12">

//                 <div className="flex items-end justify-between gap-4">

//                   <div>

//                     <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#667085]">
//                       Step 02
//                     </p>

//                     <h2
//                       className="mt-2 text-3xl text-[#174C35] md:text-4xl"
//                       style={{
//                         fontFamily:
//                           "Fraunces, serif",
//                       }}
//                     >
//                       Fill your box
//                     </h2>

//                     <p className="mt-3 text-sm leading-6 text-[#667085]">
//                       Choose a slot and pick
//                       one of your favourite
//                       flavours.
//                     </p>

//                   </div>

//                   {/* Desktop count */}

//                   <div className="hidden shrink-0 items-center gap-2 rounded-full border border-[#E5DED1] bg-white px-4 py-2 text-xs font-semibold text-[#174C35] sm:flex">

//                     <Check
//                       size={14}
//                     />

//                     {selectedCount}/
//                     {selectedPackSize ||
//                       0}{" "}
//                     selected

//                   </div>

//                 </div>

//                 {/* Mobile count */}

//                 <div className="mt-5 flex w-fit items-center gap-2 rounded-full border border-[#E5DED1] bg-white px-4 py-2 text-xs font-semibold text-[#174C35] sm:hidden">

//                   <Check
//                     size={14}
//                   />

//                   {selectedCount}/
//                   {selectedPackSize ||
//                     0}{" "}
//                   selected

//                 </div>

//                 {/* =================================================
//                     SLOT CAPSULES
//                 ================================================= */}

//                 <div className="mt-7 flex flex-wrap gap-2">

//                   {comboSelections.map(
//                     (
//                       productId,
//                       index
//                     ) => {
//                       const selected =
//                         products.find(
//                           (product) =>
//                             product.id ===
//                             productId
//                         );

//                       const isActive =
//                         activeSlot ===
//                         index;

//                       return (
//                         <button
//                           key={index}
//                           type="button"
//                           onClick={() =>
//                             setActiveSlot(
//                               index
//                             )
//                           }
//                           className={`
//                             group
//                             inline-flex
//                             items-center
//                             gap-2
//                             rounded-full
//                             border-2
//                             px-4
//                             py-2.5
//                             text-sm
//                             font-semibold
//                             transition-all
//                             ${
//                               isActive
//                                 ? "border-[#174C35] bg-[#EAF4EB] text-[#174C35]"
//                                 : "border-[#DED6C9] bg-white text-[#667085]"
//                             }
//                           `}
//                         >

//                           <span
//                             className={`
//                               flex
//                               h-7
//                               w-7
//                               items-center
//                               justify-center
//                               rounded-full
//                               text-xs
//                               ${
//                                 selected
//                                   ? "bg-[#174C35] text-white"
//                                   : "bg-[#F1ECE3] text-[#667085]"
//                               }
//                             `}
//                           >
//                             {selected ? (
//                               <Check
//                                 size={13}
//                               />
//                             ) : (
//                               index + 1
//                             )}
//                           </span>

//                           <span>
//                             {selected
//                               ? selected.name
//                               : "Choose flavour"}
//                           </span>

//                           {selected && (
//                             <span
//                               role="button"
//                               tabIndex={0}
//                               onClick={(
//                                 event
//                               ) => {
//                                 event.stopPropagation();

//                                 removeFlavor(
//                                   index
//                                 );
//                               }}
//                               onKeyDown={(
//                                 event
//                               ) => {
//                                 if (
//                                   event.key ===
//                                   "Enter"
//                                 ) {
//                                   event.stopPropagation();

//                                   removeFlavor(
//                                     index
//                                   );
//                                 }
//                               }}
//                               className="
//                                 ml-1
//                                 flex
//                                 h-5
//                                 w-5
//                                 items-center
//                                 justify-center
//                                 rounded-full
//                                 bg-[#174C35]/10
//                                 text-[#174C35]
//                                 hover:bg-[#174C35]/20
//                               "
//                             >
//                               ×
//                             </span>
//                           )}

//                         </button>
//                       );
//                     }
//                   )}

//                 </div>

//                 {/* =================================================
//                     FLAVOUR OPTIONS

//                     This is the main flavour selector.
//                     The old separate "Pick your favourites"
//                     section has intentionally been removed.
//                 ================================================= */}

//                 <div className="mt-8">

//                   <div className="mb-4 flex items-center justify-between">

//                     <p className="text-sm font-semibold text-[#174C35]">
//                       Choose flavour for Slot{" "}
//                       {activeSlot + 1}
//                     </p>

//                     <span className="text-xs text-[#98A2B3]">
//                       Tap to select
//                     </span>

//                   </div>

//                   <div className="flex flex-wrap gap-3">

//                     {products.map(
//                       (product) => {
//                         const selected =
//                           comboSelections[
//                             activeSlot
//                           ] ===
//                           product.id;

//                         const image =
//                           getProductImage(
//                             product
//                           );

//                         const theme =
//                           CARD_THEMES[
//                             product.cardTheme
//                           ] ||
//                           CARD_THEMES.GREEN;

//                         return (
//                           <button
//                             key={
//                               product.id
//                             }
//                             type="button"
//                             onClick={() =>
//                               handleFlavorSelect(
//                                 product.id
//                               )
//                             }
//                             className={`
//                               group
//                               relative
//                               inline-flex
//                               items-center
//                               gap-3
//                               rounded-full
//                               border-2
//                               bg-white
//                               py-2
//                               pl-2
//                               pr-5
//                               text-left
//                               transition-all
//                               duration-200
//                               ${
//                                 selected
//                                   ? "border-[#174C35] bg-[#EAF4EB] shadow-[0_6px_18px_rgba(24,76,53,0.10)]"
//                                   : "border-[#E3DBCE] hover:-translate-y-0.5 hover:border-[#174C35]/50"
//                               }
//                             `}
//                           >

//                             {/* Product image */}

//                             <span
//                               className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full"
//                               style={{
//                                 background:
//                                   theme.background,
//                               }}
//                             >
//                               {image ? (
//                                 <img
//                                   src={
//                                     image
//                                   }
//                                   alt=""
//                                   className="h-full w-full object-contain p-1"
//                                 />
//                               ) : (
//                                 <Sparkles
//                                   size={
//                                     16
//                                   }
//                                   style={{
//                                     color:
//                                       theme.accent,
//                                   }}
//                                 />
//                               )}
//                             </span>

//                             {/* Product name */}

//                             <span>

//                               <span className="block text-sm font-semibold text-[#174C35]">
//                                 {
//                                   product.name
//                                 }
//                               </span>

//                               <span className="block text-[11px] text-[#98A2B3]">
//                                 {product.weight ||
//                                   "PopFresh"}
//                               </span>

//                             </span>

//                             {/* Selected check */}

//                             {selected && (
//                               <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#174C35] text-white">

//                                 <Check
//                                   size={13}
//                                 />

//                               </span>
//                             )}

//                           </button>
//                         );
//                       }
//                     )}

//                   </div>

//                 </div>

//               </div>

//               {/* =================================================
//                   SUMMARY
//               ================================================= */}

//               <div
//                 className="
//                   mt-12
//                   rounded-[28px]
//                   border
//                   border-[#E5DED1]
//                   bg-white
//                   p-6
//                   shadow-[0_15px_45px_rgba(24,76,53,0.05)]
//                   md:p-7
//                 "
//               >

//                 <div className="flex items-start justify-between gap-6">

//                   <div>

//                     <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#667085]">
//                       Your combo
//                     </p>

//                     <h3
//                       className="mt-2 text-2xl text-[#174C35]"
//                       style={{
//                         fontFamily:
//                           "Fraunces, serif",
//                       }}
//                     >
//                       Pack of{" "}
//                       {selectedPackSize}
//                     </h3>

//                   </div>

//                   <div className="text-right">

//                     <p className="text-3xl font-bold text-[#184C35]">
//                       ₹
//                       {comboSellingPrice.toLocaleString(
//                         "en-IN"
//                       )}
//                     </p>

//                     {selectedConfig &&
//                       Number(
//                         selectedConfig.discountPrice
//                       ) > 0 &&
//                       Number(
//                         selectedConfig.discountPrice
//                       ) <
//                         Number(
//                           selectedConfig.price
//                         ) && (
//                         <p className="mt-1 text-sm text-[#98A2B3] line-through">
//                           ₹
//                           {Number(
//                             selectedConfig.price
//                           ).toLocaleString(
//                             "en-IN"
//                           )}
//                         </p>
//                       )}

//                   </div>

//                 </div>

//                 {/* Selected flavour summary */}

//                 <div className="mt-6 flex flex-wrap gap-2">

//                   {selectedProducts.map(
//                     (
//                       product,
//                       index
//                     ) => (
//                       <div
//                         key={index}
//                         className={`
//                           inline-flex
//                           items-center
//                           gap-2
//                           rounded-full
//                           px-3
//                           py-2
//                           text-xs
//                           font-medium
//                           ${
//                             product
//                               ? "bg-[#EAF4EB] text-[#184C35]"
//                               : "bg-[#F5F1E9] text-[#98A2B3]"
//                           }
//                         `}
//                       >

//                         <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold">
//                           {index + 1}
//                         </span>

//                         {product
//                           ? product.name
//                           : "Choose flavour"}

//                       </div>
//                     )
//                   )}

//                 </div>

//                 {/* Progress */}

//                 <div className="mt-6">

//                   <div className="mb-2 flex items-center justify-between text-xs">

//                     <span className="text-[#667085]">
//                       Combo progress
//                     </span>

//                     <span className="font-semibold text-[#174C35]">
//                       {selectedCount}/
//                       {selectedPackSize}
//                     </span>

//                   </div>

//                   <div className="h-2 overflow-hidden rounded-full bg-[#EFE9DD]">

//                     <div
//                       className="h-full rounded-full bg-[#3E8C57] transition-all duration-300"
//                       style={{
//                         width: `${
//                           selectedPackSize
//                             ? (selectedCount /
//                                 selectedPackSize) *
//                               100
//                             : 0
//                         }%`,
//                       }}
//                     />

//                   </div>

//                 </div>

//                 {/* Actions */}

//                 <div className="mt-7 grid gap-3 sm:grid-cols-2">

//                   {/* Add to cart */}

//                   <button
//                     type="button"
//                     disabled={
//                       actionLoading ||
//                       selectedCount !==
//                         Number(
//                           selectedPackSize
//                         )
//                     }
//                     onClick={
//                       handleAddToCart
//                     }
//                     className="
//                       inline-flex
//                       items-center
//                       justify-center
//                       gap-2
//                       rounded-full
//                       border-2
//                       border-[#174C35]
//                       px-6
//                       py-4
//                       text-sm
//                       font-bold
//                       text-[#174C35]
//                       transition-all
//                       hover:bg-[#EAF4EB]
//                       disabled:cursor-not-allowed
//                       disabled:opacity-40
//                     "
//                   >

//                     <ShoppingCart
//                       size={18}
//                     />

//                     Add to cart

//                   </button>

//                   {/* Buy now */}

//                   <button
//                     type="button"
//                     disabled={
//                       actionLoading ||
//                       selectedCount !==
//                         Number(
//                           selectedPackSize
//                         )
//                     }
//                     onClick={
//                       handleBuyNow
//                     }
//                     className="
//                       inline-flex
//                       items-center
//                       justify-center
//                       gap-2
//                       rounded-full
//                       bg-[#174C35]
//                       px-6
//                       py-4
//                       text-sm
//                       font-bold
//                       text-white
//                       shadow-[0_10px_25px_rgba(24,76,53,0.18)]
//                       transition-all
//                       hover:-translate-y-0.5
//                       hover:bg-[#123E2B]
//                       disabled:cursor-not-allowed
//                       disabled:opacity-40
//                     "
//                   >

//                     {actionLoading
//                       ? "Please wait..."
//                       : "Buy this combo"}

//                     {!actionLoading && (
//                       <ArrowRight
//                         size={18}
//                       />
//                     )}

//                   </button>

//                 </div>

//                 {/* Reassurance */}

//                 <p className="mt-5 text-center text-xs leading-5 text-[#98A2B3]">
//                   Choose {selectedPackSize}{" "}
//                   flavours to complete
//                   your custom PopFresh box.
//                 </p>

//               </div>

//             </div>

//           </section>

//         </div>

//       </main>

//       <Footer />
//     </>
//   );
// }