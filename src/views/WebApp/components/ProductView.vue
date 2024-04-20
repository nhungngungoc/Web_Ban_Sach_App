<template>
    <v-card class="custom-shadow">
        <v-row class="mr-3 ml-3 mt-1">
            <v-col class="d-flex flex-column justify-center align-center" v-for="item in products" :key="item" cols="12"
                sm="6" md="4" lg="3">
                <v-card hover variant="flat" style="min-height: 472px;width: 250px;" class="mb-3 my-card">
                    <v-img class="mx-auto mt-2" width="220px" height="224px" :src="item.image"
                        alt="Product Image"></v-img>
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
                        style="margin-top: 8px;height: 41px;font-size: 14px;font-family: 'Inter', sans-serif;color: #787885;">
                        {{
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
                            <v-btn @click="addToCart(item.id)" class="text-capitalize"
                                style="margin-right: 6px;font-family: 'Inter', sans-serif;font-size: 14px;"
                                color="primary" size="small" prepend-icon="mdi-cart" variant="outlined">
                                Add cart
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script lang="ts" setup>
import { formatNumberWithCommas } from "@/common/helper/helpers"
import { onBeforeMount } from "vue"
import { useProductStore } from '../store/product.store'
import { userCartSotore } from "../store/cart.store"
import { storeToRefs } from "pinia"
const cartStore = userCartSotore()
const { actions, addCart } = cartStore
const productStore = useProductStore()
const { fetchProduct } = productStore
const { products } = storeToRefs(productStore);
onBeforeMount(async () => {
    await fetchProduct()
})
async function addToCart(productId: string) {
    actions.setProductIdAddCartVM(productId)
    await addCart()
}
</script>

<style>
.custom-shadow {
    margin-top: 10px;
    border-radius: 4px;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
}

.my-card {
    max-height: 200px;
    overflow: hidden;
}

.my-card-text {
    overflow-y: hidden;
}
</style>