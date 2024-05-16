import { defineStore } from "pinia";
import { tinhServiceApi } from "@/service/tinh.api";
import { huyenServiceApi } from "@/service/huyen.api";
import { xaServiceApi } from "@/service/xa.api";
import { ref } from "vue";
import { TypePay } from "@/common/contant/contants";
interface commonSelecte {
  text: string;
  value: string;
  loai?: string;
}
export const useThanhToanStore = defineStore("useThanhToanStore", () => {
  const listTinh = ref<commonSelecte[]>([]);
  const listHuyen = ref<commonSelecte[]>([]);
  const listXa = ref<commonSelecte[]>([]);
  const typePay = ref<string>();
  async function getAllTinh() {
    const { data } = await tinhServiceApi.getAll();
    listTinh.value = data.map((item: any) => {
      return {
        text: item.tenTinh,
        value: item.maTinh,
        loai: item.loai,
      };
    });
  }
  async function getAllHuyen(maTinh: string) {
    const { data } = await huyenServiceApi.getAll(maTinh);
    listHuyen.value = data.map((item: any) => {
      return {
        text: item.tenHuyen,
        value: item.maHuyen,
        loai: item.loai,
      };
    });
  }
  async function getAllXa(maHuyen: string) {
    const { data } = await xaServiceApi.getAll(maHuyen);
    listXa.value = data.map((item: any) => {
      return {
        text: item.tenXa,
        value: item.maXa,
        loai: item.loai,
      };
    });
  }
  function setTypePay(value: TypePay) {
    typePay.value = value;
  }
  return {
    getAllTinh,
    getAllHuyen,
    getAllXa,
    listTinh,
    setTypePay,
    listHuyen,
    listXa,
    typePay,
  };
});
