export const getOrderStatusDetails = (status: string) => {
  const statusColors: Record<string, string> = {
    PENDING: "text-yellow-500",
    SHIPPED: "text-blue-500",
    OUT_FOR_DELIVERY: "text-orange-500",
    DELIVERED: "text-green-600",
    FAILED_DELIVERY: "text-red-500",
    CANCELED: "text-gray-500",
  };

  // Transform underscores to spaces and capitalize each word
  const formattedStatus = status
    ?.toLowerCase()
    ?.replace(/_/g, " ")
    ?.replace(/\b\w/g, (char) => char?.toUpperCase());

  return {
    colorClass: statusColors[status] || "text-gray-500",
    formattedStatus: formattedStatus?.toUpperCase(),
  };
};

export const getTransactionStatusDetails = (status: string) => {
  const statusColors: Record<string, string> = {
    PENDING: "text-orange-500",
    SUCCESS: "text-green-600",
    FAILED: "text-red-500",
  };

  // Transform underscores to spaces and capitalize each word
  const formattedStatus = status
    ?.toLowerCase()
    ?.replace(/_/g, " ")
    ?.replace(/\b\w/g, (char) => char?.toUpperCase());

  return {
    colorClass: statusColors[status] || "text-gray-500",
    formattedStatus: formattedStatus?.toUpperCase(),
  };
};
