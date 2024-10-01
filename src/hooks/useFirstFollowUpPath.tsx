import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useFirstFollowUpPath = (): string | null => {
  const [firstFollowUpPath, setFirstFollowUpPath] = useState<string | null>(
    null
  );
  const location = useLocation(); // Get the current location object

  useEffect(() => {
    // Get the pathname from the location and split into parts
    const pathParts: string[] = location.pathname.split("/").filter(Boolean);
    const firstPath: string | null = pathParts.length > 0 ? pathParts[0] : null;

    // Set the first follow-up path whenever the location changes
    setFirstFollowUpPath(firstPath);
  }, [location.pathname]); // Re-run the effect when the pathname changes

  return firstFollowUpPath;
};

export default useFirstFollowUpPath;
