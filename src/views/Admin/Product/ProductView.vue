<script setup>
import icon_delete from "@/assets/trash.png"
import icon_edit from "@/assets/edit.png"
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue';
import DialogViewVue from '@/components/Admin/Product/DialogView.vue';
import ConfirmVue from '@/components/confirm/IndexView.vue'
const isShowDialog = ref(false);
const isDialogDelete = ref(false)
const seletedValue = ref(DEFAULT_LIMIT_FOR_PAGINATION)
let itemEdit = ref(null)
let idDelete = ref(null)
let lengthPage = ref(1)
let page = ref(1)
const search = ref(null)
const TotalProducts = ref(null)
import { formatNumberWithCommas, showErrorNotification, showSuccessNotification, showWarningsNotification } from '../../../common/helper/helpers'
import { useProduct } from '../Product/product'
import { DEFAULT_LIMIT_FOR_PAGINATION } from '@/common/contant/contants';
import { productServiceApi } from '@/service/product.api';
import { checkSearchEnter } from '../../../common/helper/helpers'
const { fetchProducts, products, query, searchProducts } = useProduct()
import { useLoadingStore } from "@/store/loading";
const loading = useLoadingStore()
onMounted(async () => {
  query.keyword = undefined
  query.page = 1
  loadData()
})

