import {
  DEFAULT_FIRST_PAGE,
  DEFAULT_LIMIT_FOR_PAGINATION,
} from "@/common/contant/contants";
import { ICommonListQuery } from "@/common/interface/interfaces";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { IProduct, IQueryProduct } from "../interface/product.interface";
import { productServiceApi } from "@/service/product.api";

export const useProductStore = defineStore("product", () => {
  const query: IQueryProduct = reactive({
    page: DEFAULT_FIRST_PAGE,
    limit: 12,
    keyword: undefined,
    orderBy: "CreateAt",
    categoryId: undefined,
  });
  const products = ref<IProduct[]>([]);

  async function fetchProduct() {
    const res: any = await productServiceApi._getList(query);
    products.value = res.data.items;
  }

  //actions
  const setKeywordQuey = (value: string) => {
    query.keyword = value;
  };
  const setCategoryIdQuery = (value: string) => {
    query.categoryId = value;
  };
  return {
    query,
    products,
    fetchProduct,
    actions: {
      setKeywordQuey,
      setCategoryIdQuery,
    },
  };
});
