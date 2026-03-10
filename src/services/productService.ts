import axios from 'axios';
import { Product, PaginatedResponse } from '../types/product';

const API_BASE_URL = `${import.meta.env.VITE_API_URL || ''}/api/products`;

export const ProductService = {
  getProducts: async (q?: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<Product>> => {
    const response = await axios.get(API_BASE_URL, {
      params: { q, page, limit }
    });
    return response.data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  createProduct: async (product: Partial<Product>): Promise<Product> => {
    const response = await axios.post(API_BASE_URL, product);
    return response.data;
  },

  updateProduct: async (id: string, product: Partial<Product>): Promise<Product> => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, product);
    return response.data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  }
};
