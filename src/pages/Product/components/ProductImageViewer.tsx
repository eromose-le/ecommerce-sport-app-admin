import React from "react";

type Media = {
  type: "image" | "video";
  images?: string[];
  displayImage: string;
  links?: {
    introVideo?: string;
    completeVideo?: string;
  };
};

type ProductImageViewerProps = {
  medias: Media[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
};

const ProductImageViewer: React.FC<ProductImageViewerProps> = ({
  medias,
  isLoading,
  isError,
  errorMessage,
}) => {
  const getEmbeddableLink = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (
        urlObj.hostname === "www.youtube.com" &&
        urlObj.pathname === "/watch"
      ) {
        return `https://www.youtube.com/embed/${urlObj.searchParams.get("v")}`;
      }
      return url; // Return original URL if it's not a YouTube video link
    } catch {
      return url; // Return original URL if parsing fails
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading media...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error: {errorMessage || "Failed to load media."}
      </div>
    );
  }

  if (!medias.length) {
    return <div className="text-center text-gray-500">No media available.</div>;
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      {medias?.map((media, index) => {
        switch (media.type) {
          case "image":
            return (
              <div
                key={index}
                className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 flex flex-col items-center"
              >
                {media?.images?.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`Image ${imgIndex + 1}`}
                    className="w-full h-auto rounded-lg shadow-md"
                    loading="lazy"
                  />
                ))}
              </div>
            );
          case "video":
            return (
              <div
                key={index}
                className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 flex flex-col items-center"
              >
                {media.links?.introVideo && (
                  <video
                    controls
                    className="w-full h-auto rounded-lg shadow-md"
                  >
                    <source src={media?.links?.introVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                {media?.links?.completeVideo && (
                  <iframe
                    src={getEmbeddableLink(media?.links?.completeVideo)}
                    title={`Video ${index + 1}`}
                    className="w-full h-auto rounded-lg shadow-md mt-4"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ProductImageViewer;
