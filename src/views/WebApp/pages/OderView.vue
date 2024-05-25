<script setup>
import HeaderView from '../components/HeaderView.vue'
import FooterView from '../components/FooterView.vue'
import router from '@/router'
import { onMounted, ref } from 'vue'
import { orderServiceApi } from '@/service/order.api'
import { formatNumberWithCommas, formatPhoneNumber, showWarningsNotification, formatDateString } from '@/common/helper/helpers'
const orders = ref([])
onMounted(async () => {
    const res = await orderServiceApi.getOrders();
    if (res.success) {
        orders.value = res.data
    }
})
</script>
<template>
    <div class="w-100">
        <HeaderView />
        <div style="background-color: #f8f9fa !important" class="d-flex justify-center">
            <div style="width: 85%;" class="flex-column">
                <v-card elevation="0" class="d-flex mb-5 py-10 mt-2">
                    <div style="width: 100%;">
                        <p class="text-h6 ml-3 font-weight-bold">Đơn hàng của bạn</p>
                        <div v-if="orders.length > 0">
                            <v-table hover>
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            STT
                                        </th>
                                        <th class="text-left">
                                            Người nhận
                                        </th>
                                        <th class="text-left">
                                            Số điện thoại
                                        </th>
                                        <th class="text-left">
                                            Địa chỉ
                                        </th>
                                        <th class="text-left">
                                            Tổng tiền
                                        </th>
                                        <th class="text-left">
                                            Ngày đặt
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in orders" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ item.nguoiNhan }}</td>
                                        <td>{{ formatPhoneNumber(item.phone) }}</td>
                                        <td>{{ item.diaChi }}</td>
                                        <td>{{ formatNumberWithCommas(item.total) }} đ</td>
                                        <td>{{ formatDateString(item.ngayDat, "DD/MM/YYYY") }}</td>
                                        <td><v-btn variant="text"
                                                @click="router.push({ name: 'orderdetail', params: { id: item.id } })"
                                                color="green" icon="mdi-eye-outline"></v-btn></td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </div>
                        <div v-else class="w-100 mt-10 d-flex align-center justify-center">
                            <p class="text-red text-center">Không có sản phẩm trong giỏ hàng</p>
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
