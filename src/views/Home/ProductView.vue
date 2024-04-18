<template>
  <v-card class="custom-shadow">
    <v-row class="mr-3 ml-3 mt-1">
      <v-col class="d-flex flex-column justify-center align-center" v-for="item in products" :key="item" cols="12"
        sm="6" md="4" lg="3">
        <v-card hover variant="flat" style="min-height: 472px;width: 250px;" class="mb-3 my-card">
          <v-img class="mx-auto mt-2" width="220px" height="224px" :src="item.image" alt="Product Image"></v-img>
          <v-card-text class="my-card-text"
            style="max-width: 227px;font-size: 16px;line-height: 24px; height: 65px;font-family: 'Inter', sans-serif;color: #19191D;">{{
              item.tenSP }}</v-card-text>
          <v-card-text class="mt-2 mx-auto"
            style="font-family: 'Inter', sans-serif;color:#000000;max-width: 250px;font-size: 24px;font-weight: 700;padding: auto;height: 36px;">
            {{ formatNumberWithCommas(item.gia) }}
            <span
              style="border-radius: 4px;margin-right: 0.7%;font-size: 12px;float: right;min-width: 70px;min-height: 24px;padding: 2px;background-color: #FDEDF2;text-align: center;color: #C23564;font-weight: 300;font-family: Roboto;">
              Cool deal!
            </span>
          </v-card-text>
          <p class="ml-4 text-truncate"
            style="margin-top: 8px;height: 41px;font-size: 14px;font-family: 'Inter', sans-serif;color: #787885;">{{
              item.moTa }}</p>
          <v-row style="margin-top: 5px;margin-left: -6px;">
            <v-col class="ml-3 mt-1" cols="5" style="display: flex;">
              <v-icon color="amber" size="x-small">mdi mdi-star</v-icon>
              <v-icon color="amber" size="x-small">mdi mdi-star</v-icon>
              <v-icon color="amber" size="x-small">mdi mdi-star</v-icon>
              <v-icon color="amber" size="x-small">mdi mdi-star</v-icon>
              <v-icon v-if="item.feedback < 5 && item.feedback > 4" color="amber" size="x-small">mdi
                mdi-star-half</v-icon>
              <v-icon v-else color="amber" size="x-small">mdi mdi-star</v-icon>
              <span style="font-size: 12px;">4.05</span>
            </v-col>
            <v-col class="text-right" cols="6">
              <v-btn class="text-capitalize" style="margin-right: 6px;font-family: 'Inter', sans-serif;font-size: 14px;"
                color="primary" size="small" prepend-icon="mdi-heart-outline" variant="outlined">
                Watch
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
  <div class="d-flex justify-space-between " style="margin-top: 40px;margin-bottom: 10px;">
    <v-card class="pa-5 d-flex flex-column justify-center align-center rounded-1"
      style="min-height: 156px; background-color: #EDEDF0; width: 32%;">
      <img width="80" height="80" :src="footer1">
      <v-card-title class="text-center"
        style="font-family: Quicksand,sans-serif;font-weight: 700;font-size: 20px;">Clear & Usable user
        flows</v-card-title>
      <v-card-subtitle class="text-center" style="font-family: 'Inter', sans-serif;font-size: 14px;">Let’s boost your
        marketplace</v-card-subtitle>
    </v-card>
    <v-card class="pa-5 d-flex flex-column justify-center align-center rounded-1"
      style="min-height: 156px; background-color: #EDEDF0; width: 32%;">
      <img width="80" height="80" :src="footer2">
      <v-card-title class="text-center" style="font-family: Quicksand,sans-serif;font-weight: 700;font-size: 20px;">Fine
        & Styled components</v-card-title>
      <v-card-subtitle class="text-center" style="font-family: 'Inter', sans-serif;font-size: 14px;">Speed up with
        Setproduct templates</v-card-subtitle>
    </v-card>
    <v-card class="pa-5 d-flex flex-column justify-center align-center rounded-1"
      style="min-height: 156px; background-color: #EDEDF0; width: 32%;">
      <img width="80" height="80" :src="footer3">
      <v-card-title class="text-center"
        style="font-family: Quicksand,sans-serif;font-weight: 700;font-size: 20px;">Customizable &
        Reusable</v-card-title>
      <v-card-subtitle class="text-center" style="font-family: 'Inter', sans-serif;font-size: 14px;">Take our UX
        patterns and rebuild</v-card-subtitle>
    </v-card>
  </div>
</template>

<script setup>
import { formatNumberWithCommas } from "@/common/helper/helpers"
import { onBeforeMount } from "vue"
import footer1 from "@/assets/footer1.png"
import footer2 from "@/assets/footer2.png"
import footer3 from "@/assets/footer3.png"
import { useProductStore } from './store/product.store'
import { storeToRefs } from "pinia"

const productStore = useProductStore()
const { fetchProduct } = productStore
const { products } = storeToRefs(productStore);
onBeforeMount(async () => {
  await fetchProduct()
})
</script>

<style>
.custom-shadow {
  margin-top: 10px;
  border-radius: 4px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
}

.my-card {
  max-height: 200px;
  /* Đặt chiều cao tối đa của thẻ */
  overflow: hidden;
  /* Ẩn phần nội dung vượt quá chiều cao */
}

.my-card-text {
  overflow-y: hidden;
}
</style>