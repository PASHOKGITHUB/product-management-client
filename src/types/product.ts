export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  sku: string;
  availability: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  totalItems: number;
}
