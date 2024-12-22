export type TProductQuery = {
  limit?: any;
  page?: any;
  q?: string;
  category?: string;
  subcategory?: string;
  stock?: string;
  color?: string[];
  type?: string[];
  size?: string[];
  minPrice?: string;
  maxPrice?: string;
  price?: {
    isCustom: boolean;
    range: [number, number];
  };
  sort?: undefined | "asc" | "desc";

  createdAt?: string | null | undefined;
  updatedAt?: Date | null;
  filter?: {
    limit?: any;
    page?: any;
    category?: string;
    subcategory?: string;
    stock?: string;
    color?: string[];
    type?: string[];
    size?: string[];
    minPrice?: string;
    maxPrice?: string;
    price?: {
      isCustom?: boolean;
      range?: [number, number];
    };
    sort?: undefined | "asc" | "desc";
    createdAt?: string | null | undefined;
    updatedAt?: Date | null;
  };
};


interface Specification {
  [key: string]: string;
}

interface KeyAttribute {
  [key: string]: string;
}

interface Media {
  images: string[];
  type: string;
  displayImage: string;
}

interface Category {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDeleted: boolean;
}

interface Subcategory extends Category {
  categoryId: string;
}

export interface ProductSize {
  id: string;
  productId: string;
  sizeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductColor {
  id: string;
  productId: string;
  colorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  subcategoryId: string;
  specification: Specification[];
  keyattribute: KeyAttribute[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDeleted: boolean;
  displayImage: string;
  medias: Media[];
  category: Category;
  subcategory: Subcategory;
  sizes: ProductSize[];
  colors: ProductColor[];
  types: any[];
  orders: any[];
  reviews: any[];
}
