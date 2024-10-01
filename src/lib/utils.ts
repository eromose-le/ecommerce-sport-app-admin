import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type LinkCategory = {
  [key: string]: string[];
};

export type LinkObject = {
  id: number;
  name: string;
  path: string;
};

export type NavLinksObject = {
  Company: LinkObject[];
  Support: LinkObject[];
  Legal: LinkObject[];
};

export function generateLinkObjectArray(structure: LinkCategory): LinkObject[] {
  let idCounter = 1;

  return Object.entries(structure).flatMap(([category, items]) =>
    items.map((item) => ({
      id: idCounter++,
      name: item,
      path: `/${category.toLowerCase()}/${item
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
    }))
  );1
}
