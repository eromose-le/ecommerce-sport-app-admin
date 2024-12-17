import BackButton from "@/common/BackButton";
import { LoadingButton } from "@mui/lab";
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { X, User01  } from "@untitled-ui/icons-react";
import { FC } from "react";
interface ProductDetailProps {}
const ProductDetail: FC<ProductDetailProps> = () => {
  return (
    <>
      {" "}
      <>
        <div className="container-wrapper py-[30px] h-[calc(100vh-118.5px)]">
          <div className="flex items-center justify-between">
            <div>
              <BackButton />
            </div>
          </div>

          <div className="flex items-center justify-between mt-7">
            <Typography
              color="grey.900"
              className="font-bold text-2xl font-crimson"
            >
              Product Details Summary
            </Typography>

            <LoadingButton
              // disabled={!isValid}
              // loading={cancelTourResult.isLoading}
              // onClick={() => formikCancel.handleSubmit()}
              startIcon={<X width={20} height={20} />}
              className="text-[#B42318] font-semibold text-sm capitalize border-none"
              variant="outlined-error"
              size="small"
              type="button"
            >
              Delete Product
            </LoadingButton>
          </div>

          {false ? (
            <div>Loading...</div>
          ) : (
            <form className="mt-10 space-y-10">
              <Box>
                <Typography className="text-[#1D2939] font-bold text-xs font-inter uppercase">
                  USER INFORMATION
                </Typography>

                <div className="grid grid-cols-3 mt-4 gap-4 gap-y-8">
                  <div className="flex flex-col space-y-1">
                    <Typography
                      color="grey.700"
                      component="label"
                      className="font-medium text-sm font-inter capitalize"
                      htmlFor="firstName"
                    >
                      <span className="text-[#D92D20] text-sm font-medium font-inter mr-1">
                        *
                      </span>
                      Full Name
                    </Typography>
                    <TextField
                      disabled
                      className="MuiTextFieldOutlined--plain capitalize"
                      placeholder="Enter First Name"
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={"clientName"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="end">
                            <IconButton className="m-0 -ml-3 flex items-center justify-center">
                              <User01
                                width={20}
                                height={20}
                                className="text-[#98A2B3]"
                              />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      margin="normal"
                    />
                  </div>
                </div>
              </Box>

              <div className="mt-10 space-x-3">
                <Button
                  // disabled={!isValid}
                  // onClick={gotoUpdateOrCreateTour}
                  className="capitalize font-semibold text-base font-inter md:px-10"
                  variant="ghost"
                  size="medium"
                >
                  Go back
                </Button>

                <LoadingButton
                  // disabled={!isValid}
                  // loading={approveTourResult.isLoading}
                  // onClick={() => formikApprove.handleSubmit()}
                  className="capitalize font-semibold text-base font-inter md:px-10"
                  variant="contained"
                  size="medium"
                  type="button"
                >
                  Go back
                </LoadingButton>
              </div>
            </form>
          )}
        </div>
      </>
    </>
  );
};

export default ProductDetail;
