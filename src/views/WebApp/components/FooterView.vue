<template>
    <div class="w-100">
        <div style="background-color: black;" class="w-100 d-flex align-center justify-space-around">
            <div class="text-h6 d-flex pa-4" style="color: white; ">
                <v-icon>mdi mdi-email</v-icon>
                <p>ĐĂNG KÝ NHẬN BẢN TIN</p>
            </div>
            <div class="d-flex align-center">
                <input type="text" style="background-color: white;height: 32px;width: 300px;">
                <v-btn class="ml-1" style="color: white;background-color: #cccc;" variant="outlined">
                    Đăng ký
                </v-btn>
            </div>
        </div>
        <div style="background-color: white;" class="d-flex px-2 py-3">
            <div style="width: 30%;" class="pa-5">
                <img class="mt-5" width="300" height="100" src="https://pibook.vn/upload/logo-trong-suot%202.png"
                    alt="">
                <p>Địa chỉ: Yên Phong Bắc Ninh</p>
            </div>
            <div style="width: 70%;">
                <table style="width: 100%;">
                    <thead>
                        <tr>
                            <th>Dịch vụ</th>
                            <th>Hỗ trợ</th>
                            <th>Tài khoản của tôi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Điều khoản sử dụng</td>
                            <td>Chính sách đổi - trả - hoàn tiền</td>
                            <td>Đăng nhập/Tạo tài khoản mới</td>
                        </tr>
                        <tr>
                            <td>Chính sách bảo mật</td>
                            <td>Phương thức vận chuyển</td>
                            <td>Thay đổi địa chỉ khách hàng</td>
                        </tr>
                        <tr>
                            <td>Giới thiệu Pibook</td>
                            <td>Phương thức thanh toán</td>
                            <td>Lịch sử mua hàng </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<style scoped>
th {
    text-align: left;
    padding: 5px;

}

td {
    padding: 5px;
}
</style>