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
      const { response, config } = error;
      const { status } = response;
      const { message } = response.data;
      const originalRequest = config;
      console.log(message);
      console.log(status);
      if (
        (message === "유효하지 않은 토큰입니다." ||
          message === "인증에 실패하였습니다.") &&
        status === 401
      ) {
        if (localStorage.getItem("accessToken")) {
          await axios
            .post(
              `${process.env.REACT_APP_BASE_URL}api/refresh`,
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
                (error.response.message === "인증에 실패하였습니다." ||
                  error.response.message === "인증에 실패하였습니다.") &&
                error.response.status === 401
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
      }
    } catch (error) {
      return error;
    }
    return error;
  }
);
// tokenApi.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     try {
//       const { message, response, config } = error;
//       console.log(response, message);
//       const originalRequest = config;
//       // const refreshToken = cookies.get("refreshToken")
//       if (localStorage.getItem("accessToken")) {
//         await axios
//           .post(
//             `${process.env.REACT_APP_BASE_URL}auth/refresh`,
//             {
//               accessToken: localStorage.getItem("accessToken"),
//             },
//             {
//               withCredentials: true,
//               // 이렇게 보내보고 안된다면 쿠키에서 refreshToken 꺼내기
//             },
//             {
//               XMLHttpRequest: true,
//             }
//           )
//           .then((res) => {
//             originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
//             localStorage.setItem("accessToken", res.data.accessToken);
//             return axios(originalRequest);
//           })
//           .catch((error) => {
//             if (
//               error.response.status === 401 ||
//               error.response.status === 403
//             ) {
//               const cookies = new Cookies();
//               localStorage.removeItem("accessToken");
//               cookies.remove("refreshToken");

//               if (!localStorage.getItem("accessToken")) {
//                 window.location.replace("/login");
//               }
//             }
//           });
//       }
//     } catch (error) {
//       return error;
//     }
//     return error;
//   }
// );

export default tokenApi;
