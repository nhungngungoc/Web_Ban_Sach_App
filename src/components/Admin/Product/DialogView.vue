<template>
    <v-dialog max-width="500px">
        <v-form @submit.prevent="submit">
            <v-card style="border-radius: 12px !important;">
                <v-card-title
                    style="font-weight: bold;position:fixed;width: 100%;top: 0;background-color: white;z-index: 100;border-top-left-radius:12px ;border-top-right-radius: 12px;">
                    <h4 style="font-size: 18px;">{{ itemEdit ? "Sửa sản phẩm" : "Tạo mới sản phẩm" }}</h4>
                </v-card-title>
                <v-container class="mt-10" style="background-color: #F7F8FA">
                    <div style="display: block; margin-top: 8px;">
                        <span>Tên sản phẩm </span> <span class="text-blue ml-2">*</span>
                        <v-text-field class="mt-1" v-model="name" placeholder="Nhập tên sản phẩm"
                            :error-messages="nameError" style="background-color: white;" density="compact" single-line
                            hide-details variant="outlined"></v-text-field>
                        <span style="color:red">{{ nameError }}</span>
                    </div>
                    <div style="display: block; margin-top: 8px;">
                        <span>Loại sản phẩm </span> <span class="text-blue ml-2">*</span>
                        <v-select class="mt-1" v-model="category_id" :items="categortDropDown" item-title="text" item-value="value" label="Loại sản phẩm"
                        style="background-color: white;" density="compact" single-line hide-details variant="outlined"></v-select>
                        <span style="color:red">{{ category_idError }}</span>
                    </div>
                    <div style="display: block; margin-top: 12px;">
                        <span>Giá</span><span class="text-blue ml-2">*</span>
                        <v-text-field class="mt-1" v-model="price" placeholder="Nhập giá sản phẩm"
                            :error-messages="priceError" required style="background-color: white;" density="compact"
                            single-line hide-details variant="outlined"></v-text-field>
                        <span style="color:red">{{ priceError }}</span>
                        <span style="color:red">{{ errorPrice2 }}</span>
                    </div>
                    <div style="display: block; margin-top: 12px;">
                        <span>Tác giả</span><span class="text-blue ml-2">*</span>
                        <v-text-field class="mt-1" v-model="tacgia" placeholder="Nhập tên tác giả"
                            :error-messages="tacgiaError" required style="background-color: white;" density="compact"
                            single-line hide-details variant="outlined"></v-text-field>
                        <span style="color:red">{{ tacgiaError }}</span>
                    </div>
                    <div style="display: block; margin-top: 12px;">
                        <span>Mô tả</span>
                        <v-textarea class="mt-1" v-model="description" placeholder="Nhập mô tả"
                             style="background-color: white;" density="compact"
                            single-line hide-details variant="outlined"></v-textarea>
                        <span style="color:red">{{ descriptionError }}</span>
                    </div>
                    <div style="display: block; margin-top: 12px;">
                        <span>Ảnh sản phẩm</span><span v-show="!itemEdit" class="text-blue ml-2">*</span><br>
                        <input @change="handleImageChange" type="file" class="custom-file-input mt-1" />
                        <span style="color:red">{{ errorFile }}</span>
                    </div>
                </v-container>
                <v-card-actions class="pr-4">
                    <v-spacer></v-spacer>
                    <v-btn width="70px" variant="outlined" height="32px"
                        style="font-size: 14px;margin-right: 16px;" @click="close()"
                        class="text-capitalize" text="Hủy"></v-btn>
                    <v-btn width="105px" height="32px" style="font-size: 14px;" type="submit"
                        color="primary" class="text-capitalize" variant="elevated">{{ itemEdit ? "Update" : "Tạo" }}<span
                            class="text-lowercase">{{ itemEdit ? "" : "mới" }}</span></v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>

<script setup>
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { ref, watch, onUpdated,onMounted } from 'vue';
import { productServiceApi } from '@/service/product.api';
import { categoryServiceApi } from '@/service/category.api';
import { showSuccessNotification, showWarningsNotification } from '@/common/helper/helpers';
import { useLoadingStore } from '@/store/loading';
import { MESSAGE_ERROR, Regex } from '@/common/contant/contants';
import { logout } from '@/plugins/axios';
const loading = useLoadingStore()
const errorFile=ref(null)
const errorPrice2=ref(null)


const props = defineProps(['itemEdit'])
const emit = defineEmits(['close', 'loadData'])
watch(() => props.itemEdit, (newValue, oldValue) => {
    resetForm()
    if (props.itemEdit !== null) {
        // alert(newValue.id)
        getProductById(newValue.id)
    }
});