const loadData = async () => {
  const res = await fetchProducts()
  if (res.data) {
    products.value = res.data;
    lengthPage.value = Math.ceil(res.totalItems / seletedValue.value);
    TotalProducts.value = res.totalItems
    return
  }
  products.value = []
}
const searchData = async () => {
  const res = await searchProducts()
  if (res.data) {
    products.value = res.data;
    lengthPage.value = Math.ceil(res.totalItems / seletedValue.value);
    TotalProducts.value = res.totalItems
    return
  }
  products.value = []
}
const addProduct = () => {
  isShowDialog.value = true
  itemEdit = null
}
const updateProductById = item => {
  isShowDialog.value = true
  itemEdit = item
}
const deleteProductById = async (id) => {
  loading.setLoading(true)
  const data = await productServiceApi._delete(id)
  // console.log(data)
  if (data.success) {
    loadData()
    isDialogDelete.value = false
    showSuccessNotification("Xóa thành công")
  }
  else {
    isDialogDelete.value = false
    showErrorNotification(data.message)
  }
}
const close = () => {
  isShowDialog.value = false
  isDialogDelete.value = false
}
const searchEnter = () => {
  if (!checkSearchEnter(search.value)) {
    query.keyword = search.value
    query.page = 1
    searchData()
  }
  else {
    showWarningsNotification("Không nhập ký tự đặc biệt")
  }
}
watch(seletedValue, (newval) => {
  // alert(newval)
  query.limit = newval
  query.page = 1
  page.value = 1
  loadData()
})
watch(search, (newval) => {
  if (!search.value) {
    query.keyword = undefined
    query.page = 1
    searchData()
  }
})
watch(page, (newVal, oldVal) => {
  if (page.value < 1) {
    page.value = oldVal
    return
  }
  if (page.value > lengthPage.value) {
    page.value = oldVal
    return
  }
  query.page = newVal
  loadData()
})
watch(isShowDialog, (newVal) => {
  if (newVal == false)
    itemEdit = null
})
</script>
<template>
  <div style="margin: 1.5%;">
    <v-row>
      <v-col cols="5" sm="4" md="4" lg="3">
        <!-- @blur="searchEnter()" -->
        <v-text-field @keyup.enter="searchEnter()" v-model="search" style="background-color: white;" density="compact"
          variant="solo" label="Tìm kiếm" append-inner-icon="mdi mdi-magnify" single-line hide-details
          class="mr-2"></v-text-field>
      </v-col>
      <v-col cols="7" class="text-right" lg="9" sm="8" md="8">
        <v-btn @click="addProduct()" color="primary" prepend-icon="mdi mdi-plus" class="text-capitalize">
          Tạo<span class="text-lowercase">mới</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-table density="compact" hover>
            <thead>
              <tr style="height: 47px;">
                <th class="text-left text-uppercase text-medium-emphasis">
                  Tên sản phẩm
                </th>
                <th class="text-left text-uppercase text-medium-emphasis">
                  Giá
                </th>
                <th class="text-left text-uppercase text-medium-emphasis">
                  Tên tác giả
                </th>
                <th class="text-left text-uppercase text-medium-emphasis">
                  Mô tả
                </th>
                <th class="text-left text-uppercase text-medium-emphasis">
                  Ảnh
                </th>
                <th class="text-center text-uppercase text-medium-emphasis">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody v-if="products.length > 0">
              <tr v-for="(item, index) in products" :key="index">
                <td style="width: 250px;height: 58px;"><b>
                    <p
                      style="width: 100%;max-height: 58px;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;">
                      {{ item.tenSP }}</p>
                  </b></td>
                <td>${{ formatNumberWithCommas(item.gia) }}</td>
                <!-- <td>{{ formatNumberWithCommas(item.quantity) }}</td> -->
                <td>{{ item.tenTacGia }}</td>
                <td style="width: 250px;height: 58px;" class="v-text-truncate">
                  <p
                    style="width: 100%;max-height: 58px;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;">
                    {{ item.moTa }}</p>
                </td>
                <td>
                  <v-img style="border-radius: 2px;" width="36" height="36" :src="item.image"></v-img>
                </td>
                <td class="text-center">
                  <div class="d-flex align-center justify-center">
                    <span style="cursor: pointer;" @click="updateProductById(item)" class="mr-3"><img width="24"
                        height="24" :src="icon_edit"></span>
                    <span style="cursor: pointer;" @click="{ isDialogDelete = true; idDelete = item.id }"><img
                        width="24" height="24" :src="icon_delete"></span>
                  </div>
                </td>
              </tr>
              <tr></tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="6">
                  <p class="text-center text-red">Không có dữ liệu</p>
                </td>
              </tr>
              <tr></tr>
            </tbody>
          </v-table>
          <v-row v-show="products.length > 0" class="ma-2 ">
            <v-col cols="10" sm="9" md="6" lg="8">
              <v-row>
                <span class="mt-5 opacity">Showing</span>
                <v-col style="max-width: 105px" cols="5" sm="4" md="5" lg="2">
                  <v-select v-model="seletedValue" density="compact" :items="['10', '20', '25', '30', '50']"
                    variant="outlined"></v-select>
                </v-col>
                <span class="mt-5 opacity">of {{ TotalProducts }}</span>
              </v-row>
            </v-col>
            <v-col cols="2" sm="3" md="6" lg="4">
              <p class="text-center page-table1" style="font-size: 15px;display: none;margin-top: 5px;">
                <span style="margin-bottom: 2px" @click="page = page - 1"
                  :class="{ 'text-grey-lighten-2': page === 1, 'text-black': page !== 1 }"><i
                    class="fa-solid fa-angle-left" style="cursor: pointer;"></i></span>
                <span
                  style="font-weight: 700;background-color: rgb(146, 177, 239);color: blue;opacity: 0.6;;border-radius: 2px;padding: 6px 10px;"
                  class="ml-3 mr-3">{{ page }}</span>
                <span style="margin-bottom: 2px;margin-right: 5px;" @click="page = page + 1"
                  :class="{ 'text-grey-lighten-2': page === lengthPage, 'text-black': page !== lengthPage }"><i
                    class="fa-solid fa-chevron-right" style="cursor: pointer;"></i></span>
              </p>
              <v-pagination class="page-table2 mt-1" v-model="page" active-color="#0F60FF" variant="text"
                density="compact" :length="lengthPage"></v-pagination>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <DialogViewVue v-model="isShowDialog" :itemEdit="itemEdit" @close="close()" @loadData="loadData()" />
  <ConfirmVue v-model="isDialogDelete" @close="close()" :idDelete="idDelete" @delete="deleteProductById" />
</template>
<style scoped>
body {
  font-family: 'Public Sans', sans-serif;
}

th {
  font-family: 'Public Sans', sans-serif;
  font-weight: 500;
  color: #8B909A;
  font-size: 13px;
}

td {
  font-family: 'Public Sans', sans-serif;
  font-size: 15px;
}

p {
  font-family: 'Public Sans', sans-serif;
}

.text-truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.opacity {
  opacity: 0.6;
}

.v-table {
  font-size: 15px;
}

@media ((min-width: 501px) and (max-width: 650px)) {
  .page-table1 {
    display: flex !important;
    align-items: center;
    justify-content: center;
  }

  .page-table2 {
    display: none !important;
  }
}

@media (max-width: 500px) {
  .opacity {
    display: none;
  }

  .v-btn__content {
    font-size: 10px;
  }

  .text-medium-emphasis {
    font-size: 12px;
  }

  .page-table1 {
    display: flex !important;
    align-items: center;
    justify-content: center;
  }

  .page-table2 {
    display: none !important;
  }
}
</style>