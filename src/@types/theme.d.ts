import * as createPalette from "@mui/material/styles/createPalette";
import { type PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    purple: Palette["primary"];
    maize: maize["primary"];
    yellow: yellow["primary"];
    pink: pink["primary"];
    richEBlue: richEBlue["primary"];
    carolinaBlue: carolinaBlue["primary"];
    malachite: carolinaBlue["primary"];
  }
  interface PaletteColor {
    lighter?: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
  }

  interface PaletteOptions {
    purple?: PaletteColorOptions;
    maize?: PaletteColorOptions;
    yellow?: PaletteColorOptions;
    pink?: PaletteColorOptions;
    richEBlue?: PaletteColorOptions;
    carolinaBlue?: PaletteColorOptions;
    malachite?: PaletteColorOptions;
  }
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    "2xl": true;
    "3xl": true;
  }
  interface TypographyVariants {
    body3: React.CSSProperties;
    small: React.CSSProperties;
    link: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    small?: React.CSSProperties;
    link?: React.CSSProperties;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    ghost: true;
    link: true;
    "contained-error": true;
    "outlined-error": true;
    linkSecondary: true;
    containedSuccess: true;
    containedInfo: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonOwnProps {
    variant?: "filled" | "outlined" | "default";
    shape?: "square" | "default";
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    outlinedOpaque: true;
    outlinedBox: true;
    soft: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body3: true;
    small: true;
    h4: true;
    h5: true;
    h6: true;
    link: true;
  }
}

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    mobile: false; // adds the `mobile` breakpoint
    tablet: false;
    laptop: false;
    desktop: false;
  }
}
