<template>
    <v-dialog max-width="500px">
        <v-form @submit.prevent="submit">
            <v-card style="border-radius: 12px !important;">
                <v-card-title
                    style="font-weight: bold;position:fixed;width: 100%;top: 0;background-color: white;z-index: 100;border-top-left-radius:12px ;border-top-right-radius: 12px;">
                    <h4 style="font-size: 18px;">{{ itemEdit ? "Sửa loại sản phẩm" : "Tạo mới loại sản phẩm" }}</h4>
                </v-card-title>
                <v-container class="mt-10" style="background-color: #F7F8FA">
                    <div style="display: block; margin-top: 8px;">
                        <span>Tên loại sản phẩm </span> <span class="text-blue ml-2">*</span>
                        <v-text-field class="mt-1" v-model="name" placeholder="Nhập tên sản phẩm"
                            :error-messages="nameError" style="background-color: white;" density="compact" single-line
                            hide-details variant="outlined"></v-text-field>
                        <span style="color:red">{{ nameError }}</span>
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
import { ref, watch, onUpdated } from 'vue';
import { categoryServiceApi } from '@/service/category.api';
import { showSuccessNotification, showWarningsNotification } from '@/common/helper/helpers';
import { useLoadingStore } from '@/store/loading';
import { MESSAGE_ERROR, Regex } from '@/common/contant/contants';
import { logout } from '@/plugins/axios';
const loading = useLoadingStore()
const props = defineProps(['itemEdit'])
const emit = defineEmits(['close', 'loadData'])
watch(() => props.itemEdit, (newValue, oldValue) => {
    resetForm()
    if (props.itemEdit !== null) {
        // alert(newValue.id)
        getProductById(newValue.id)
    }
});
const getProductById = async (id) => {
    try {
        loading.setLoading(true)
        const data = await categoryServiceApi._getDetail(id);
        if(data.status===419)
          logout()
        if (data.success) {
            name.value = data.data.name;
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
const submit = handleSubmit(async () => {
    try {
        loading.setLoading(true)
        const formData = new FormData();
        formData.append('Id', props.itemEdit?props.itemEdit.id:null);
        formData.append('Name', name.value);
        if (props.itemEdit == null) {
            const data = await categoryServiceApi.create(formData);
            console.log(data)
            if (!data.success) {
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
            console.log(formData)
            const data = await categoryServiceApi.update(props.itemEdit.id, formData);
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
    props.itemEdit = null
}


const close = () => {
    emit('close')
    resetForm()
}
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