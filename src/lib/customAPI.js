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

tokenApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    try {
      const { message, response, config } = error;
      const originalRequest = config;
      // const refreshToken = cookies.get("refreshToken")
      if (localStorage.getItem("accessToken")) {
        await axios
          .post(
            `${process.env.REACT_APP_BASE_URL}auth/refresh`,
            {
              accessToken: localStorage.getItem("accessToken"),
            },
            {
              withCredentials: true,
              // 이렇게 보내보고 안된다면 쿠키에서 refreshToken 꺼내기
            },
            {
              XMLHttpRequest: true,
            }
          )
          .then((res) => {
            originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
            localStorage.setItem("accessToken", res.data.accessToken);
            return axios(originalRequest);
          })
          .catch((error) => {
            if (
              error.response.status === 401 ||
              error.response.status === 403
            ) {
              const cookies = new Cookies();
              localStorage.removeItem("accessToken");
              cookies.remove("refreshToken");

              if (!localStorage.getItem("accessToken")) {
                window.location.replace("/login");
              }
            }
          });
      }
    } catch (error) {
      return error;
    }
    return error;
  }
);

export default tokenApi;
