import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useReactTable } from "@tanstack/react-table";
import { ArrowLeft, ArrowRight } from "@untitled-ui/icons-react";
import { FC } from "react";

export const Pagination: FC<{
  table: ReturnType<typeof useReactTable>;
  setPageSize: (size: number) => void;
}> = ({ table, setPageSize }) => {
  return (
    <>
      <div className="mt-8">
        <Divider />
        <div className="flex items-center justify-between py-4">
          <Button
            variant="ghost"
            startIcon={<ArrowLeft width={20} height={20} />}
            className="capitalize font-bold font-inter"
            size="small"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            Page
            <span className="font-medium text-sm font-inter text-[#039855] bg-[#ECFDF3] w-10 h-10 flex items-center justify-center rounded-full p-4">
              {table.getState().pagination.pageIndex + 1}
            </span>
            of
            <span className="font-medium text-sm font-inter text-[#667085] w-10 h-10 flex items-center justify-center rounded-full p-4">
              {table.getPageCount()}
            </span>
            <FormControl className="">
              <InputLabel id="select-label"></InputLabel>
              <Select
                sx={{}}
                size="small"
                className="text-primary-main font-inter font-bold text-sm"
                labelId="select-label"
                value={table.getState().pagination.pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                renderValue={(selected) => `Show ${selected}`}
              >
                {[10, 20, 30, 40, 50].map((size) => (
                  <MenuItem key={size} value={size}>
                    Show {size}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText></FormHelperText>
            </FormControl>
          </div>

          <Button
            variant="ghost"
            endIcon={<ArrowRight width={20} height={20} />}
            className="capitalize font-bold font-inter"
            size="small"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};
