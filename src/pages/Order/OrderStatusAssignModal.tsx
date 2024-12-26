import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton/IconButton";
import { Edit01 } from "@untitled-ui/icons-react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import ReusableModal from "@/common/Modal";
import useExtendedSnackbar from "@/hooks/useExtendedSnackbar";
import { ApiOrderStoreSlice } from "@/api/ApiOrderStoreSlice";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import DropdownIcon from "@/common/SVG/DropdownIcon";
import useToggle from "@/hooks/useToggle";
import { orderStatusResponse } from "./OrderConstants";
import OrderStatus from "@/common/OrderStatus";
import { ORDER_STATUS } from "@/constants/enums";

interface OrderStatusAssignModalProps {
  id: string;
  buttonText: string;
  status: string;
}

export default function OrderStatusAssignModal({
  id,
  buttonText,
  status,
}: OrderStatusAssignModalProps) {
  const { showSuccessSnackbar, showErrorSnackbar } = useExtendedSnackbar();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isStatusDropdown, toggleIsStatusDropdown, setToggleIsStatusDropdown] =
    useToggle(false);

  const customStyle = {
    width: 515,
    borderRadius: "12px",
    p: 4,
  };

  const [updateOrder, updateOrderResult] =
    ApiOrderStoreSlice.useUpdateOrderMutation();

  const formik = useFormik({
    initialValues: {
      id: id || "",
      status: status || ORDER_STATUS.PENDING,
    },
    onSubmit: async (values) => {
      try {
        const payload = {
          id,
          status: values.status,
        };

        await updateOrder(payload).unwrap();
        showSuccessSnackbar("Successful");
        handleClose();
      } catch (error: any) {
        showErrorSnackbar(error?.data?.message || "Error occurred");
      }
    },
  });

  const iconSection = (
    <IconButton className="bg-[#eafff1] flex items-center justify-center">
      <Edit01
        width={50}
        height={50}
        className="text-[#039855] bg-[#D1FADF] rounded-full p-3 flex items-center justify-center"
      />
    </IconButton>
  );

  const isCanceled = status === ORDER_STATUS.CANCELED;

  const isValid = !(formik.values.id === "" || updateOrderResult.isLoading);

  const isDisableField = !(
    updateOrderResult.isLoading ||
    !isValid ||
    isCanceled
  );

  const handleAssignStatus = () => {
    if (isCanceled) {
      return;
    }
    formik.handleSubmit();
  };

  const contentSection = (
    <>
      <div>
        <Typography
          color="grey.900"
          className="font-crimson text-3xl font-bold"
          id="transition-modal-title"
          variant="h6"
          component="h2"
        >
          Assign Status to this Order
        </Typography>

        <div className="flex items-center justify-start gap-3">
          <Typography
            color="grey.600"
            className="flex items-center justify-center font-inter text-sm font-normal normal-case"
            id="transition-modal-title"
            variant="h6"
            component="span"
          >
            Update order status
          </Typography>
          <OrderStatus status={status} />
        </div>
      </div>

      <div className="flex flex-col space-y-1 col-span-2 md:col-span-1">
        <Typography
          color="grey.700"
          component="label"
          className="font-medium text-sm font-inter capitalize"
          htmlFor="status"
        >
          <span className="text-[#D92D20] text-sm font-medium font-inter mr-1">
            *
          </span>
          Status
        </Typography>
        <FormControl fullWidth margin="normal">
          <Select
            disabled={!isDisableField}
            displayEmpty
            variant="outlined"
            className="MuiTextFieldOutlined--plain text-sm capitalize font-inter"
            id="status"
            name="status"
            value={formik.values.status}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.status && Boolean(formik.errors.status)}
            IconComponent={() => (
              <div className="p-2">
                <DropdownIcon
                  toggle={toggleIsStatusDropdown}
                  isOpen={isStatusDropdown}
                />
              </div>
            )}
            open={isStatusDropdown}
            onOpen={() => setToggleIsStatusDropdown(true)}
            onClose={() => setToggleIsStatusDropdown(false)}
            renderValue={(selected) => {
              if (selected === "") {
                return (
                  <span className="text-sm text-gray-400 font-medium normal-case">
                    --Select Order Status--
                  </span>
                );
              }
              return orderStatusResponse?.find(
                (status: any) => status.name === selected
              )?.name;
            }}
          >
            {orderStatusResponse?.map((status: any) => (
              <MenuItem
                className="text-sm capitalize font-inter"
                key={status?.id}
                value={status?.name}
              >
                <OrderStatus status={status?.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );

  const buttonSection = (
    <div className="flex items-center justify-between gap-3 pt-3">
      <Button
        className="capitalize font-bold font-inter text-base"
        fullWidth
        size="medium"
        variant="ghost"
        onClick={handleClose}
      >
        Cancel
      </Button>

      <LoadingButton
        disabled={!isValid || !isDisableField}
        loading={updateOrderResult.isLoading}
        className="capitalize font-bold font-inter text-base"
        fullWidth
        size="medium"
        variant="contained"
        onClick={handleAssignStatus} // Submit form on click
        type="button"
      >
        Assign
      </LoadingButton>
    </div>
  );

  return (
    <ReusableModal
      customStyle={customStyle}
      triggerSection={
        <div className="flex items-center justify-start gap-2 py-3 px-4 hover:bg-slate-50 cursor-pointer">
          <Edit01 width={20} height={20} />
          <Typography
            color="grey.700"
            className="text-xs font-inter font-medium"
          >
            {buttonText ? buttonText : "Assign to Agent"}
          </Typography>
        </div>
      }
      iconSection={iconSection}
      contentSection={contentSection}
      buttonSection={buttonSection}
      handleClose={handleClose}
      handleOpen={handleOpen}
      open={open}
    />
  );
}
