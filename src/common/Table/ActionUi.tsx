import { TextField, InputAdornment, IconButton, Button } from "@mui/material";
import { FilterLines, SearchLg, Share01 } from "@untitled-ui/icons-react";

const ActionUi = () => {
  return (
    <div className="flex items-center gap-3 mt-4">
      <TextField
        className="MuiTextFieldOutlined--plain max-w-[480px] mr-auto"
        placeholder="Search by Client name, ID and others..."
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchLg className="text-[#101828]" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="ghost"
        startIcon={<FilterLines width={20} height={20} />}
        className="capitalize font-bold font-inter"
        size="medium"
      >
        Filter
      </Button>
      <Button
        variant="outlined"
        startIcon={<Share01 width={20} height={20} />}
        className="capitalize font-bold font-inter"
        size="medium"
      >
        Export
      </Button>
    </div>
  );
};

export default ActionUi;
