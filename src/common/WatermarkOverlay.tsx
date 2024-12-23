import React from "react";

interface WatermarkOverlayProps {
  isVisible: boolean;
  text: string;
}

const WatermarkOverlay: React.FC<WatermarkOverlayProps> = ({
  isVisible,
  text,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-white opacity-10"></div>
      <p className="text-gray-300 text-4xl font-bold uppercase rotate-45">
        {text}
      </p>
    </div>
  );
};

export default WatermarkOverlay;
