import {
  RouteObject,
  RouterProvider,
  createBrowserRouter
} from "react-router-dom"

import Home from "./routes/Home"
import Auth from "./routes/Auth"

import ProxyRoot from "./fragments/ProxyRoot"

import Access from "./routes/Access"
import Trade from "./routes/Trade"
import Instructions from "./routes/public_route/Instructions"
import TermsAndConditions from "./routes/public_route/TermsAndConditions"
import Deriv from "./routes/Deriv"
import ProxyCleaner from "./fragments/ProxyCleaner"

import Register1 from "./routes/Register1"
import Register2 from "./routes/Register2"
import Login from "./routes/Login"

const Interactua = Home
const Sorteos = Home
const Public = Home
const NotFound = Home

const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProxyCleaner />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },

  // {
  //   path: "auth",
  //   element: <ProxyCleaner />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Auth />
  //     }
  //   ]
  // },

  {
    path: "login",
    element: <ProxyCleaner />,
    children: [
      {
        index: true,
        element: <Login />
      }
    ]
  },

  {
    path: "register1",
    element: <ProxyCleaner />,
    children: [
      {
        index: true,
        element: <Register1 />
      }
    ]
  },

  {
    path: "register2",
    element: <ProxyCleaner />,
    children: [
      {
        index: true,
        element: <Register2 />
      }
    ]
  },

  {
    path: "/",
    element: <ProxyRoot />,
    children: [
      {
        path: "deriv",
        element: <Deriv />
      },
      {
        path: "access",
        element: <Access />
      },

      {
        path: "trade",
        element: <Trade />
      }
    ]
  },

  {
    path: "public",
    element: <ProxyCleaner />,
    children: [
      {
        index: true,
        element: <Public />
      },
      {
        path: "terms_and_conditions",
        element: <TermsAndConditions />
      },
      {
        path: "participa",
        element: <Interactua />
      },
      {
        path: "sorteos",
        element: <Sorteos />
      },
      {
        path: "instructions",
        element: <Instructions />
      }
    ]
  },

  {
    path: "*",
    element: <ProxyCleaner />,
    children: [
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]

export const Router = (
  <RouterProvider {...{ router: createBrowserRouter(routes) }} />
)
