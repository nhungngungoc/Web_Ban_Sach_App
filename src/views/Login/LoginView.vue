<template>
    <div>
        <v-card class="mx-auto pa-12 pb-8" variant="flat" max-width="500" rounded="lg">
            <v-img class="mx-auto my-1" max-width="200" height="200"
                :src="logo"></v-img>
            <div style="font-weight: 600;" class="text-h4 text-center">
                Đăng nhập
            </div>
            <v-form @submit.prevent="loginform.handleLogin" @keyup.enter="loginform.handleLogin">
                <div class="text-subtitle-1 text-medium-emphasis">Email</div>
                <v-text-field v-model="loginform.email" type="email" :error-messages="loginform.emailError" required
                    density="compact" placeholder="Nhập email" variant="outlined"></v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Mật khẩu
                </div>
                <v-text-field v-model="loginform.password" :error-messages="loginform.passwordError" required
                    :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'" :type="visible ? 'text' : 'password'"
                    density="compact" placeholder="Nhập mật khẩu" variant="outlined"
                    @click:append-inner="visible = !visible"></v-text-field>
                <div class="d-flex justify-space-between align-center">
                    <v-checkbox style="font-size: 14px;" v-model="terms" color="secondary"
                        label="Ghi nhớ Đăng nhập"></v-checkbox>
                    <a style="font-size: 14px;font-weight: 600;color: #0F60FF;"
                        class="text-caption text-decoration-none mb-6">
                        Quên mật khẩu?</a>
                </div>
                <v-btn style="font-size: 16px;" class="text-capitalize mb-8" @click="loginform.handleLogin"
                    @enter="loginform.handleLogin" block color="#0F60FF" size="large">
                    Đăng<span style="margin-left: 2px;" class="text-lowercase">Nhập</span>
                </v-btn>
            </v-form>
            <div class="text-center">
                Bạn chưa có tài khoản ?
                <router-link to="/register" class="text-decoration-none text-center" style="color:#0F60FF;">
                    Đăng ký ?
                </router-link>
            </div>
        </v-card>
    </div>
</template>
<script setup>
import logo from '@/assets/logoweb.jpg'
import { reactive, ref } from 'vue';
import { userLoginForm } from './loginform.ts'
const loginform = reactive(userLoginForm());
const visible = ref(false)
const terms = ref('')











// import { useForm, useField } from 'vee-validate';
// // import * as yup from 'yup';

// const visible = ref(false)
// const terms = ref('')

// // const { handleSubmit} = useForm();


// // const { value: email, errorMessage: emailError } = useField(
// //     'email',
// //     yup.string().required("Không được bỏ trống").email("Email không phù hợp")
// // );

// // const { value: password, errorMessage: passwordError } = useField(
// //     'password',
// //     yup.string().required("Không được bỏ trống").min(6, "Chưa đủ 6 ký tự").max(64,"Mật khẩu không vượt quá 64 ký tự")
// //     .matches(
// //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
// //       "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một số"
// //     ),
// // );
// // const login = handleSubmit(async () => {
// //     alert(email.value+ "   "+password.value)
// //     console.log('Logging in with:', email, password);
// // });
</script>
<style scoped>
* {
    font-family: 'Public Sans', sans-serif;
}
</style>