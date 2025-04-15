import { FC, useEffect, useState } from "react";
import { generateReactHelpers } from "@uploadthing/react";
import { UPLOAD_FORMATS } from "@/constants/enums";
import { uploadConfig } from "@/constants/AppConstants";
import {
  convertSizeToBytes,
  extractImageAppUrlsAndFileType,
  FileObject,
} from "@/utils/fileUtils";
import { Button, Typography } from "@mui/material";
import useExtendedSnackbar from "@/hooks/useExtendedSnackbar";
import { cn } from "@/lib/utils";

const BACKEND_BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;

const { uploadFiles } = generateReactHelpers({
  url: `${BACKEND_BASE_URL}/uploads`, // Use the Uploadthing API endpoint
});

interface ProductImageUploaderProps {
  formik: any;
}
const ProductImageUploader: FC<ProductImageUploaderProps> = ({ formik }) => {
  const { showSuccessSnackbar, showErrorSnackbar } = useExtendedSnackbar();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const images = formik?.values?.medias?.[0]?.images;

  // Prepopulate preview image from Formik's initial value
  useEffect(() => {
    if (images?.length >= 1) {
      setPreviews(images);
    }
  }, [images]);

  // Handle file selection and preview generation
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setFiles(fileArray);

      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);
    }
  };

  // Handle file drop for drag-and-drop functionality
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles) {
      const fileArray = Array.from(droppedFiles);
      setFiles(fileArray);

      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);
    }
  };

  // Handle drag over to prevent default behavior
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUploading(true);
    setIsUploaded(false);

    if (!files || files.length < 1) {
      setIsUploading(false);
      showErrorSnackbar("Please select at least one file.");
      return;
    }

    const isValidFile = files.every((file) => {
      const validType = uploadConfig.allowedFileTypes.includes(file.type);
      const validSize =
        file.size <= convertSizeToBytes(uploadConfig.maxFileSize);
      return validType && validSize;
    });

    if (!isValidFile) {
      showErrorSnackbar("Invalid file. Check type and size.");
      setIsUploading(false);
      return;
    }

    try {
      const result = await uploadFiles(UPLOAD_FORMATS.IMAGE, { files });

      const newImageData = extractImageAppUrlsAndFileType(
        result as FileObject[]
      ); // includes type: "image", images, displayImage

      const medias = formik.values.medias ?? [];

      const imageMediaIndex = medias.findIndex(
        (media: any) => media.type === "image"
      );

      let updatedMedias: any = [...medias];

      if (imageMediaIndex !== -1) {
        // Replace existing image media object, preserving other media
        updatedMedias[imageMediaIndex] = {
          ...updatedMedias[imageMediaIndex],
          type: "image", // force override MIME type with 'image'
          images: newImageData.images,
          // displayImage: newImageData?.displayImage ?? "",
        };
      } else {
        // Append new image media object
        updatedMedias.push({ ...newImageData, type: "image" });
      }

      formik.setFieldValue("medias", updatedMedias);
      setIsUploaded(true);
      showSuccessSnackbar("Upload completed");
    } catch (error) {
      showErrorSnackbar(`Upload error: ${error}`);
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const isFileUploaded = isUploaded || previews.length > 0;

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full mt-4 max-w-lg mx-auto">
        <Typography
          color="grey.500"
          component="label"
          className="font-medium text-sm font-inter capitalize"
          htmlFor="productImages"
        >
          Upload Product Images
        </Typography>

        <div className="flex flex-col md:flex-row gap-2 items-start justify-start">
          {/* Dropzone area */}
          <div
            className={cn(
              "flex flex-col justify-start items-center px-12 py-12 border-2 border-gray-300 border-dashed rounded-md hover:border-orange-200 focus:outline-none cursor-pointer",
              isDragging ? "border-green-500" : "border-gray-300"
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H20V4a4 4 0 00-4-4H8a4 4 0 00-4 4v40a4 4 0 004 4h32a4 4 0 004-4V16a4 4 0 00-4-4h-8V8z"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                >
                  <span>Drag and drop files, or click to upload</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept={uploadConfig.allowedFileTypes.join(",")}
                    className="sr-only"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>

            {/* Image preview section */}
            {previews.length > 0 && (
              <div className="mt-4 gap-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={!!preview ? preview : images}
                      alt={`Preview ${index + 1}`}
                      className="object-cover h-32 w-32 rounded-md flex items-center justify-center"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1"
                      onClick={() => {
                        const medias = formik.values.medias ?? [];

                        const imageMediaIndex = medias.findIndex(
                          (media: any) => media.type === "image"
                        );
                        if (imageMediaIndex === -1) return;

                        const updatedMedias = [...medias];
                        const targetImageMedia = updatedMedias[imageMediaIndex];

                        const updatedImages = targetImageMedia.images.filter(
                          (_: any, i: any) => i !== index
                        );

                        updatedMedias[imageMediaIndex] = {
                          ...targetImageMedia,
                          images: updatedImages,
                          // Optional: Update displayImage fallback
                          displayImage:
                            targetImageMedia.displayImage ===
                            targetImageMedia.images[index]
                              ? updatedImages[0] ?? ""
                              : targetImageMedia.displayImage,
                        };

                        formik.setFieldValue("medias", updatedMedias);
                        setPreviews((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                        setFiles((prev) => prev.filter((_, i) => i !== index));
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Button */}
          <div className="">
            <Button
              className={cn(
                "hover:bg-[#18dd81] font-inter capitalize font-medium",
                isFileUploaded && "bg-green-900"
              )}
              type="submit"
            >
              {isUploading
                ? "Uploading..."
                : isFileUploaded
                ? "Update"
                : "Upload"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProductImageUploader;
