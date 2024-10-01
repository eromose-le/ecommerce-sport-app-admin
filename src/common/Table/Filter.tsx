import { Button, Typography, Popover, Checkbox } from "@mui/material";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { FilterLines } from "@untitled-ui/icons-react";
import { FC } from "react";

const Filter: FC<{
  isDeleted: boolean | undefined;
  setIsDeleted: (value: boolean | undefined) => void;
  isRequestDelete: boolean | undefined;
  setIsRequestDelete: (value: boolean | undefined) => void;
}> = ({ isDeleted, setIsDeleted, isRequestDelete, setIsRequestDelete }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRequestDelete(e.target.checked);
  };

  const handleIsDeletedCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsDeleted(e.target.checked);
  };
  return (
    <>
      <PopupState variant="popover" popupId="agent-table">
        {(popupState: any) => (
          <>
            <div className="cursor-pointer p-2" {...bindTrigger(popupState)}>
              <Button
                variant="ghost"
                startIcon={<FilterLines width={20} height={20} />}
                className="capitalize font-bold font-inter"
                size="medium"
              >
                Filter
              </Button>
            </div>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <div className="rounded-tr-md rounded-tl-md w-[170px] py-8 px-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    className="outlined"
                    size="small"
                    name="remember"
                    checked={isRequestDelete}
                    onChange={handleCheckboxChange}
                  />
                  <Typography
                    color="grey.700"
                    className="font-medium text-xs sm:text-sm font-inter"
                  >
                    isRequestDelete
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    className="outlined"
                    size="small"
                    name="remember"
                    checked={isDeleted}
                    onChange={handleIsDeletedCheckboxChange}
                  />
                  <Typography
                    color="grey.700"
                    className="font-medium text-xs sm:text-sm font-inter"
                  >
                    isDeleted
                  </Typography>
                </div>
              </div>
            </Popover>
          </>
        )}
      </PopupState>
    </>
  );
};

export default Filter;
