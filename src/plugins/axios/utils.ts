import { HttpStatus, PageName } from "@/common/contant/contants";
import localStorageAuthService from "@/common/storages/authStorage";
import axios from "axios";
import { showWarningsNotification } from "@/common/helper/helpers";
import router from "@/router";

export const logout = (redirectToLogin = true) => {
  showWarningsNotification("Hết phiên đăng nhập. Vui lòng đăng nhập lại");
  localStorageAuthService.removeAll();
  const currentPage = router.currentRoute;
  if (redirectToLogin && currentPage.value.name !== PageName.LOGIN_PAGE) {
    sessionStorage.setItem("redirect", currentPage.value.fullPath);
    router
      .push({ name: PageName.LOGIN_PAGE })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  }
};

export const sendRefreshToken = async () => {
  let response;
  try {
    const API_URL = "http://localhost:5058/api";
    response = await axios.get(
      `${API_URL}/Auth/refresh/${localStorageAuthService.getRefreshToken()}`
    );
    if (response?.status === HttpStatus.OK) {
      localStorageAuthService.setAccessToken(
        response.data.data.accessToken.token
      );
      localStorageAuthService.setAccessTokenExpiredAt(
        response.data.data.accessToken.expiresIn
      );
      localStorageAuthService.setRefreshToken(
        response.data.data.refreshToken.token
      );
      localStorageAuthService.setRefresh_TokenExpiredAt(
        response.data.data.refreshToken.expiresIn
      );
      return;
    }
    logout(true);
    return;
  } catch (error) {
    // alert("lỗi lấy lại token")
    logout(true);
    return;
  }
};
