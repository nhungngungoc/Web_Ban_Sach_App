<template>
    <div class="w-100">
        <HeaderView />
        <div style="background-color: #f8f9fa !important" class="d-flex justify-center">
            <div style="width: 85%;" class="flex-column">
                <div class="d-flex justify-space-between">
                    <category-view class="mt-3" />
                    <div style="width: 80%;">
                        <ProductView />
                    </div>
                </div>
            </div>
        </div>
        <div class="w-100 mt-6 d-flex justify-center">
            <div style="width: 85%;">
                <FooterView />
            </div>
        </div>
    </div>
</template>
<script setup>
import HeaderView from '../components/HeaderView.vue'
import ProductView from '../components/ProductView.vue'
import CategoryView from '../components/CategoryView.vue'
import FooterView from '../components/FooterView.vue'
</script>