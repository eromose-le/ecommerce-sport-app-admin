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
import ReusableModal from "@/common/Modal";

export default function ProductAddToTeamModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const customStyle = {
    width: 515,
    borderRadius: "12px",
    p: 4,
  };

  const [value, setValue] = useState<string | null>(null);
  const options = ["HR", "Developer", "Marketer"];

  const iconSection = (
    <IconButton className="bg-[#eafff1] flex items-center justify-center">
      <UserPlus02
        width={50}
        height={50}
        className="text-[#039855] bg-[#D1FADF] rounded-full p-3 flex items-center justify-center"
      />
    </IconButton>
  );

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
            deleteIcon={<X color="000" />}
            label="Omotoyosiola Samson"
            onDelete={handleClose}
            avatar={<Avatar src="/static/images/avatar/1.jpg" />}
          />
        </div>
      </div>

      <div>
        <Autocomplete
          options={options}
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          // popupIcon={null}
          popupIcon={<ChevronDown />}
          componentsProps={{
            paper: {
              sx: {
                ".MuiAutocomplete-hasPopupIcon & .MuiOutlinedInput-root": {
                  paddingRight: "0px !important",
                },
                bgcolor: "#fff",
                border: "1px solid #D0D5DD",
                borderRadius: "8px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                mt: 1,
                p: 1,
              },
            },
          }}
          renderOption={(props, option) => {
            const { key, ...rest } = props;
            return (
              <li
                key={key}
                {...rest}
                className="py-3 px-4 hover:bg-gray-50 font-inter text-sm cursor-pointer"
              >
                {option}
              </li>
            );
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
              }}
            />
          )}
        />
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
      <Button
        disabled={!value}
        className="capitalize font-bold font-inter text-base"
        fullWidth
        size="medium"
        variant="contained"
      >
        Assign
      </Button>
    </div>
  );

  return (
    <ReusableModal
      customStyle={customStyle}
      triggerSection={
        <div className="flex items-center justify-start gap-2 py-3 px-4 hover:bg-slate-50 cursor-pointer">
          <User03 width={20} height={20} />
          <Typography
            color="grey.700"
            className="text-xs font-inter font-medium"
          >
            Add to a team
          </Typography>
        </div>
      }
      iconSection={iconSection}
      contentSection={contentSection}
      buttonSection={buttonSection}
      handleClose={handleClose}
      handleOpen={handleOpen}
      open={open}
      // disableBackdropClick={false}
    />
  );
}
