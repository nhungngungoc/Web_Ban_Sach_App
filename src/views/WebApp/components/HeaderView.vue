<template>
    <div class="h-25 d-flex align-center justify-center flex-column" style="background-color: white">
        <div style="width: 85%;">
            <div>
                <img style="width: 100%; height: 60px;" src="https://pibook.vn/upload/banner/coverwwebb.png" alt="">
            </div>
            <div class="d-flex w-100 justify-space-between align-center">
                <div>
                    <img style="cursor: pointer;" @click="toPage('Trang_chu_page')" width="200" height="50"
                        src="https://pibook.vn/upload/logo-trong-suot%202.png" alt="">
                </div>
                <div>
                    <v-text-field density="compact" variant="outlined" label="Tìm kiếm" style="width: 300px;"
                        append-inner-icon="mdi-magnify" single-line flat hide-details :model-value="query.keyword"
                        @update:model-value="setKeywordQuery"></v-text-field>
                </div>
                <div class="d-flex justify-space-between font-weight-bold" style="width: 20%;color: orange;">
                    <div class="d-flex flex-column align-center justify-center">
                        <v-icon size="large">mdi mdi-bell-outline</v-icon>
                        <p>Thông báo</p>
                    </div>
                    <div style="cursor: pointer;" @click="toPage('cart')"
                        class="d-flex flex-column align-center justify-center">
                        <v-icon size="large">mdi mdi-cart</v-icon>
                        <p>Giỏ hàng</p>
                    </div>

                    <v-menu open-on-hover>
                        <template v-slot:activator="{ props }">
                            <div v-bind="props" class="d-flex flex-column align-center justify-center">
                                <v-avatar
                                    image="https://tse3.mm.bing.net/th?id=OIP.Cl56H6WgxJ8npVqyhefTdQHaHa&pid=Api&P=0&h=220"></v-avatar>
                                <p>Tài khoản</p>
                            </div>
                        </template>
                        <v-list class="ma-2">
                            <v-list-item>
                                <v-list-item-title style="cursor: pointer;"
                                    @click="this.$router.push({ name: 'order' })">Đơn hàng của
                                    bạn</v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title @click="this.$router.push({ name: 'login_page' })"
                                    style="cursor: pointer;">Đăng
                                    xuất</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { PageName } from "@/common/contant/contants";
import router from "@/router";
import { storeToRefs } from "pinia";
import { useRoute } from 'vue-router';

import { useProductStore } from "../store/product.store";
const productStore = useProductStore()
const { query } = storeToRefs(productStore)
const { actions, fetchProduct } = productStore
const route = useRoute();

async function setKeywordQuery(value) {
    if (route.name === PageName.TRANG_CHU)
        return
    actions.setKeywordQuey(value)
    await fetchProduct()
}
async function toPage(name) {
    router.push({ name: name })
}
</script>