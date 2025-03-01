import { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  Checkbox,
  ListItemText,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { ApiColorStoreSlice } from "@/api/ApiColorStoreSlice";
import { ApiSizeStoreSlice } from "@/api/ApiSizeStoreSlice";
import { ApiCategoryStoreSlice } from "@/api/ApiCategoryStoreSlice";
import ProductImageUploader from "./ProductImageUploader";
import ProductVideoUploader from "./ProductVideoUploader";
import ProductSingleImageUploader from "./ProductSingleImageUploader";
import ProductSpecification from "./ProductSpecification";
import { formatKeyValuePair } from "@/utils/ObjectUtils";
import ProductKeyattribute from "./ProductKeyattribute";
import useExtendedSnackbar from "@/hooks/useExtendedSnackbar";
import { ApiProductStoreSlice } from "@/api/ApiProductStoreSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextFieldLoading,
  TextFieldError,
  TextFieldEmpty,
} from "@/common/TextFieldStateComponents/TextFieldStateComponents";
import { routeEnum } from "@/constants/RouteConstants";
import SportygalaxyLoadingIndicator from "@/common/Loading/SportygalaxyLoadingIndicator";
import { ProductColor, ProductSize } from "@/types/product";
import BackButton from "@/common/BackButton";
import { LoadingButton } from "@mui/lab";
import DropdownIcon from "@/common/SVG/DropdownIcon";
import useToggle from "@/hooks/useToggle";

type TCategories = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: Date | null;
  subcategories: [
    {
      id: string | number;
      name: string;
      description: null;
      categoryId: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: Date | null;
    }
  ];
};

type TSubcategories = {
  id: string | number;
  name: string;
  description: null;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: Date | null;
};

const validationSchema = Yup.object({
  displayImage: Yup.string().required("Display image is required"),
  completeVideo: Yup.string().optional(),
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().optional().positive("Price must be positive"),
  stock: Yup.number().optional().integer("Stock must be an integer"),
  categoryId: Yup.string().required("Category is required").optional(),
  subcategoryId: Yup.string().required("Subcategory is required").optional(),
  sizeIds: Yup.array().min(1, "Select at least one size"),
  colorIds: Yup.array().min(1, "Select at least one color"),
  specification: Yup.array().of(
    Yup.object().shape({
      key: Yup.string().required("Key is required").optional(),
      value: Yup.string().required("Value is required").optional(),
    })
  ),
  keyattribute: Yup.array().of(
    Yup.object().shape({
      key: Yup.string().required("Key is required").optional(),
      value: Yup.string().required("Value is required").optional(),
    })
  ),
});

const flattenSizeIds = (array: ProductSize[]): string[] => {
  return array.map((item) => item.sizeId); // Extract only the sizeId
};
const flattenColorIds = (array: ProductColor[]): string[] => {
  return array.map((item) => item.colorId); // Extract only the sizeId
};

