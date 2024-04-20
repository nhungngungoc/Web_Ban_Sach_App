<template>
    <div style="background-color: white;">
        <p class="pa-3 text-h5 text-center font-weight-bold" style="background-color: orange;color: white;">
            Danh mục sản phẩm
        </p>
        <v-list density="compact">
            <v-list-item v-for="(item, i) in categorys" :key="i" :value="item.id" color="primary">
                <v-list-item-title @click="handleCatrgory(item.id)" class="text-h7">{{ item.name
                    }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useCategoryStore } from "../store/category.store";
import { useProductStore } from "../store/product.store";
import { PageName } from "@/common/contant/contants";
const categoryStore = useCategoryStore()
const { categorys } = storeToRefs(categoryStore);
const { getAllCategory } = categoryStore
import router from '@/router';

const productStore = useProductStore()
const { actions, fetchProduct } = productStore
async function handleCatrgory(value) {
    actions.setCategoryIdQuery(value)
    await fetchProduct()
    router.push({
        name: 'proudctByCategory'
    })
}
onBeforeMount(async () => {
    await getAllCategory()
})
</script>