import { computed, onMounted, reactive, ref } from "vue";
import { categoryServiceApi } from "@/service/category.api";
import { DEFAULT_COMMON_LIST_QUERY } from "@/common/contant/contants";
import { ICategory } from "./interface";
import { useLoadingStore } from "@/store/loading";
import { logout } from "@/plugins/axios";
export const useCategory = () => {
    const loading=useLoadingStore()
    const products = ref<ICategory[]>([])
    const query=DEFAULT_COMMON_LIST_QUERY
    const fetchProducts = async () => {
      try {
        loading.setLoading(true)
        const res = await categoryServiceApi._getList<ICategory>(query);
        console.log(res)
        // if(res.status===419)
        //   logout()
        if(res.success)
          return {
            data:res.data.items,
            totalItems:res.data.totalItems
          }
        return null
      } catch (error) {
        console.error('Error fetching products:', error);
        return null
      }finally{
        loading.setLoading(false)
      }
    };
    const searchProducts = async () => {
      try {
        loading.setLoading(true)
        const res = await categoryServiceApi._getList<ICategory>(query);
        if(res.status===419)
          logout()
        if(res.success)
            return {
              data:res.data.items,
              totalItems:res.data.totalItems
            }
        return null
      } catch (error) {
        console.error('Error fetching products:', error);
        return null
      }finally{
        loading.setLoading(false)
      }
    };
  return {
    products,
    fetchProducts,
    query,
    searchProducts,
  };
};
