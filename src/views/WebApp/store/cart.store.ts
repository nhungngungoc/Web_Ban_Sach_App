import { cartServiceApi } from "@/service/cart.api";
import { defineStore } from "pinia";
import { IAddCart, ICart, IUpdateCart } from "../interface/cart.interface";
import { ref } from "vue";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/common/helper/helpers";

export const userCartSotore = defineStore("userCartSotore", () => {
  const addCartVM = ref<IUpdateCart>({
    Id: "",
    ProductId: "",
    Quantity: "1",
  });
  const soLuongSanPham = ref<number>();
  const totalGia = ref<number>();
  const carts = ref<ICart[]>([]);

  //action
  const setProductIdAddCartVM = (value: string) => {
    addCartVM.value.ProductId = value;
  };
  const setQuantity = (value: string) => {
    addCartVM.value.Quantity = value;
  };
  const setId = (value: string) => {
    addCartVM.value.Id = value;
  };
  async function addCart(dto = addCartVM.value) {
    const res = await cartServiceApi.addCart(dto);
    if (res.success) {
      showSuccessNotification(res.message);
    } else {
      showErrorNotification(res.message);
    }
  }
  async function getCarts() {
    const res: any = await cartServiceApi.getCart();
    if (res.success) {
      carts.value = res.data;
      totalGia.value = res.data.reduce(
        (total: number, product: any) =>
          total + product.price * product.quantity,
        0
      );
      soLuongSanPham.value = res.data.length;
    }
  }
  async function deleteCart(id: string) {
    const res: any = await cartServiceApi._delete(id);
    if (res.success) {
      showSuccessNotification(res.message);
    } else {
      showErrorNotification(res.message);
    }
  }
  return {
    addCartVM,
    addCart,
    getCarts,
    carts,
    deleteCart,
    soLuongSanPham,
    totalGia,
    actions: {
      setProductIdAddCartVM,
      setQuantity,
      setId,
    },
  };
});
