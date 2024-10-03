export const AUTHENTICATED = true;
export const DEFAULT_SNACKBAR_DURATION = 3000;
export const PAGINATION_DEFAULT = {
  page: 0,
  limit: 24,
};

// uploadConfig.ts
export const uploadConfig = {
  maxFileSize: "4MB", // Max file size
  maxFileCount: 5, // Max file count for multiple uploads
  allowedFileTypes: [
    // Image MIME types
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/bmp",
    "image/webp",
    "image/tiff",
    "image/svg+xml",
    "image/*",

    // Document MIME types
    "application/pdf",

    // Video MIME types
    "video/mp4",
    "video/mpeg",
    "video/x-msvideo", // .avi
    "video/quicktime", // .mov
    "video/webm",
    "video/ogg",
    "video/x-matroska", // .mkv
    "video/*",
  ], // Allowed MIME types, // Allowed MIME types
};