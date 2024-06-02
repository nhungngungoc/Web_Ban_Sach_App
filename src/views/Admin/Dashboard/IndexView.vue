<template>
    <div class="mx-5">
        <v-row>
            <v-col cols="12" class="">
                <div class="w-100 d-flex justify-space-around">
                    <div style="width: 48%;">
                        <v-card class="pa-2 d-flex justify-space-around align-center">
                            <div>
                                <v-btn class="ma-2" color="green" icon="mdi-account-circle"></v-btn>
                            </div>
                            <div>
                                <p class="text-red font-weight-bold">Tổng số khách hàng</p>
                                <p class=" font-weight-bold"> {{ formatNumberWithCommas(countUser.toString()) }} khách
                                    hàng</p>
                            </div>
                        </v-card>
                    </div>
                    <div style="width: 48%;">
                        <v-card class="pa-2 d-flex justify-space-around align-center">
                            <div>
                                <v-btn class="ma-2" color="blue" icon=" mdi-ammunition"></v-btn>
                            </div>
                            <div>
                                <p class="text-red font-weight-bold">Tổng số sản phẩm</p>
                                <p class=" font-weight-bold"> {{ formatNumberWithCommas(countProduct.toString()) }} sản
                                    phẩm</p>
                            </div>
                        </v-card>
                    </div>
                </div>
                <div class="w-100 d-flex justify-space-around mt-2">
                    <div style="width: 48%;">
                        <v-card class="pa-2 d-flex justify-space-around align-center">
                            <div>
                                <v-btn class="ma-2" color="orange" icon="mdi-bag-personal"></v-btn>
                            </div>
                            <div>
                                <p class="text-red font-weight-bold">Tổng số đơn hàng</p>
                                <p class="font-weight-bold"> {{ formatNumberWithCommas(countOrder.toString()) }} đơn
                                    hàng</p>
                            </div>
                        </v-card>
                    </div>
                    <div style="width: 48%;">
                        <v-card class="pa-2 d-flex justify-space-around align-center">
                            <div>
                                <v-btn class="ma-2" color="yellow" icon="mdi-cash"></v-btn>
                            </div>
                            <div>
                                <p class="text-red font-weight-bold">Doanh Thu Hôm Nay</p>
                                <p class="font-weight-bold"> {{ formatNumberWithCommas(doanhThuHomNay.toString()) }} VNĐ
                                </p>
                            </div>
                        </v-card>
                    </div>
                </div>
            </v-col>
            <v-col cols="6">

            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <VueApexCharts :height="chartHeight" type="bar" :options="chartOptions" :series="chartSeries">
                    </VueApexCharts>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script setup lang="ts">
import { useDashboardStore } from './Dashboard.store';
import { formatNumberWithCommas } from '@/common/helper/helpers';
import { computed, onMounted, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
const dashboardStore = useDashboardStore()

onMounted(async () => {
    await dashboardStore.getDashboard();
})

const countUser = computed(() => dashboardStore.countUser);
const countProduct = computed(() => dashboardStore.countProduct);
const countOrder = computed(() => dashboardStore.countOrder);
const doanhThuHomNay = computed(() => dashboardStore.doanhThuHomNay);
// Fake data for weekly revenue

const chartSeries = computed(() => {
    return [
        {
            name: "Doanh Thu",
            data: dashboardStore.doanhThuTuanNay.map((item: any) => item.total) || []
        }
    ]
});

const chartHeight = ref(400);
const chartOptions = computed(() => {
    return {
        chart: {
            height: 400,
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded',
            },
        },
        xaxis: {
            categories: dashboardStore.doanhThuTuanNay.map((item: any) => item.name) || [],
            labels: {
                show: true,
            }
        },
        yaxis: {
            title: {
                text: '',
            },
        },
        dataLabels: {
            enabled: false
        },
    }
})
</script>
