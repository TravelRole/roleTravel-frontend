import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Landing from "./features/Landing/Landing";
import Login from "./features/Login/Login";
import SearchIdPw from "./features/SearchIDPW/SearchIdPw";
import Sign from "./features/Sign/Sign";

const routers = [
  {
    id: 0,
    path: "/",
    label: "Home",
    element: <Landing />,
    withAuth: false,
  },
  {
    id: 1,
    path: "/login",
    label: "Login",
    element: <Login />,
    withAuth: false,
  },
  {
    id: 2,
    path: "/sign",
    label: "Sign",
    element: <Sign />,
    withAuth: true,
  },
  {
    id: 3,
    path: "/searchIdPw",
    label: "SearchIdPw",
    element: <SearchIdPw />,
    withAuth: false,
  },
];

const Router = () => {
  return (
    <Routes>
      {routers.map((item) => (
        <Route path={item.path} element={item.element} />
      ))}
    </Routes>
  );
};

export default Router;
