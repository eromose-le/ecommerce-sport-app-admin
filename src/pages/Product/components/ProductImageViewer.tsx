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
  displayImage: string;
  medias: Media[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
};

const ProductImageViewer: React.FC<ProductImageViewerProps> = ({
  displayImage,
  medias,
  isLoading,
  isError,
  errorMessage,
}) => {
  const getEmbeddableLink = (url: string): string => {
    try {
      const urlObj = new URL(url);

      // Check for standard YouTube links
      if (
        urlObj.hostname === "www.youtube.com" &&
        urlObj.pathname === "/watch"
      ) {
        return `https://www.youtube.com/embed/${urlObj.searchParams.get("v")}`;
      }

      // Check for shortened YouTube links
      if (urlObj.hostname === "youtu.be") {
        return `https://www.youtube.com/embed${urlObj.pathname}`;
      }

      // Check for YouTube Shorts links
      if (
        urlObj.hostname === "www.youtube.com" ||
        urlObj.hostname === "youtube.com"
      ) {
        if (urlObj.pathname.startsWith("/shorts/")) {
          const videoId = urlObj.pathname.split("/shorts/")[1];
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }

      // Return the original URL if it's not a recognized YouTube format
      return url;
    } catch {
      // Return the original URL if parsing fails
      return url;
    }
  };

  const renderErrorMessage = (condition: boolean, message: string) => {
    if (condition) {
      return <div className="text-center text-gray-500">{message}</div>;
    }
    return null;
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

  const noImages = medias.some(
    (media) =>
      media.type === "image" && (!media.images || media.images.length === 0)
  );

  const noIntroVideo = medias.some(
    (media) => media.type === "video" && !media.links?.introVideo
  );

  const noCompleteVideo = medias.some(
    (media) => media.type === "video" && !media.links?.completeVideo
  );

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      {renderErrorMessage(!displayImage, "No product display image available.")}
      {renderErrorMessage(noImages, "No product image list available.")}
      {renderErrorMessage(noIntroVideo, "No product intro video available.")}
      {renderErrorMessage(
        noCompleteVideo,
        "No product YouTube video available."
      )}

      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 flex flex-col items-center">
        <img
          src={displayImage}
          alt="Display Image"
          className="w-full h-auto rounded-lg shadow-md"
          loading="lazy"
        />
      </div>

      {medias?.map((media, index) => (
        <div
          key={index}
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 flex flex-col items-center"
        >
          {media?.type === "image" &&
            media?.images?.map((image, imgIndex) => (
              <img
                key={imgIndex}
                src={image}
                alt={`Image ${imgIndex + 1}`}
                className="w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            ))}

          {media.type === "video" && (
            <>
              {media?.links?.introVideo && (
                <video controls className="w-full h-auto rounded-lg shadow-md">
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
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductImageViewer;
