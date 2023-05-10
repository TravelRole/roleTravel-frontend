import axios from "axios";
import Cookies from "universal-cookie";

export const authApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

const tokenApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

tokenApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (accessToken) => {
  refreshSubscribers.map((cb) => cb(accessToken));
};

tokenApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response, config } = error;
    const { status } = response || {};
    const { message } = response?.data || {};
    const originalRequest = config;

    if (
      (message === "유효하지 않은 토큰입니다." ||
        message === "인증에 실패하였습니다.") &&
      status === 401
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_BASE_URL}api/refresh`,
            { accessToken: localStorage.getItem("accessToken") },
            { withCredentials: true }
          );
          const newAccessToken = res.data.accessToken;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          localStorage.setItem("accessToken", newAccessToken);
          onRefreshed(newAccessToken);
          return axios(originalRequest);
        } catch (error) {
          const cookies = new Cookies();
          localStorage.removeItem("accessToken");
          cookies.remove("refreshToken");
          if (!localStorage.getItem("accessToken")) {
            window.alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
            return window.location.replace("/login");
          }
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve) => {
          subscribeTokenRefresh((accessToken) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            resolve(axios(originalRequest));
          });
        });
      }
    }
    return Promise.reject(error);
  }
);

export default tokenApi;
