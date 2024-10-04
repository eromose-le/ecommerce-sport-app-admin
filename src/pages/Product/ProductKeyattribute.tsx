import { FC, useState } from "react";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { Trash04 } from "@untitled-ui/icons-react";

interface ProductKeyattributeProps {
  formik: any;
}

const ProductKeyattribute: FC<ProductKeyattributeProps> = ({ formik }) => {
  const [keyattributes, setKeyattributes] = useState([{ key: "", value: "" }]);

  const handleAddKeyattribute = () => {
    setKeyattributes([...keyattributes, { key: "", value: "" }]);
  };

  const handleRemoveKeyattribute = (index: number) => {
    const updatedAttributes = keyattributes.filter((_, i) => i !== index);
    setKeyattributes(updatedAttributes);
    formik.setFieldValue(`keyattribute`, updatedAttributes);
  };

  const handleKeyattributeChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedAttributes = keyattributes.map((attribute, i) =>
      i === index ? { ...attribute, [field]: value } : attribute
    );

    setKeyattributes(updatedAttributes);
  };

  return (
    <section className="space-y-1">
      <div className="flex flex-col -space-y-3">
        <Typography
          color="grey.700"
          component="label"
          className="font-medium text-sm font-inter capitalize"
          htmlFor="keyattributes"
        >
          Keyattributes
        </Typography>
        {keyattributes.map((attribute, index) => (
          <div className="flex items-center space-x-2" key={index}>
            <TextField
              className="MuiTextFieldOutlined--plain capitalize"
              placeholder="Enter title"
              name="key"
              id="key"
              value={attribute?.key}
              multiline
              rows={4}
              onChange={(e) => {
                handleKeyattributeChange(index, "key", e.target.value);
                formik.setFieldValue(
                  `keyattribute[${index}].key`,
                  e.target.value
                );
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.keyattribute?.[index]?.key &&
                Boolean(formik.errors.keyattribute?.[index]?.key)
              }
              helperText={
                formik.touched.keyattribute?.[index]?.key &&
                formik.errors.keyattribute?.[index]?.key
              }
              fullWidth
              margin="normal"
            />

            <TextField
              className="MuiTextFieldOutlined--plain capitalize"
              placeholder="Enter more details"
              name="value"
              id="value"
              value={attribute?.value}
              multiline
              rows={4}
              onChange={(e) => {
                handleKeyattributeChange(index, "value", e.target.value);
                formik.setFieldValue(
                  `keyattribute[${index}].value`,
                  e.target.value
                );
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.keyattribute?.[index]?.value &&
                Boolean(formik.errors.keyattribute?.[index]?.value)
              }
              helperText={
                formik.touched.keyattribute?.[index]?.value &&
                formik.errors.keyattribute?.[index]?.value
              }
              fullWidth
              margin="normal"
            />

            <IconButton
              className="hover:bg-[#f5ebeb]"
              onClick={() => handleRemoveKeyattribute(index)}
            >
              <Trash04 className="text-[#D92D20]" />
            </IconButton>
          </div>
        ))}
      </div>
      <Button
        variant="outlined"
        size="small"
        className="capitalize"
        type="button"
        onClick={handleAddKeyattribute}
      >
        Add Keyattribute
      </Button>
    </section>
  );
};

export default ProductKeyattribute;
