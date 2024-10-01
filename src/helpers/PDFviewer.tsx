import { FC } from "react";

interface PDFViewerProps {
  url: string | null;
}
const PDFViewer: FC<PDFViewerProps> = ({ url }) => {
  return (
    <div>
      <div>
        {url ? (
          <iframe
            className="w-full h-[calc(100vh-210.5px)] mt-4"
            src={url}
          />
        ) : null}
      </div>
    </div>
  );
};
export default PDFViewer;
