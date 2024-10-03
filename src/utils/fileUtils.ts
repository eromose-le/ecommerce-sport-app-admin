// Utility function to convert file size string (e.g., "4MB") to bytes
export const convertSizeToBytes = (size: string): number => {
  const units: { [key: string]: number } = {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
  };

  // Extract the numeric part and the unit part (e.g., "4MB" -> 4, "MB")
  const regex = /^(\d+(?:\.\d+)?)\s*(B|KB|MB|GB)$/i;
  const match = size.match(regex);

  if (!match) {
    throw new Error("Invalid file size format");
  }

  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  // Multiply the value by the unit size in bytes
  return value * (units[unit] || 1);
};

export type FileObject = {
  name: string;
  size: number;
  key: string;
  lastModified: number;
  url: string;
  appUrl: string;
  customId: string | null;
  type: string;
};

export const extractImageAppUrlsAndFileType = (fileArray: FileObject[]) => {
  const images = fileArray.map((file) => file.appUrl); // Extract all appUrl values
  const type = fileArray[0]?.type || ""; // Assuming the type is the same for all items in the array

  return {
    images,
    type,
  };
};

export const extractVideoAppUrlsAndFileType = (file: FileObject) => {
  const links = { introVideo: file.appUrl, completeVideo: "" };
  const type = file?.type || "";

  return {
    displayImage: "",
    links,
    type,
  };
};

type MediaItem = {
  displayImage?: string;
  links?: {
    introVideo?: string;
    completeVideo?: string;
  };
  images?: string[];
  type: string;
};

type FormatMediaArgs = {
  displayImage: string;
  completeVideo: string;
  medias: MediaItem[];
};

export const formatMedias = ({
  displayImage,
  completeVideo,
  medias,
}: FormatMediaArgs): MediaItem[] => {
  return (
    medias
      .map((media) => {
        // Add missing displayImage if not present
        if (!media.displayImage) {
          media.displayImage = displayImage;
        }

        // If video, add completeVideo link
        if (media.links && media.type.startsWith("video")) {
          media.links.completeVideo = completeVideo;
        }

        // Slice type by "/" and pick the first index
        media.type = media.type.split("/")[0];

        return media;
      })
      // Sort: move items with type 'image' first
      .sort((a, _b: any) => (a.type === "image" ? -1 : 1))
  );
};
