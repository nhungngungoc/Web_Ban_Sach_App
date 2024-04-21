<template>
    <div class="w-100">
        <HeaderView />
        <div style="background-color: #f8f9fa !important" class="d-flex justify-center">
            <div style="width: 85%;" class="flex-column ">
                <div class="d-flex justify-space-between">
                    <category-view style="width: 25%; " />
                    <div style="width: 74%;">
                        <CarouselView />
                    </div>
                </div>
                <div class="mt-2">
                    <img style="width: 100%; height: 60px;"
                        src="https://pibook.vn/upload/banner/%C4%90%E1%BB%8Dc%20s%C3%A1ch%20c%C3%B9ng%20con.png" alt="">
                </div>
                <div>
                    <div style="background-color: rgb(0 92 223);" class="px-2 py-3">
                        <p style="color: white; " class="text-h5">Sản phẩm mới nhất</p>
                    </div>
                    <ProductView />
                </div>
                <div class="mt-6 d-flex justify-center">
                    <FooterView />
                </div>
            </div>

        </div>

    </div>
</template>
<script setup>
import HeaderView from '../components/HeaderView.vue'
import CarouselView from '../components/CarouselView.vue'
import ProductView from '../components/ProductView.vue'
import CategoryView from '../components/CategoryView.vue'
import FooterView from '../components/FooterView.vue'
import { onMounted } from 'vue'
import { useProductStore } from '../store/product.store'
const { actions, fetchProduct } = useProductStore()
onMounted(async () => {
    actions.setCategoryIdQuery("")
    actions.setKeywordQuey("")
    await fetchProduct()
})
</script>