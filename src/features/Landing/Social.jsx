import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUserInfo } from "./userSlice";

const Social = () => {
  const dispatch = useDispatch();
  const url = new URL(window.location.href); //window.location.href: 현재 url을 가져온다.
  const accessToken = url.searchParams.get("accessToken");
  localStorage.setItem("accessToken", accessToken);
  dispatch(getUserInfo());
  if (accessToken) {
    return <Navigate to="/landing" />;
  } else {
    return <Navigate to="/landing" />;
  }
};

export default Social;
