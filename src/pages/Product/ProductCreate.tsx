import { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import * as Yup from "yup";
import { ApiColorStoreSlice } from "@/api/ApiColorStoreSlice";
import { ApiSizeStoreSlice } from "@/api/ApiSizeStoreSlice";
import { ApiCategoryStoreSlice } from "@/api/ApiCategoryStoreSlice";
import { useDropzone } from "react-dropzone";
import ProductImageUploader from "./ProductImageUploader";
import ProductVideoUploader from "./ProductVideoUploader";
import ProductSingleImageUploader from "./ProductSingleImageUploader";
import { formatMedias } from "@/utils/fileUtils";

type TCategories = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: Date | null;
  subcategories: [
    {
      id: string;
      name: string;
      description: null;
      categoryId: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: Date | null;
    }
  ];
};

const validationSchema = Yup.object({
  // displayImage: Yup.string().optional(),
  // completeVideo: Yup.string().optional(),
  // name: Yup.string().required("Name is required"),
  // description: Yup.string().required("Description is required"),
  // price: Yup.number()
  //   .required("Price is required")
  //   .positive("Price must be positive"),
  // stock: Yup.number()
  //   .required("Stock is required")
  //   .integer("Stock must be an integer"),
  // categoryId: Yup.string().required("Category is required"),
  // subcategoryId: Yup.string().required("Subcategory is required"),
  // sizeIds: Yup.array().min(1, "Select at least one size"),
  // colorIds: Yup.array().min(1, "Select at least one color"),
});

type TImageObject = {
  images: string[];
  type: string;
};
type TVideoObject = {
  displayImage: string;
  links: {
    introVideo: string;
    completeVideo: string;
  };
  type: string;
};

interface ProductCreateProps {}
const ProductCreate: FC<ProductCreateProps> = () => {
  const [categoryId, setCategoryId] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [imageObject, setImageObject] = useState<TImageObject>({
    images: [],
    type: "image",
  });
  const [videoObject, setVideoObject] = useState<TVideoObject>({
    displayImage: "",
    links: {
      introVideo: "",
      completeVideo: "",
    },
    type: "video",
  });
  const [displayImage, setDisplayImage] = useState<string>("");

  const {
    data: colorsResponse,
    isLoading: colorIsLoading,
    isError: colorIsError,
    refetch: colorRefetch,
    error: colorError,
  } = ApiColorStoreSlice.useGetColorsQuery();

  const {
    data: sizesResponse,
    isLoading: sizeIsLoading,
    isError: sizeIsError,
    refetch: sizeRefetch,
    error: sizeError,
  } = ApiSizeStoreSlice.useGetSizesQuery();

  const {
    data: categorysResponse,
    isLoading: categoryIsLoading,
    isError: categoryIsError,
    refetch: categoryRefetch,
    error: categoryError,
  } = ApiCategoryStoreSlice.useGetCategorysQuery();

  useEffect(() => {
    // Get the subcategories from the selected category
    const selectedCategory = categorysResponse?.data?.find(
      (category: TCategories) => category.id === categoryId
    );
    setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
  }, [categoryId, categorysResponse]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      categoryId: "",
      subcategoryId: "",
      sizeIds: [],
      colorIds: [],
      displayImage: "",
      completeVideo: "",
      medias: [],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);

      const input = {
        displayImage: values.displayImage,
        completeVideo: values.completeVideo,
        medias: values.medias,
      };

      const formattedMediaArray = formatMedias(input);

      const data = {
        name: values.name,
        description: values.description,
        price: values.price,
        stock: values.stock,
        categoryId: values.categoryId,
        subcategoryId: values.subcategoryId,
        sizeIds: values.sizeIds,
        colorIds: values.colorIds,
        displayImage: values.displayImage,
        medias: formattedMediaArray,
      };
      // Handle submission to backend

      console.log("backend payload", data);
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: any) => {
      console.log("acceptedFiles ::", acceptedFiles);
      // handle file upload logic with Uploadthing here
    },
  });

  console.log("formik ::", formik.values);
  return (
    <>
      <ProductSingleImageUploader formik={formik} />
      <ProductImageUploader formik={formik} />
      <ProductVideoUploader formik={formik} />

      <form onSubmit={formik.handleSubmit}>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag 'n' drop the display image here, or click to select files</p>
        </div>

        {/* Complete youtube link Field */}
        <TextField
          label="Complete youtube link"
          name="completeVideo"
          value={formik.values.completeVideo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.completeVideo && Boolean(formik.errors.completeVideo)
          }
          helperText={
            formik.touched.completeVideo && formik.errors.completeVideo
          }
          fullWidth
          margin="normal"
        />

        {/* Product Name Field */}
        <TextField
          label="Product Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          fullWidth
          margin="normal"
        />

        {/* Description Field */}
        <TextField
          label="Description"
          name="description"
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          fullWidth
          margin="normal"
        />

        {/* Price Field */}
        <TextField
          label="Price"
          name="price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          fullWidth
          margin="normal"
        />

        {/* Stock Field */}
        <TextField
          label="Stock"
          name="stock"
          type="number"
          value={formik.values.stock}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.stock && Boolean(formik.errors.stock)}
          helperText={formik.touched.stock && formik.errors.stock}
          fullWidth
          margin="normal"
        />

        {/* Category Select */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="categoryId"
            value={formik.values.categoryId}
            onChange={(e) => {
              formik.handleChange(e);
              setCategoryId(e.target.value); // Set selected categoryId
            }}
            onBlur={formik.handleBlur}
            error={
              formik.touched.categoryId && Boolean(formik.errors.categoryId)
            }
          >
            {categorysResponse?.data?.map((category: TCategories) => (
              <MenuItem key={category?.id} value={category?.id}>
                {category?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Subcategory Select */}
        {categoryId && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Subcategory</InputLabel>
            <Select
              name="subcategoryId"
              value={formik.values.subcategoryId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.subcategoryId &&
                Boolean(formik.errors.subcategoryId)
              }
            >
              {subcategories?.map((subcategory: any) => (
                <MenuItem key={subcategory?.id} value={subcategory?.id}>
                  {subcategory?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Sizes Select */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Sizes</InputLabel>
          <Select
            multiple
            name="sizeIds"
            value={formik.values.sizeIds}
            onChange={formik.handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => selected.join(", ")}
            onBlur={formik.handleBlur}
            error={formik.touched.sizeIds && Boolean(formik.errors.sizeIds)}
          >
            {sizesResponse?.data?.map((size: { id: string; name: string }) => (
              <MenuItem key={size?.id} value={size?.id}>
                <Checkbox
                  checked={
                    (formik.values.sizeIds as string[]).indexOf(size?.id) > -1
                  }
                />
                <ListItemText primary={size?.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Colors Select */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Colors</InputLabel>
          <Select
            multiple
            name="colorIds"
            value={formik.values.colorIds}
            onChange={formik.handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => selected.join(", ")}
            onBlur={formik.handleBlur}
            error={formik.touched.colorIds && Boolean(formik.errors.colorIds)}
          >
            {colorsResponse?.data?.map(
              (color: { id: string; name: string }) => (
                <MenuItem key={color?.id} value={color?.id}>
                  <Checkbox
                    checked={
                      (formik.values.colorIds as string[]).indexOf(color?.id) >
                      -1
                    }
                  />

                  <ListItemText primary={color?.name} />
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </>
  );
};

export default ProductCreate;
