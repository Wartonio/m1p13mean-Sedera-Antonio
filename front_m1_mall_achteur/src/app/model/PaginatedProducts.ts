import { Product } from "./product";

export interface PaginatedProducts {
  data: Product[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}