const categortDropDown=ref([])
onMounted(()=>{
    getCategortDropDown()
})
const getCategortDropDown=async()=>{
    const res=await categoryServiceApi._getDropdown()
    categortDropDown.value=res.data
}
const getProductById = async (id) => {
    try {
        loading.setLoading(true)
        const data = await productServiceApi._getDetail(id);
        console.log(data)
        if (data.success) {
            name.value = data.data.tenSP;
            price.value = data.data.gia;
            description.value = data.data.moTa;
            tacgia.value = data.data.tenTacGia;
            category_id.value=data.data.categoryId;
        }
        else {
            showWarningsNotification(data.message)
        }
    } catch (error) {
        console.error('Error fetching product detail:', error);
    }finally{
        loading.setLoading(false)
    }
}
onUpdated(() => {
    if (props.itemEdit === null)
    {
        resetForm()
        errorFile.value=null
    }
})




const { handleSubmit, resetForm } = useForm();

const { value: name, errorMessage: nameError } = useField(
    'name',
    yup
        .string()
        .required(MESSAGE_ERROR.REQUIRE)
        .matches(Regex.NAME_PRODUCT,MESSAGE_ERROR.NAME)
);

const { value: category_id, errorMessage: category_idError } = useField(
    'category_id',
    yup
        .string()
        .required(MESSAGE_ERROR.REQUIRE)
);

const { value: price, errorMessage: priceError } = useField(
    'price',
    yup
        .number()
        .required(MESSAGE_ERROR.REQUIRE)
        .min(Regex.MIN, MESSAGE_ERROR.MIN)
        .typeError(MESSAGE_ERROR.NUMBER)
        .max(Regex.MAX_PRICE,MESSAGE_ERROR.MAX_PRICE)
);

const { value: tacgia, errorMessage: tacgiaError } = useField(
    'tacgia',
    yup
        .string()
        .required(MESSAGE_ERROR.REQUIRE)
);
const { value: description, errorMessage: descriptionError } = useField(
   'description',
   yup
       .string()
       .required(MESSAGE_ERROR.REQUIRE)
       .min(10, 'Mô tả phải có ít nhất 10 ký tự')
       .max(500, 'Mô tả không được quá 500 ký tự')
);
const submit = handleSubmit(async () => {
    if(errorPrice2.value!=null)
    {
        return
    }
    try {
        // alert( typeof parseInt(price.value))
        loading.setLoading(true)
        const formData = new FormData();
        formData.append('Id', props.itemEdit?props.itemEdit.id:null);
        formData.append('TenSP', name.value);
        formData.append('Gia',price.value);
        formData.append('TenTacGia',tacgia.value);
        formData.append('MoTa', description.value?description.value:"");
        formData.append('file', imageFile.value);
        formData.append('CategoryId', category_id.value);
        if (props.itemEdit == null) {
            if(imageFile.value==null)
            {
                errorFile.value="Vui lòng chọn ảnh"
                return
            }
            const data = await productServiceApi.createProduct(formData);
            if(data.status===419)
                logout()
            console.log(data)
            if (!data.success) {
              //  alert("Tạo lỗi")
                showWarningsNotification(data.message)
            }
            else {
                close()
                emit('loadData')
                showSuccessNotification("Thêm thành công")
                empty()
            }
        }
        else {
            const data = await productServiceApi.updateProduct(props.itemEdit.id, formData);
            if(data.status===419)
                logout()
            if (!data.success) {
                showWarningsNotification(data.message)
            }
            else {
                close()
                emit('loadData')
                showSuccessNotification("cập nhật thành công")
                empty()
            }
        }
    } catch (error) {
        showWarningsNotification(error.message)
    } finally {
        loading.setLoading(false)
    }
});

const empty = () => {
    imageFile.value = null;
    props.itemEdit = null
}


const imageFile = ref(null);
const handleImageChange = (event) => {
    const file = event.target.files[0];
    imageFile.value = file;
};
const close = () => {
    emit('close')
    resetForm()
}
watch(price,(newVal)=>{
    const containsWhiteSpace = /\s/.test(newVal);
    if (containsWhiteSpace)
        errorPrice2.value="Giá không đc nhập khoảng trắng"
    else
        errorPrice2.value=null
})
</script>
<style scoped>
.custom-file-input {
    display: inline-block;
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    font-family: Arial, sans-serif;
    color: #333;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.custom-file-input:hover {
    background-color: #e0e0e0;
}

body{
    font-family: 'Public Sans', sans-serif;
    font-size: 14px;
}
</style>