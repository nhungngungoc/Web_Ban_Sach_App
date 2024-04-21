<script setup>
import HeaderView from '../components/HeaderView.vue'
import FooterView from '../components/FooterView.vue'
import { formatNumberWithCommas } from '@/common/helper/helpers'
import { userCartSotore } from '../store/cart.store'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
const cartStore = userCartSotore()
const { carts, totalGia, soLuongSanPham } = storeToRefs(cartStore)
const { getCarts, actions, addCart, deleteCart } = cartStore

onMounted(async () => {
    await getCarts()
})

function toPage(name) {
    router.push({ name: name })
}
</script>
<template>
    <div class="w-100">
        <HeaderView />
        <div style="background-color: #f8f9fa !important" class="d-flex justify-center">
            <div style="width: 85%;" class="flex-column">
                <v-card elevation="0" class="d-flex mb-5 py-10 mt-4">
                    <div style="width: 70%;border-right: 1px solid #cccc;">
                        <p class="text-h6 ml-3 font-weight-bold">Địa chỉ giao hàng</p>
                        <v-row class="px-3 mt-2">
                            <v-col lg="6">
                                <span class="font-weight-bold">Họ và tên</span>
                                <v-text-field variant="outlined" density="compact"></v-text-field>
                            </v-col>
                            <v-col lg="6">
                                <span class="font-weight-bold">Số điện thoại</span>
                                <v-text-field variant="outlined" density="compact"></v-text-field>
                            </v-col>
                            <v-col lg="12">
                                <span class="font-weight-bold">Địa chỉ</span>
                                <v-textarea variant="outlined" density="compact"></v-textarea>
                            </v-col>
                            <v-col lg="12">
                                <span class="font-weight-bold">Ghi chú</span>
                                <v-textarea variant="outlined" density="compact"></v-textarea>
                            </v-col>
                            <v-col lg="12" class="d-flex justify-center">
                                <v-btn @click="toPage('cart')" color="#17a2b8">Quay lại</v-btn>
                                <v-btn class="ml-3" color="#28a745">Thanh Toán</v-btn>
                            </v-col>
                        </v-row>
                    </div>
                    <div style="width: 30%;" class="px-5">
                        <p class="font-weight-bold mb-4">Giỏ hàng</p>
                        <div class="w-100 d-flex" v-for="item in carts" :key="item">
                            <div style="width: 30%;">
                                <img width="80" height="100" :src="item.image" alt="">
                            </div>
                            <div style="width: 40%;">
                                <p class="text-truncate">{{ item.productName }}</p>
                                <p style="color: #17a2b8!important">{{ formatNumberWithCommas(item.price) }}đ x {{
                                    item.quantity }}</p>
                            </div>
                            <div style="width: 30%;">
                                <p class="text-right" style="color: #dc3545!important;">{{
                                    formatNumberWithCommas(item.price * item.quantity) }} đ</p>
                            </div>
                        </div>
                        <v-divider></v-divider>
                        <div class="d-flex pl-5 mt-2">
                            <div style="width: 50%;">Tổng tiền:</div>
                            <div style="width: 50%;">
                                <p class="text-right mr-2 font-weight-bold">{{ formatNumberWithCommas(totalGia +
                                    "") }} đ</p>
                            </div>
                        </div>
                        <div class="d-flex pl-5 mt-2">
                            <div style="width: 50%;">Hình thức thành toán:</div>
                            <div style="width: 50%;">
                                <p class="text-right mr-2 font-weight-bold">Thanh toán khi nhận hàng</p>
                            </div>
                        </div>
                        <v-divider></v-divider>
                        <div class="d-flex pl-5 mt-2">
                            <div style="width: 50%;color: #28a745!important;"></div>
                            <div style="width: 50%;">
                                <p class="text-right mr-2 font-weight-bold" style="color: #dc3545!important;">{{
                                    formatNumberWithCommas(totalGia + "") }} đ
                                </p>
                            </div>
                        </div>
                    </div>
                </v-card>
            </div>
        </div>
        <div class="w-100 mt-6 d-flex justify-center">
            <div style="width: 85%;">
                <FooterView />
            </div>
        </div>
    </div>
</template>
