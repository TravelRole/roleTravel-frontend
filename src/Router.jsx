import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Landing from "./features/Landing/Landing";
import Login from "./features/Login/Login";
import Sign from "./features/Sign/Sign";

const routers = [
  {
    id: 0,
    path: "/landing",
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
