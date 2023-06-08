import { api, PRODUCT_API } from "@/config/api";

export const productService = {
  getProduct(query = "") {
    return api.get(`${PRODUCT_API}/product?${query}`);
  },
  getCategories() {
    return api.get(`${PRODUCT_API}/product/categories`);
  },
  getCategoryDetail(id) {
    return api.get(`${PRODUCT_API}/categories/${id}`);
  },
};
