import axios from "axios";
import { setAccessToken } from "./redux/authSlice";
import { Cookies, useCookies } from "react-cookie";

const cookies = new Cookies();

const api = axios.create({
  baseURL: "https://my-api.com",
});

api.interceptors.request.use(async (config) => {
  const { accessToken, refreshToken } = cookies.get([
    "accessToken",
    "refreshToken",
  ])[0];
  config.headers.Authorization = `Bearer ${accessToken}`;

  try {
    // accessToken 유효성 검사
    await axios.get("/api/auth/validate", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return config;
  } catch (error) {
    if (error.response.status === 401) {
      // accessToken 만료됨
      try {
        const response = await axios.post("/api/auth/refresh", {
          refreshToken,
        });
        const newAccessToken = response.data.accessToken;
        setCookie("accessToken", newAccessToken, { path: "/" });
        setAccessToken(newAccessToken);

        // 이전 요청 재시도
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return config;
      } catch (error) {
        // refreshToken 만료됨
        console.error("로그인이 필요합니다.");
        throw error;
      }
    } else {
      throw error;
    }
  }
});
