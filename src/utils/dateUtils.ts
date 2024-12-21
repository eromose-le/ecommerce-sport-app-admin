import { format, parseISO, isValid, formatDistanceToNow } from "date-fns";

export const transformDate = (dateString: any): string => {
  try {
    if (typeof dateString !== "string" || dateString.trim() === "") {
      console.warn("Invalid dateString provided:", dateString);
      return "Invalid date";
    }

    const date = parseISO(dateString);
    if (!isValid(date)) {
      console.warn("Parsed date is invalid:", dateString);
      return "Invalid date";
    }

    return format(date, "dd MMM, yyyy (HH:mm)");
  } catch (error) {
    console.error("Error in transformDate:", error);
    return "Invalid date";
  }
};

/**
 * Calculate time ago from a given date
 * @param dateString - The input date string
 * @returns {string} - A human-readable "time ago" string
 */
export function calculateTimeAgo(dateString: string): string {
  const date = new Date(dateString);

  return formatDistanceToNow(date, { addSuffix: true });
}