
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton/IconButton";
import {
  ChevronDown,
  SearchLg,
  User03,
  UserPlus02,
  X,
} from "@untitled-ui/icons-react";
import {
  Autocomplete,
  Avatar,
  Chip,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";

// Styling Section
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  borderRadius: "12px",
  bgcolor: "background.paper",
  border: "1px solid #10182808",
  boxShadow: 24,
  shadows: "box-shadow: 0px 8px 8px -4px",
  p: 4,
};

export default function Modals() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const [status, setStatus] = useState<string | null>(null);
  const statusOptions = ["Hr", "Developer", "Marketer"];

  return (
    <>
      {/* Trigger Section */}
      <div onClick={handleOpen}>
        <div className="flex items-center justify-start gap-2 py-3 px-4 hover:bg-slate-50 cursor-pointer">
          <User03 width={20} height={20} />
          <Typography
            color="grey.700"
            className="text-xs font-inter font-medium"
          >
            Add to a team
          </Typography>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="space-y-5">
            {/* Icon Section */}
            <IconButton className="bg-[#eafff1] flex items-center justify-center">
              <UserPlus02
                width={50}
                height={50}
                className="text-[#039855] bg-[#D1FADF] rounded-full p-3 flex items-center justify-center"
              />
            </IconButton>

            {/* Content Section */}
            <>
              <div>
                <Typography
                  color="grey.900"
                  className="font-crimson text-3xl font-bold"
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Assign a Role
                </Typography>

                <div className="flex items-center justify-start gap-3">
                  <Typography
                    color="grey.600"
                    className="flex items-center justify-center font-inter text-sm font-normal"
                    id="transition-modal-title"
                    variant="h6"
                    component="span"
                  >
                    Select a role to assign
                  </Typography>
                  <Chip
                    deleteIcon={<X />}
                    icon={
                      <UserPlus02
                        width={20}
                        height={20}
                        className="text-[#039855] bg-[#D1FADF] rounded-full p-1"
                      />
                    }
                    label="Omotoyosiola Samson"
                    onDelete={handleDelete}
                    avatar={<Avatar src="/static/images/avatar/1.jpg" />}
                  />
                </div>
              </div>

              <div>
                <Autocomplete
                  options={statusOptions}
                  value={status}
                  onChange={(_, newValue) => setStatus(newValue)}
                  popupIcon={null}
                  componentsProps={{
                    paper: {
                      sx: {
                        ".MuiAutocomplete-hasPopupIcon & .MuiOutlinedInput-root":
                          {
                            paddingRight: "0px !important", // Remove padding
                          },
                      },
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Select from existing roles"
                      size="small"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchLg width={20} height={20} />
                          </InputAdornment>
                        ),
                        sx: { paddingRight: 0 },
                        endAdornment: (
                          <>
                            {params.InputProps.endAdornment}
                            <InputAdornment
                              position="end"
                              style={{ cursor: "pointer" }}
                            >
                              <ChevronDown />
                            </InputAdornment>
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </div>
            </>

            {/* Button Section */}
            <div className="flex items-center justify-between gap-3 pt-3">
              <Button fullWidth size="medium" variant="ghost">
                Cancel
              </Button>
              <Button fullWidth size="medium" variant="contained">
                Assign
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
