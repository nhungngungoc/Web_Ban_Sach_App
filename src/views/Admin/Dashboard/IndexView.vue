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
                                <p class=" font-weight-bold"> 7 khách hàng</p>
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
                                <p class=" font-weight-bold"> 7 sản phẩm</p>
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
                                <p class="font-weight-bold"> 7 khách hàng</p>
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
                                <p class="font-weight-bold"> 2000.000</p>
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
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

// Fake data for weekly revenue
const chartSeries = ref([
    {
        name: 'Revenue',
        data: [10000, 15000, 8000, 20000, 18000, 22000, 25000],
    },
]);

const chartHeight = ref(400);
const chartOptions = ref({
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
            columnWidth: '55%',
            endingShape: 'rounded',
        },
    },
    xaxis: {
        categories: [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
        ],
        labels: {
            show: true,
        }
    },
    yaxis: {
        title: {
            text: 'Revenue (VNĐ)',
        },
    },
});
</script>
