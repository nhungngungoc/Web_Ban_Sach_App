<template>
    <div class="mt-5 mx-auto" style="width: 90%;">
        <v-btn class="d-flex justify-space-between" prepend-inner-icon="mdi-magnify"
            style="border-color: #9DC2FF;width: 304px !important;" height="56px" variant="outlined">
            <v-icon color="#2264D1" icon="mdi-menu" start />
            <p style="margin-left: 40px;color: #2264D1;font-size: 20px;font-weight: 700;">Loại Sách</p>
        </v-btn>
        <div class="mt-2">
            <v-list density="compact">
                <v-list-item v-for="(item, i) in categorys" :key="i" :value="item.id" color="primary">
                    <v-list-item-title class="text-h7" @click="handleCatrgory(item.id)">{{ item.name
                        }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue"
import { useCategoryStore } from "../store/category.store";
import { useProductStore } from "../store/product.store";
const categoryStore = useCategoryStore()
const { categorys } = storeToRefs(categoryStore);
const { getAllCategory } = categoryStore

const productStore = useProductStore()
const { actions, fetchProduct } = productStore
onBeforeMount(() => {
    getAllCategory()
})
async function handleCatrgory(value) {
    actions.setCategoryIdQuery(value)
    await fetchProduct()
}
</script>