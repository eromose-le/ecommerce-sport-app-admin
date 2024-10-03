declare module "@ckeditor/ckeditor5-react";
declare module "*.mp3";
declare module "@paystack/inline-js";
declare module "*.svg" {
  import React = require("react");

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const src: string;
  export default src;
}

declare module "react-dropzone";