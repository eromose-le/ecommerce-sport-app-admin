import { FC, useState } from "react";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { Trash04 } from "@untitled-ui/icons-react";

interface ProductSpecificationProps {
  formik: any;
}
const ProductSpecification: FC<ProductSpecificationProps> = ({ formik }) => {
  const [specifications, setSpecifications] = useState([
    { key: "", value: "" },
  ]);

  const handleAddSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const handleRemoveSpecification = (index: number) => {
    const updatedSpecs = specifications.filter((_, i) => i !== index);
    setSpecifications(updatedSpecs);
    formik.setFieldValue(`specification`, updatedSpecs);
  };

  const handleSpecificationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedSpecs = specifications.map((spec, i) =>
      i === index ? { ...spec, [field]: value } : spec
    );

    setSpecifications(updatedSpecs);
  };

  return (
    <section className="space-y-1">
      <div className="flex flex-col -space-y-3">
        <Typography
          color="grey.700"
          component="label"
          className="font-medium text-sm font-inter capitalize"
          htmlFor="specifications"
        >
          Specifications
        </Typography>
        {specifications.map((spec, index) => (
          <div className="flex items-center space-x-2" key={index}>
            <TextField
              className="MuiTextFieldOutlined--plain capitalize"
              placeholder="Enter title"
              name="key"
              id="key"
              value={spec?.key}
              multiline
              rows={4}
              onChange={(e) => {
                handleSpecificationChange(index, "key", e.target.value);
                formik.setFieldValue(
                  `specification[${index}].key`,
                  e.target.value
                );
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.specification?.[index]?.key &&
                Boolean(formik.errors.specification?.[index]?.key)
              }
              helperText={
                formik.touched.specification?.[index]?.key &&
                formik.errors.specification?.[index]?.key
              }
              fullWidth
              margin="normal"
            />

            <TextField
              className="MuiTextFieldOutlined--plain capitalize"
              placeholder="Enter more details"
              name="value"
              id="value"
              value={spec?.value}
              multiline
              rows={4}
              onChange={(e) => {
                handleSpecificationChange(index, "value", e.target.value);
                formik.setFieldValue(
                  `specification[${index}].value`,
                  e.target.value
                );
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.specification?.[index]?.value &&
                Boolean(formik.errors.specification?.[index]?.value)
              }
              helperText={
                formik.touched.specification?.[index]?.value &&
                formik.errors.specification?.[index]?.value
              }
              fullWidth
              margin="normal"
            />

            <IconButton
              className="hover:bg-[#f5ebeb]"
              onClick={() => handleRemoveSpecification(index)}
            >
              <Trash04 className="text-[#D92D20]" />
            </IconButton>
          </div>
        ))}
      </div>
      <Button
        variant="ghost"
        size="small"
        className="capitalize"
        type="button"
        onClick={handleAddSpecification}
      >
        Add more
      </Button>
    </section>
  );
};

export default ProductSpecification;