interface ProductUpdateProps {}
const ProductUpdate: FC<ProductUpdateProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>() as { id: string };
  const { showSuccessSnackbar, showErrorSnackbar } = useExtendedSnackbar();
  const [categoryId, setCategoryId] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const [isSizeIdDropdown, toggleIsSizeIdDropdown, setToggleIsSizeIdDropdown] =
    useToggle(false);

  const [
    isColorIdDropdown,
    toggleIsColorIdDropdown,
    setToggleIsColorIdDropdown,
  ] = useToggle(false);

  const [
    isCategoryIdDropdown,
    toggleIsCategoryIdDropdown,
    setToggleIsCategoryIdDropdown,
  ] = useToggle(false);

  const [
    isSubcategoryIdDropdown,
    toggleIsSubcategoryIdDropdown,
    setToggleIsSubcategoryIdDropdown,
  ] = useToggle(false);

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

  const [updateProduct, updateProductResult] =
    ApiProductStoreSlice.useUpdateProductMutation();
  useEffect(() => {
    // Get the subcategories from the selected category
    const selectedCategory = categorysResponse?.data?.find(
      (category: TCategories) => category.id === categoryId
    );
    setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
  }, [categoryId, categorysResponse]);

  const getProductInfoQuery = ApiProductStoreSlice.useGetProductInfoQuery(
    {
      id,
    },
    { skip: !id }
  );
  const productInfoResponse = getProductInfoQuery?.data?.data;

  const formik = useFormik({
    initialValues: {
      name: productInfoResponse?.name || "",
      description: productInfoResponse?.description || "",
      price: productInfoResponse?.price || "",
      stock: 0,
      categoryId: productInfoResponse?.categoryId || "",
      subcategoryId: productInfoResponse?.subcategoryId || "",
      sizeIds: productInfoResponse?.sizeIds || [],
      colorIds: productInfoResponse?.colorIds || [],
      displayImage: productInfoResponse?.displayImage || "",
      completeVideo: productInfoResponse?.completeVideo || "",
      medias: productInfoResponse?.medias || [],
      specification: productInfoResponse?.specification || [
        { key: "", value: "" },
      ],
      keyattribute: productInfoResponse?.keyattribute || [
        { key: "", value: "" },
      ],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // const input = {
        //   displayImage: values.displayImage,
        //   completeVideo: values.completeVideo,
        //   medias: values.medias,
        // };

        const formattedSpecificationArray = formatKeyValuePair(
          values.specification
        );
        const formattedKeyattributeArray = formatKeyValuePair(
          values.keyattribute
        );

        const validatePayload = (values: any) => {
          const payload: any = {};

          // List of fields to check and conditionally add to the payload
          const fields = [
            "name",
            "description",
            "price",
            "stock",
            "categoryId",
            "subcategoryId",
            "sizeIds",
            "colorIds",
            "displayImage",
            "medias",
            "specification",
            "keyattribute",
          ];

          fields.forEach((field) => {
            const value = values[field];

            // Check for the value to ensure it's not undefined, an empty string, or an empty array
            if (
              value !== undefined &&
              value !== "" &&
              value !== 0 &&
              (Array.isArray(value) ? value.length > 0 : true) &&
              (typeof value !== "number" || !isNaN(value)) // Exclude NaN values for numbers
            ) {
              payload[field] = value;
            }
          });

          // If medias, specification, or keyattribute are arrays, ensure they are formatted correctly before adding to payload
          // if (values.medias && values.medias.length > 0) {
          //   payload.medias = values.medias; // Assuming `formattedMediaArray` is already defined
          // }

          if (values.specification && values.specification.length > 0) {
            payload.specification = formattedSpecificationArray; // Assuming `formattedSpecificationArray` is already defined
          }

          if (values.keyattribute && values.keyattribute.length > 0) {
            payload.keyattribute = formattedKeyattributeArray; // Assuming `formattedKeyattributeArray` is already defined
          }

          return payload;
        };

        const payload = {
          name: values.name,
          description: values.description,
          price: values.price,
          stock: Number(values.stock) || null,
          categoryId: values.categoryId,
          subcategoryId: values.subcategoryId,
          sizeIds: values.sizeIds,
          colorIds: values.colorIds,
          displayImage: values.displayImage,
          medias: values.medias,
          specification: formattedSpecificationArray,
          keyattribute: formattedKeyattributeArray,
        };

        // console.log("DATA ::", {
        //   input,
        //   isAllowToEditImage,
        //   formattedMediaArray,
        //   payload,
        //   validatePayload: validatePayload(payload),
        // });

        const data = await updateProduct({
          id,
          ...validatePayload(payload),
        }).unwrap();

        showSuccessSnackbar(data?.message || "Successful");
        navigate(routeEnum.PRODUCTS);
      } catch (error: any) {
        showErrorSnackbar(error?.data?.error || "Error occured");
      }
    },
  });

  //Error Handling
  if (categoryError) {
    showErrorSnackbar(categoryError?.message || "Error occured");
  }
  if (sizeError) {
    showErrorSnackbar(sizeError?.message || "Error occured");
  }
  if (colorError) {
    showErrorSnackbar(colorError?.message || "Error occured");
  }

  useEffect(() => {
    if (getProductInfoQuery?.data) {
      const productData = getProductInfoQuery.data.data;

      formik.setValues({
        name: productData?.name || "",
        description: productData?.description || "",
        price: productData?.price || "",
        stock: 0,
        categoryId: productData?.categoryId || "",
        subcategoryId: productData?.subcategoryId || "",
        sizeIds: flattenSizeIds(productData?.sizes) || [],
        colorIds: flattenColorIds(productData?.colors) || [],
        displayImage: productData?.displayImage || "",
        completeVideo: productData?.medias[1]?.links?.completeVideo || "",
        medias: productData?.medias || [],
        specification: productData?.specification || [{ key: "", value: "" }],
        keyattribute: productData?.keyattribute || [{ key: "", value: "" }],
      });
    }
  }, [getProductInfoQuery?.data]);

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop: (acceptedFiles: any) => {
  //     console.log("acceptedFiles ::", acceptedFiles);
  //     // handle file upload logic with Uploadthing here
  //   },
  // });

  const isLoading =
    getProductInfoQuery.isLoading ||
    getProductInfoQuery.isFetching ||
    colorIsLoading ||
    categoryIsLoading ||
    sizeIsLoading;

  if (isLoading) {
    return <SportygalaxyLoadingIndicator />;
  }

  return (
    <div className="container-wrapper py-[30px] h-[calc(100vh-118.5px)]">
      <div className="flex items-center justify-between">
        <div>
          <BackButton />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProductSingleImageUploader formik={formik} />
        <ProductImageUploader formik={formik} />
        <ProductVideoUploader formik={formik} />
      </div>

      <form
        // onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-8"
      >
        {/* <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag 'n' drop the display image here, or click to select files</p>
        </div> */}

        <div className="flex flex-col space-y-1 col-span-2 md:col-span-1">
          <Typography
            color="grey.500"
            component="label"
            className="font-medium text-sm font-inter"
            htmlFor="completeVideo"
          >
            Paste Link to youTube video here
          </Typography>
          <TextField
            className="MuiTextFieldOutlined--plain capitalize"
            placeholder="https://www.youtube.com/watch?v=6qg7UHgkq-U"
            id="completeVideo"
            name="completeVideo"
            size="small"
            value={formik.values.completeVideo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.completeVideo &&
              Boolean(formik.errors.completeVideo)
            }
            helperText={
              formik.touched.completeVideo &&
              (formik.errors.completeVideo as any)
            }
            fullWidth
            margin="normal"
          />
        </div>

        <div className="flex flex-col space-y-1 col-span-2 md:col-span-1">
          <Typography
            color="grey.700"
            component="label"
            className="font-medium text-sm font-inter capitalize"
            htmlFor="productName"
          >
            <span className="text-[#D92D20] text-sm font-medium font-inter">
              *
            </span>
            Product Name
          </Typography>
          <TextField
            className="MuiTextFieldOutlined--plain capitalize"
            placeholder="Enter product name here"
            name="name"
            id="productName"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && (formik.errors.name as any)}
            fullWidth
            margin="normal"
          />
        </div>

        <div className="flex flex-col space-y-1 col-span-2">
          <Typography
            color="grey.700"
            component="label"
            className="font-medium text-sm font-inter capitalize"
            htmlFor="description"
          >
            Product Description
          </Typography>
          <TextField
            className="MuiTextFieldOutlined--plain capitalize"
            placeholder="Enter product description here"
            name="description"
            id="description"
            multiline
            rows={6}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={
              formik.touched.description && (formik.errors.description as any)
            }
            fullWidth
            margin="normal"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <Typography
            color="grey.700"
            component="label"
            className="font-medium text-sm font-inter capitalize"
            htmlFor="price"
          >
            <span className="text-[#D92D20] text-sm font-medium font-inter">
              *
            </span>
            Product Price
          </Typography>
          <TextField
            className="MuiTextFieldOutlined--plain capitalize"
            placeholder="Enter product price here"
            name="price"
            id="price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && (formik.errors.price as any)}
            fullWidth
            margin="normal"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <Typography
            color="grey.700"
            component="label"
            className="font-medium text-sm font-inter capitalize"
            htmlFor="stock"
          >
            Add Stock Count
          </Typography>

          <TextField
            className="MuiTextFieldOutlined--plain capitalize"
            placeholder="Enter stock count"
            id="stock"
            name="stock"
            type="number"
            value={formik.values.stock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.stock && Boolean(formik.errors.stock)}
            helperText={formik.touched.stock && (formik.errors.stock as any)}
            fullWidth
            margin="normal"
            inputProps={{ min: 0 }}
          />
          <Typography
            color="error"
            component="label"
            className="font-light text-xs font-inter capitalize"
            htmlFor="stock"
          >
            remaining ({productInfoResponse?.stock || 0})
          </Typography>
        </div>

        <div className="flex flex-col space-y-1 col-span-2 md:col-span-1">
          <Typography
            color="grey.700"
            component="label"
            className="font-medium text-sm font-inter capitalize"
            htmlFor="categoryId"
          >
            <span className="text-[#D92D20] text-sm font-medium font-inter">
              *
            </span>
            Category Id
          </Typography>
          <FormControl fullWidth margin="normal">
            <Select
              displayEmpty
              className="MuiTextFieldOutlined--plain text-sm capitalize font-inter"
              id="categoryId"
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
              IconComponent={() => (
                <div className="p-2">
                  <DropdownIcon
                    toggle={toggleIsCategoryIdDropdown}
                    isOpen={isCategoryIdDropdown}
                  />
                </div>
              )}
              open={isCategoryIdDropdown}
              onOpen={() => setToggleIsCategoryIdDropdown(true)}
              onClose={() => setToggleIsCategoryIdDropdown(false)}
              renderValue={(selected) => {
                if (selected === "") {
                  return (
                    <span className="text-sm text-gray-400 font-medium normal-case">
                      Choose category
                    </span>
                  );
                }
                const selectedCategory = categorysResponse?.data?.find(
                  (category: TCategories) => category.id === selected
                );
                return selectedCategory ? selectedCategory.name : "";
              }}
            >
              {categoryIsLoading ? (
                <MenuItem disabled>
                  <TextFieldLoading />
                </MenuItem>
              ) : categoryIsError ? (
                <MenuItem disabled>
                  <TextFieldError refetch={categoryRefetch} />
                </MenuItem>
              ) : categorysResponse?.data?.length === 0 ? (
                <MenuItem disabled>
                  <TextFieldEmpty />
                </MenuItem>
              ) : (
                categorysResponse?.data?.map((category: TCategories) => (
                  <MenuItem
                    className="text-sm capitalize font-inter"
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </div>

        {categoryId && (
          <div className="flex flex-col space-y-1 col-span-2 md:col-span-1">
            <Typography
              color="grey.700"
              component="label"
              className="font-medium text-sm font-inter capitalize"
              htmlFor="subcategoryId"
            >
              <span className="text-[#D92D20] text-sm font-medium font-inter">
                *
              </span>
              Sub Category Id
            </Typography>
            <FormControl fullWidth margin="normal">
              <Select
                displayEmpty
                className="MuiTextFieldOutlined--plain text-sm capitalize font-inter"
                id="subcategoryId"
                name="subcategoryId"
                value={formik.values.subcategoryId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.subcategoryId &&
                  Boolean(formik.errors.subcategoryId)
                }
                IconComponent={() => (
                  <div className="p-2">
                    <DropdownIcon
                      toggle={toggleIsSubcategoryIdDropdown}
                      isOpen={isSubcategoryIdDropdown}
                    />
                  </div>
                )}
                open={isSubcategoryIdDropdown}
                onOpen={() => setToggleIsSubcategoryIdDropdown(true)}
                onClose={() => setToggleIsSubcategoryIdDropdown(false)}
                renderValue={(selected): any => {
                  if (selected === "") {
                    return (
                      <span className="text-sm text-gray-400 font-medium normal-case">
                        Choose sub category
                      </span>
                    );
                  }

                  // Use `reduce` to find the matching subcategory name
                  const selectedCategoryName = subcategories?.reduce(
                    (acc, category: TSubcategories) => {
                      if (String(category?.id) === String(selected)) {
                        acc = category?.name;
                      }
                      return acc;
                    },
                    ""
                  );

                  return selectedCategoryName || "Choose sub category";
                }}
              >
                {subcategories?.map((subcategory: TSubcategories) => (
                  <MenuItem key={subcategory?.id} value={subcategory?.id}>
                    {subcategory?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}

        <div className="flex flex-col space-y-1 col-span-2 md:col-span-1">
          <Typography
            color="grey.700"
            component="label"
            className="font-medium text-sm font-inter capitalize"
            htmlFor="sizeIds"
          >
            Sizes
          </Typography>
          <FormControl fullWidth margin="normal">
            <Select
              displayEmpty
              className="MuiTextFieldOutlined--plain text-sm capitalize font-inter"
              id="sizeIds"
              multiple
              name="sizeIds"
              value={formik.values.sizeIds}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.sizeIds && Boolean(formik.errors.sizeIds)}
              IconComponent={() => (
                <div className="p-2">
                  <DropdownIcon
                    toggle={toggleIsSizeIdDropdown}
                    isOpen={isSizeIdDropdown}
                  />
                </div>
              )}
              open={isSizeIdDropdown}
              onOpen={() => setToggleIsSizeIdDropdown(true)}
              onClose={() => setToggleIsSizeIdDropdown(false)}
              renderValue={(selected) => {
                // Handle placeholder when nothing is selected
                if (selected.length === 0) {
                  return (
                    <span className="text-sm text-gray-400 font-medium normal-case">
                      Choose sizes
                    </span>
                  );
                }

                // Map selected sizes and join them into a string
                return sizesResponse?.data
                  ?.filter((size: { id: string }) =>
                    (selected as string[]).includes(size.id)
                  )
                  .map((size: any) => size.name)
                  .join(", ");
              }}
            >
              {sizeIsLoading ? (
                <MenuItem disabled>
                  <TextFieldLoading />
                </MenuItem>
              ) : sizeIsError ? (
                <MenuItem disabled>
                  <TextFieldError refetch={sizeRefetch} />
                </MenuItem>
              ) : sizesResponse?.data?.length === 0 ? (
                <MenuItem disabled>
                  <TextFieldEmpty />
                </MenuItem>
              ) : (
                sizesResponse?.data?.map(
                  (size: { id: string; name: string }) => (
                    <MenuItem
                      className="flex gap-1"
                      key={size?.id}
                      value={size?.id}
                    >
                      <Checkbox
                        size="small"
                        checked={
                          (formik.values.sizeIds as string[]).indexOf(
                            size?.id
                          ) > -1
                        }
                      />
                      <ListItemText
                        className="text-xs capitalize font-inter"
                        primary={size?.name}
                      />
                    </MenuItem>
                  )
                )
              )}
            </Select>
          </FormControl>
        </div>

        <div className="flex flex-col space-y-1 col-span-2 md:col-span-1">
          <Typography
            color="grey.700"
            component="label"
            className="font-medium text-sm font-inter capitalize"
            htmlFor="sizeIds"
          >
            Colors
          </Typography>
          <FormControl fullWidth margin="normal">
            <Select
              displayEmpty
              className="MuiTextFieldOutlined--plain text-sm capitalize font-inter"
              id="colorIds"
              multiple
              name="colorIds"
              value={formik.values.colorIds}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.colorIds && Boolean(formik.errors.colorIds)}
              IconComponent={() => (
                <div className="p-2">
                  <DropdownIcon
                    toggle={toggleIsColorIdDropdown}
                    isOpen={isColorIdDropdown}
                  />
                </div>
              )}
              open={isColorIdDropdown}
              onOpen={() => setToggleIsColorIdDropdown(true)}
              onClose={() => setToggleIsColorIdDropdown(false)}
              renderValue={(selected) => {
                // Handle placeholder when nothing is selected
                if (selected.length === 0) {
                  return (
                    <span className="text-sm text-gray-400 font-medium normal-case">
                      Choose colors
                    </span>
                  );
                }

                // Map selected colors and join them into a string
                return colorsResponse?.data
                  ?.filter((color: { id: string }) =>
                    (selected as string[]).includes(color.id)
                  )
                  .map((color: { name: string }) => color.name)
                  .join(", ");
              }}
            >
              {colorIsLoading ? (
                <MenuItem disabled>
                  <TextFieldLoading />
                </MenuItem>
              ) : colorIsError ? (
                <MenuItem disabled>
                  <TextFieldError refetch={colorRefetch} />
                </MenuItem>
              ) : colorsResponse?.data?.length === 0 ? (
                <MenuItem disabled>
                  <TextFieldEmpty />
                </MenuItem>
              ) : (
                colorsResponse?.data?.map(
                  (color: { id: string; name: string }) => (
                    <MenuItem
                      className="flex gap-1"
                      key={color?.id}
                      value={color?.id}
                    >
                      <Checkbox
                        size="small"
                        checked={(formik.values.colorIds as string[]).includes(
                          color.id
                        )} // Checked if `color.id` exists in the selected values
                      />
                      <ListItemText
                        className="text-xs capitalize font-inter"
                        primary={color?.name}
                      />
                    </MenuItem>
                  )
                )
              )}
            </Select>
          </FormControl>
        </div>

        <div className="flex flex-col gap-4 col-span-2">
          <ProductSpecification
            formik={formik}
            initialSpecifications={productInfoResponse.specification || []}
          />
          <ProductKeyattribute
            formik={formik}
            initialKeyattributes={productInfoResponse?.keyattribute || []}
          />
        </div>

        <div className="pt-4 pb-6 w-fit">
          <LoadingButton
            disabled={isLoading || updateProductResult.isLoading}
            loading={updateProductResult.isLoading}
            type="button"
            onClick={() => formik.handleSubmit()}
            className="capitalize font-semibold text-base font-inter md:px-10"
            variant="contained"
            color="primary"
            fullWidth
          >
            Update
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdate;
