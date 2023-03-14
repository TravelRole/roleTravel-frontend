import React from "react";
import { Route, RouterProvider } from "react-router-dom";
import { Routes } from "react-router-dom";
import Landing from "./features/Landing/Landing";
import Login from "./features/Login/Login";
import Sign from "./features/Sign/Sign";
import { BrowserRouter } from "react-router-dom";
import TeamSpace from "./Component/TeamSpace"
import NotFound from "./features/NotFound/Notfound";
import SpaceList from "./features/SpaceList/SpaceList";
import Authorization from "./features/Authorization/Authorization";

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
    withAuth: false,
  },
  {
    id: 3,
    path: "/:UserId",
    label: "SpaceList",
    element: <SpaceList Auth={false} />,
    withAuth: true,
  },
  {
    id: 4,
    path: "/:UserId/:Spacenumber/:role",
    label: "TeamSpace",
    element: <TeamSpace Auth={false} />,
    withAuth: true,
  },
  {
    id: 5,
    path: "*",
    label: "notFound",
    element: <NotFound />,
    withAuth: true,
  },
];

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routers.map((item) => {
          return (
            <Route key={item.id} path={item.path} element={item.element} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
