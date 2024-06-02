import { dashboardServiceApi } from "@/service/dashboard.api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDashboardStore = defineStore("useDashboardStore", () => {
  const countProduct = ref<number>(0);
  const countUser = ref<number>(0);
  const countOrder = ref<number>(0);
  const doanhThuHomNay = ref<number>(0);
  const doanhThuTuanNay = ref<any[]>([]);

  async function getDashboard() {
    const res: any = await dashboardServiceApi.getDashboard();
    if (res.success) {
      countOrder.value = res.data.countOrder;
      countProduct.value = res.data.countProduct;
      countUser.value = res.data.countUser;
      doanhThuHomNay.value = res.data.doanhThuHomNay;
      doanhThuTuanNay.value = res.data.list;
    }
  }
  return {
    countOrder,
    countProduct,
    countUser,
    doanhThuHomNay,
    doanhThuTuanNay,

    getDashboard,
  };
});
