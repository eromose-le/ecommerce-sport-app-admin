import { Button, Divider } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@untitled-ui/icons-react";

const PaginationV1 = () => {
  return (
    <div className="mt-8">
      <Divider />
      <div className="flex items-center justify-between py-4">
        <Button
          variant="ghost"
          startIcon={<ArrowLeft width={20} height={20} />}
          className="capitalize font-bold font-inter"
          size="small"
        >
          Previous
        </Button>
        <div className="flex items-center gap-1">
          <span className="font-medium text-sm font-inter text-[#039855] bg-[#ECFDF3] w-10 h-10 flex items-center justify-center rounded-full p-4">
            1
          </span>
          <span className="font-medium text-sm font-inter text-[#667085] w-10 h-10 flex items-center justify-center rounded-full p-4">
            2
          </span>
          <span className="font-medium text-sm font-inter text-[#667085] w-10 h-10 flex items-center justify-center rounded-full p-4">
            3
          </span>
          <span className="font-medium text-sm font-inter text-[#667085] w-10 h-10 flex items-center justify-center rounded-full p-4">
            ...
          </span>
          <span className="font-medium text-sm font-inter text-[#667085] w-10 h-10 flex items-center justify-center rounded-full p-4">
            8
          </span>
          <span className="font-medium text-sm font-inter text-[#667085] w-10 h-10 flex items-center justify-center rounded-full p-4">
            9
          </span>
          <span className="font-medium text-sm font-inter text-[#667085] w-10 h-10 flex items-center justify-center rounded-full p-4">
            10
          </span>
        </div>
        <Button
          variant="ghost"
          endIcon={<ArrowRight width={20} height={20} />}
          className="capitalize font-bold font-inter"
          size="small"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginationV1;
