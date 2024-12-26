type CartItem = {
  quantity?: number;
};

export function calculateCartTotals(items: CartItem[] | undefined | null): {
  totalItemInCart: number;
  totalItemQtyInAllCart: number;
} {
  // Initialize response with default values
  const response = {
    totalItemInCart: 0,
    totalItemQtyInAllCart: 0,
  };

  try {
    // Validate input
    if (!Array.isArray(items)) {
      throw new Error("Invalid input: items should be an array.");
    }

    // Filter out invalid items and calculate totals
    const validItems = items.filter(
      (item) => item && typeof item.quantity === "number" && item.quantity > 0
    );

    response.totalItemInCart = validItems.length;
    response.totalItemQtyInAllCart = validItems.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );
  } catch (error: any) {
    console.error("Error calculating cart totals:", error?.message);
  }

  return response;
}
