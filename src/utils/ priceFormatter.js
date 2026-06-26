export function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function calculateDiscount(mrp, sellingPrice) {
  return Math.round(((mrp - sellingPrice) / mrp) * 100);
}