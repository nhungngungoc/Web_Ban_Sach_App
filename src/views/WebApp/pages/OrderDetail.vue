<script setup>
import HeaderView from '../components/HeaderView.vue'
import FooterView from '../components/FooterView.vue'
import { formatNumberWithCommas, formatPhoneNumber, showWarningsNotification, formatDateString } from '@/common/helper/helpers'
import { computed, onMounted, ref, watch } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { orderServiceApi } from '@/service/order.api'
const route = useRoute()
const products = ref([])
onMounted(() => {
    getData()
})
async function getData() {
    const res = await orderServiceApi.getOrderDetail(route.params.id);
    products.value = res.data
}
</script>
<template>
    <div class="w-100">
        <HeaderView />
        <div style="background-color: #f8f9fa !important" class="d-flex justify-center">
            <div style="width: 85%;" class="flex-column">
                <v-card elevation="0" class="d-flex mb-5 py-10 mt-4">
                    <div style="width: 100%">
                        <p class="text-h6 ml-3 font-weight-bold">Sản phẩm bạn đã mua</p>
                        <div class="w-100" v-if="products.length > 0">
                            <v-table hover>
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            STT
                                        </th>
                                        <th class="text-left">
                                            Ảnh
                                        </th>
                                        <th class="text-left">
                                            Tên sản phẩm
                                        </th>
                                        <th class="text-left">
                                            Giá
                                        </th>
                                        <th class="text-left">
                                            Số lượng
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in products" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td><img :src="item.image" alt="" width="50" height="50"></td>
                                        <td>{{ item.productName }}</td>
                                        <td>{{ formatNumberWithCommas(item.price) }}</td>
                                        <td>{{ (item.quantity) }}</td>
                                        <td>
                                            <v-btn color="primary" size="small">Mua lại</v-btn>
                                        </td>
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
