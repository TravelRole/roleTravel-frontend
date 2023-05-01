import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getUserInfo } from "./userSlice";
import { getIsGoogleLogin } from "../Login/authSlice";

const Social = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = new URL(window.location.href); //window.location.href: 현재 url을 가져온다.
  const accessToken = url.searchParams.get("accessToken");
  localStorage.setItem("accessToken", accessToken);
  dispatch(getUserInfo());
  if (accessToken) {
    return <Navigate to="/spaceList" state={{ isGoogleSuccess: true }} />;
  }
  return <Navigate to="/login" />;

  // return
  // if (accessToken) {

  //   // return <Navigate to="/:userid" state={{ isGoogleSuccess: true }} />;
  // } else {

  // }
};

export default Social;
