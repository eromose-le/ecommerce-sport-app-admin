import { FC, useEffect, useState } from "react";
import { generateReactHelpers } from "@uploadthing/react";
import { UPLOAD_FORMATS } from "@/constants/enums";
import { uploadConfig } from "@/constants/AppConstants";
import { convertSizeToBytes } from "@/utils/fileUtils";
import { Button, Typography } from "@mui/material";
import useExtendedSnackbar from "@/hooks/useExtendedSnackbar";
import { cn } from "@/lib/utils";

const BACKEND_BASE_URL = import.meta.env.VITE_PUBLIC_API_URL;

const { uploadFiles } = generateReactHelpers({
  url: `${BACKEND_BASE_URL}/uploads`, // Use the Uploadthing API endpoint
});

interface ProductSingleImageUploaderProps {
  formik: any;
}
const ProductSingleImageUploader: FC<ProductSingleImageUploaderProps> = ({
  formik,
}) => {
  const { showSuccessSnackbar, showErrorSnackbar } = useExtendedSnackbar();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  // Prepopulate preview image from Formik's initial value
  useEffect(() => {
    if (
      formik.values.displayImage &&
      !previews.includes(formik.values.displayImage)
    ) {
      setPreviews([formik.values.displayImage]);
    }
  }, [formik.values.displayImage]);

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

    console.log("Selected file MIME type:", files[0]?.type);

    // Optional file validation
    const isValidFile = Array.from(files).every((file) => {
      const validFileType = uploadConfig.allowedFileTypes.includes(file.type);
      const validFileSize =
        file.size <= convertSizeToBytes(uploadConfig.maxFileSize); // Use size in bytes

      setIsUploading(false);
      return validFileType && validFileSize;
    });

    if (!isValidFile) {
      console.log(`Invalid file. Ensure file type and size are correct.`);
      showErrorSnackbar(`Invalid file. Ensure file type and size are correct.`);
      setIsUploading(false);
      return;
    }

    try {
      setIsUploading(true);
      // Use the uploadFiles helper to upload the files
      const result = await uploadFiles(UPLOAD_FORMATS.IMAGE, {
        files: Array.from(files),
      });

      if (result.length >= 1) {
        const displayImage = result[0]?.appUrl as string;
        formik.setFieldValue("displayImage", displayImage);
        showSuccessSnackbar("Upload completed");
        setIsUploading(false);
        setIsUploaded(true);
      } else {
        setIsUploading(false);
        showErrorSnackbar("Upload failed. Please try again.");
        console.log("Upload failed. Please try again.");
      }
    } catch (error) {
      setIsUploading(false);
      showErrorSnackbar(`Error uploading file: ${error}`);
      console.log(`Error uploading file: ${error}`);
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
          htmlFor="specifications"
        >
          Upload Display Image
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
                  htmlFor="single-file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                >
                  <span>Drag and drop files, or click to upload</span>
                  <input
                    id="single-file-upload"
                    name="single-file-upload"
                    type="file"
                    accept={uploadConfig.allowedFileTypes.join(",")}
                    className="sr-only"
                    // multiple
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
                      src={!!preview ? preview : formik.values.displayImage}
                      alt={`Preview ${index + 1}`}
                      className="object-cover h-32 w-32 rounded-md flex items-center justify-center"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1"
                      onClick={() => {
                        const newFiles = files.filter((_, i) => i !== index);
                        const newPreviews = previews.filter(
                          (_, i) => i !== index
                        );

                        formik.setFieldValue("displayImage", "");
                        setFiles(newFiles);
                        setPreviews(newPreviews);
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

export default ProductSingleImageUploader;
