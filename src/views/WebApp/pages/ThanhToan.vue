<script lang="ts" setup>
import { useField, useForm } from 'vee-validate';
import HeaderView from '../components/HeaderView.vue'
import FooterView from '../components/FooterView.vue'
import { formatNumberWithCommas, showSuccessNotification, showWarningsNotification } from '@/common/helper/helpers'
import { useThanhToanStore } from '../store/thanhtoan.store';
import { userCartSotore } from '../store/cart.store'
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { tinhServiceApi } from '@/service/tinh.api';
import { huyenServiceApi } from '@/service/huyen.api';
import { xaServiceApi } from '@/service/xa.api';
import { orderServiceApi } from '@/service/order.api';
import { PageName } from '@/common/contant/contants';
const cartStore = userCartSotore()
const { carts, totalGia, soLuongSanPham } = storeToRefs(cartStore)
const { getCarts, actions, addCart, deleteCart } = cartStore
const thanhToanStore = useThanhToanStore()
const { getAllTinh, getAllHuyen, getAllXa } = thanhToanStore
const { listTinh, listXa, listHuyen } = storeToRefs(thanhToanStore);
onMounted(async () => {
    await Promise.all([getCarts(), getAllTinh()])
})

function toPage(name: any) {
    router.push({ name: name })
}


const { handleSubmit, setValues, resetForm } = useForm<{
    fullname: string;
    phone: string;
    tinh: string;
    huyen: string;
    xa: string;
    thon: string;
    note: string;
}>({
    initialValues: {
        fullname: '',
        phone: '',
        tinh: '',
        huyen: '',
        xa: '',
        thon: '',
        note: '',
    },
    // validationSchema: labelFormSchema,
    validateOnMount: false,
});
const { value: fullname } = useField('fullname');
const { value: phone } = useField('phone');
const { value: tinh } = useField('tinh');
const { value: huyen } = useField('huyen');
const { value: xa } = useField('xa');
const { value: note } = useField('note');
const { value: thon } = useField('thon');


const handleSubmitForm = handleSubmit(async () => {
    const getTinh: any = await tinhServiceApi._getDetail(tinh.value as string);
    const getHuyen: any = await huyenServiceApi._getDetail(huyen.value as string);
    const getXa: any = await xaServiceApi._getDetail(xa.value as string);

    const diachi = thon.value + " - " + getXa.data.loai + " " + getXa.data.tenXa + " - " + getHuyen.data.loai + " " + getHuyen.data.tenHuyen + " - " + getTinh.data.loai + " " + getTinh.data.tenTinh



    const res: any = await orderServiceApi.createOrder({
        NguoiNhan: fullname.value as string,
        DiaChi: diachi,
        Phone: phone.value as string,
        Total: totalGia.value as number,
        cartId: carts.value.map(x => x.cartId)
    })
    if (res.success) {
        router.push({
            name: 'cart'
        })
        showSuccessNotification(res.message)
    }
    else {
        showWarningsNotification(res.message)
    }
})

watch(tinh, async () => {
    huyen.value = ""
    await getAllHuyen(tinh.value as string)
    xa.value = ""
    listXa.value = []
})
watch(huyen, async () => {
    if (huyen.value === "")
        return
    await getAllXa(huyen.value as string)
})
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
                                <v-text-field v-model="fullname" variant="outlined" density="compact"
                                    placeholder="Nhập họ và tên người nhận"></v-text-field>
                            </v-col>
                            <v-col lg="6">
                                <span class="font-weight-bold">Số điện thoại</span>
                                <v-text-field v-model="phone" variant="outlined" density="compact"
                                    placeholder="Nhập số điện thoại"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <span class="font-weight-bold">Địa chỉ</span>
                                <v-row class="mt-1">
                                    <v-col cols="6">
                                        <v-autocomplete v-model="tinh" label="Chọn thành phố" :items="listTinh"
                                            item-title="text" item-value="value" variant="outlined"
                                            density="compact"></v-autocomplete>
                                        <v-autocomplete v-model="xa" label="Chọn xã" :items="listXa" item-title="text"
                                            item-value="value" variant="outlined" density="compact"></v-autocomplete>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-autocomplete v-model="huyen" label="Chọn huyện" :items="listHuyen"
                                            item-title="text" item-value="value" variant="outlined"
                                            density="compact"></v-autocomplete>
                                        <v-text-field v-model="thon" variant="outlined" density="compact"
                                            placeholder="---- Số nhà, tên đường/xã/thị trấn -----"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col lg="12">
                                <span class="font-weight-bold">Ghi chú</span>
                                <v-textarea v-model="note" variant="outlined" density="compact"></v-textarea>
                            </v-col>
                            <v-col lg="12" class="d-flex justify-center">
                                <v-btn @click="toPage('cart')" color="#17a2b8">Quay lại</v-btn>
                                <v-btn class="ml-3" color="#28a745" @click="handleSubmitForm">Thanh Toán</v-btn>
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
<style scoped></style>
