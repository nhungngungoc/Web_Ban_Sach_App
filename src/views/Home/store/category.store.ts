import { defineStore } from "pinia";
import { ICategory } from "../interface/category.interface";
import { ref } from "vue";
import { categoryServiceApi } from "@/service/category.api";

export const useCategoryStore = defineStore("category", () => {
  const categorys = ref<ICategory[]>([]);

  async function getAllCategory() {
    const res = await categoryServiceApi.getAllNoQuery();
    categorys.value = res.data;
  }
  return {
    categorys,
    getAllCategory,
    // actions: {
    // },
  };
});
