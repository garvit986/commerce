import localforage from "localforage";
import { Product } from "../Types/Types";

export const saveProduct = async (product: Product) => {
  try {
    await localforage.setItem(`product-${product.id}`, product);
  } catch (err) {
    console.error("Error saving product:", err);
  }
};

export const getProduct = async () => {
  try {
    const products: Product[] = [];
    await localforage.iterate<Product, void>((product, key) => {
      if (key.startsWith("product-")) products.push(product);
    });
    return products;
  } catch (err) {
    console.error("Error getting all products:", err);
    return [];
  }
};

export const removeProduct = async (id: number) => {
  try {
    await localforage.removeItem(`product-${id}`);
  } catch (error) {}
};

export const getTotalCost = (products: Product[]): number => {
  return products.reduce((total, product) => total + product.price, 0);
};
