import { cartServiceApi } from "@/service/cart.api";
import { defineStore } from "pinia";
import { IAddCart } from "../interface/cart.interface";
import { ref } from "vue";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/common/helper/helpers";

export const userCartSotore = defineStore("userCartSotore", () => {
  const addCartVM = ref<IAddCart>({
    ProductId: "",
    Quantity: "1",
  });

  //action
  const setProductIdAddCartVM = (value: string) => {
    addCartVM.value.ProductId = value;
  };
  async function addCart(dto = addCartVM.value) {
    const res = await cartServiceApi.addCart(dto);
    console.log(res);

    if (res.success) {
      showSuccessNotification(res.message);
    } else {
      showErrorNotification(res.message);
    }
  }
  return {
    addCartVM,
    addCart,
    actions: {
      setProductIdAddCartVM,
    },
  };
});
