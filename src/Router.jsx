import React from "react";
import { Route, RouterProvider } from "react-router-dom";
import { Routes } from "react-router-dom";
import Landing from "./features/Landing/Landing";
import SearchIdPw from "./features/SearchIDPW/SearchIdPw";
import Sign from "./features/Sign/Sign";
import { BrowserRouter } from "react-router-dom";
import NotFound from "./features/NotFound/NotFound";
import SpaceList from "./features/SpaceList/SpaceList";
import Authorization from "./features/Authorization/Authorization";
import TeamSpace from "./features/layout/TeamSpace";
import Social from "./features/Landing/Social";
import Login from "./features/Login/Login";
import SearchIdResult from "./features/SearchIDPW/layout/id/SearchIdResult";

import UserAccount from "./features/UserAccount/UserAccount";

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
    element: <SpaceList />,
    // element: <SpaceList Auth={true} />,
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
  {
    id: 6,
    path: "/searchIdPw",
    label: "SearchIdPw",
    element: <SearchIdPw />,
    withAuth: false,
  },
  {
    id: 7,
    path: "/searchIdPw/idResult",
    label: "SearchIdResult",
    element: <SearchIdResult />,
    withAuth: false,
  },
  {
    id: 8,
    path: "/landing/social",
    label: "LandingSocial",
    element: <Social />,
    withAuth: true,
  },
  {
    id: 9,
    path: "/account/:UserId/",
    label: "UserAccount",
    element: <UserAccount Auth={false} />,
    withAuth: true,
  },
];

const Router = () => {
  return (
    <Routes>
      {routers.map((item) => (
        <Route key={item.id} path={item.path} element={item.element} />
      ))}
    </Routes>
  );
};

export default Router;
