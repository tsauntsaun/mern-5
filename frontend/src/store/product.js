import { create } from "zustand";
import axios from "axios";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await axios.post("/api/products", newProduct);
      set((state) => ({ products: [...state.products, res.data.data] }));
      return { success: true, message: "Product created successfully." };
    } catch (error) {
      console.error("Error creating product", error);
      return { success: false, message: "Failed to create product" };
    }
  },
  fetchProducts: async () => {
    try {
      const res = await axios.get("/api/products");
      set({ products: res.data.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  deleteProduct: async (pid) => {
    try {
      const { data } = await axios.delete(`/api/products/${pid}`);
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error deleting product", error);
      return { success: false, message: "Failed to delete product" };
    }
  },
  updateProduct: async (pid, updatedProduct) => {
    try {
      const { data } = await axios.put(`/api/products/${pid}`, updatedProduct);

      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? { ...product, ...updatedProduct } : product
        ),
      }));

      return { success: true, message: "Product updated successfully." };
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: "Failed to update product" };
    }
  },
}));
