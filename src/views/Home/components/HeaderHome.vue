<template>
    <v-app-bar height="75" elevation="1" class="d-flex">
        <div class="d-flex align-center" style="width: 30%;">
            <img class="ml-3 mr-2" width="" height="40px" :src="W_png" alt="">
            <p style="margin-left: 12px;">Sell on Shopka</p>
            <p style="margin-left: 17px;">Register</p>
        </div>
        <div style="width: 30%;margin-left: 80px;">
            <v-text-field clearable density="compact" variant="solo-filled" label="Tìm kiếm"
                style="background-color: #F0F0F0;border-radius: 20px !important;" prepend-inner-icon="mdi-magnify"
                append-inner-icon="mdi mdi-close" single-line flat hide-details rounded :model-value="query.keyword"
                @update:model-value="setKeywordQuery"></v-text-field>
        </div>
        <div style="width: 33%;" class="d-flex align-center justify-space-between">
            <p style="margin-left: 80px;;color: #2264D1;font-size: 14px;"></p>
            <div class="d-flex align-center justify-end">
                <v-btn v-show="!token" to="login" class="text-capitalize ml-6" variant="outlined"
                    style="border-color: #9DC2FF;height: 40px;color: #2264D1;font-weight: 700;">Đăng <span
                        class="text-lowercase ml-1">nhập</span></v-btn>
                <v-badge v-show="token" content="2" color="red">
                    <v-btn variant="text" class="text-capitalize ml-2" elevation="1"
                        style="color: #2264D1;font-weight: 700;" icon="mdi mdi-cart"></v-btn>
                </v-badge>
                <v-avatar v-if="token" class="ml-4">
                    <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                </v-avatar>
            </div>
        </div>
    </v-app-bar>
</template>
<script setup>
import W_png from "@/assets/W.png"
import localStorageAuthService from "@/common/storages/authStorage";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { boolean } from "yup";
import { useProductStore } from "../store/product.store";
const productStore = useProductStore()
const { query } = storeToRefs(productStore)
const { actions, fetchProduct } = productStore
async function setKeywordQuery(value) {
    actions.setKeywordQuey(value)
    await fetchProduct()
}

const token = ref(false)
onMounted(() => {
    token.value = localStorageAuthService.getAccessToken() ? true : false
})
</script>