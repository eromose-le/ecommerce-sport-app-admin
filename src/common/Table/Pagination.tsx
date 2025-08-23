import { useQueryParam } from "@/hooks/useQueryParam";
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
import { FC, useEffect } from "react";

export const Pagination: FC<{
  table: ReturnType<typeof useReactTable>;
  setPageSize: (size: number) => void;
}> = ({ table, setPageSize }) => {
  const { set, get, remove } = useQueryParam();

  // Sync table pageIndex with query param on mount
  useEffect(() => {
    const pageFromQuery = Number(get("page")) || 1;
    if (pageFromQuery > 0 && pageFromQuery <= table.getPageCount()) {
      table.setPageIndex(pageFromQuery - 1); // react-table is 0-based
    }
  }, []);

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  const handlePrevious = () => {
    if (currentPage > 1) {
      table.previousPage();
      const newPage = currentPage - 1;
      if (newPage === 1) {
        remove(["page", "limit"]);
      } else {
        set({ page: newPage });
      }
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      table.nextPage();
      set({ page: currentPage + 1 });
    }
  };

  return (
    <div className="mt-8">
      <Divider />
      <div className="flex items-center justify-between py-4">
        <Button
          variant="ghost"
          startIcon={<ArrowLeft width={20} height={20} />}
          className="capitalize font-bold font-inter"
          size="small"
          onClick={handlePrevious}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <div className="flex items-center gap-1">
          Page
          <span className="font-medium text-sm font-inter text-[#039855] bg-[#ECFDF3] w-10 h-10 flex items-center justify-center rounded-full p-4">
            {currentPage}
          </span>
          of
          <span className="font-medium text-sm font-inter text-[#667085] w-10 h-10 flex items-center justify-center rounded-full p-4">
            {totalPages}
          </span>
          <FormControl>
            <InputLabel id="select-label"></InputLabel>
            <Select
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
          onClick={handleNext}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
