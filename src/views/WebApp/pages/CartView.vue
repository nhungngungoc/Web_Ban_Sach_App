<script setup>
import HeaderView from '../components/HeaderView.vue'
import FooterView from '../components/FooterView.vue'
import { formatNumberWithCommas, showWarningsNotification } from '@/common/helper/helpers'
import { userCartSotore } from '../store/cart.store'
import { computed, onMounted, ref, watch } from 'vue'
import { useThanhToanStore } from '../store/thanhtoan.store'
import router from '@/router'
import { storeToRefs } from 'pinia'
import { TypePay } from '@/common/contant/contants'
const cartStore = userCartSotore()
const { carts, totalGia, soLuongSanPham } = storeToRefs(cartStore)
const { getCarts, actions, addCart, deleteCart } = cartStore
const thanhToanStore = useThanhToanStore()
onMounted(async () => {
    await getCarts()
})
async function tang(item) {
    console.log(item);
    actions.setProductIdAddCartVM(item.productId)
    actions.setId(item.cartId)
    actions.setQuantity((item.quantity + 1) + "")
    await addCart()
    await getCarts()
}
async function giam(item) {
    if (item.quantity === 1) {
        await deleteCart(item.cartId)
        await getCarts()
        return
    }
    actions.setProductIdAddCartVM(item.productId)
    actions.setQuantity(item.quantity - 1 + "")
    actions.setId(item.cartId)
    await addCart()
    await getCarts()
}
async function handleDeletCart(item) {
    await deleteCart(item.cartId)
    await getCarts()
}
function toPage(name) {
    if (typePay.value === undefined) {
        showWarningsNotification("Vui lòng chọn phương thức thanh toán")
        return
    }
    router.push({ name: name })
}
const typePay = ref();
const operationPay = computed(() => {
    return [
        {
            label: 'Thanh toán khi nhận hàng',
            value: TypePay.NOPAY
        },
        {
            label: 'ATM',
            value: TypePay.PAY
        }
    ]
})
watch(typePay, (value) => {
    thanhToanStore.setTypePay(value)
})
</script>
<template>
    <div class="w-100">
        <HeaderView />
        <div style="background-color: #f8f9fa !important" class="d-flex justify-center">
            <div style="width: 85%;" class="flex-column">
                <v-card elevation="0" class="d-flex mb-5 py-10 mt-4">
                    <div style="width: 70%;border-right: 1px solid #cccc;">
                        <p class="text-h6 ml-3 font-weight-bold">Giỏ hàng của bạn</p>
                        <div class="w-100" v-if="carts.length > 0">
                            <div class="w-100 px-5 py-3 d-flex mt-2" style="border-bottom: 1px solid #cccc;"
                                v-for="item in carts" :key="item">
                                <div style="width: 70%;" class="d-flex">
                                    <img width="100" height="150" :src="item.image" alt="">
                                    <div class="ml-2">
                                        <p>{{ item.productName }}</p>
                                        <p class="font-weight-bold">{{ formatNumberWithCommas(item.price + "") }}</p>
                                        <div class="d-flex mt-3" style="border: 1px solid #cccc;width: fit-content;">
                                            <p class="py-2 px-3" style="border-right: 1px solid #cccc;cursor: pointer;"
                                                @click="giam(item)">-
                                            </p>
                                            <p class="py-2 px-3">{{ item.quantity }}</p>
                                            <p class="py-2 px-3" style="border-left: 1px solid #cccc;cursor: pointer;"
                                                @click="tang(item)">+</p>
                                        </div>
                                        <v-btn @click="handleDeletCart(item)" class="mt-2" icon="mdi-delete" color="red"
                                            size="small"></v-btn>
                                    </div>
                                </div>
                                <div style="width: 30%;" class="text-right">
                                    <span style="color: #dc3545 !important;">{{ formatNumberWithCommas(item.price + "")
                                        }}đ</span>
                                </div>
                            </div>
                        </div>
                        <div v-else class="w-100 mt-10 d-flex align-center justify-center">
                            <p class="text-red text-center">Không có sản phẩm trong giỏ hàng</p>
                        </div>
                    </div>
                    <div style="width: 30%;" class="px-5">
                        <p class="font-weight-bold">Thông tin giỏ hàng</p>
                        <div class="d-flex pl-5 mt-2">
                            <div style="width: 50%;">Sản phẩm:</div>
                            <div style="width: 50%;">
                                <p class="text-right mr-2 font-weight-bold">{{ soLuongSanPham }}</p>
                            </div>
                        </div>
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
                                <!-- <p class="text-right mr-2 font-weight-bold">Thanh toán ngay khi nhận hàng</p> -->
                                <v-select v-model="typePay" :items="operationPay" item-title="label" item-value="value"
                                    density="compact" variant="outlined"></v-select>
                            </div>
                        </div>
                        <v-divider></v-divider>
                        <div class="d-flex pl-5 mt-2">
                            <div style="width: 50%;color: #28a745!important;">Thanh toán:</div>
                            <div style="width: 50%;">
                                <p class="text-right mr-2 font-weight-bold" style="color: #dc3545!important;">{{
                                    formatNumberWithCommas(totalGia + "") }} đ
                                </p>
                            </div>
                        </div>

                        <div class="d-flex pl-5 mt-2">
                            <div style="width: 100%;" class="d-flex justify-end">
                                <v-btn @click="toPage('thanhtoan')" color="success" class="mr-2">Thanh toán</v-btn>
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
