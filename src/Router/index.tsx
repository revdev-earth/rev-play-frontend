import {
  RouteObject,
  RouterProvider,
  createBrowserRouter
} from "react-router-dom"

import Home from "./routes/Home"
import Auth from "./routes/Auth"

import { ProxyRoot } from "./fragments/ProxyRoot"
import Access from "./routes/Access"
import Trade from "./routes/Trade"

const Perfil = Home
const Interactua = Home
const Sorteos = Home
const Public = Home
const TermsAndConditions = Home
const NotFound = Home

const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },

  {
    path: "auth",
    children: [
      {
        index: true,
        element: <Auth />
      }
    ]
  },

  {
    path: "/",
    element: <ProxyRoot />,
    children: [
      {
        path: "login",
        element: <Access />
      },
      {
        path: "access",
        element: <Access />
      },

      {
        path: "trade",
        element: <Trade />
      },

      {
        path: "perfil",
        element: <Perfil />
      }
    ]
  },

  {
    path: "public",
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
      }
    ]
  },

  {
    path: "*",
    element: <NotFound />
  }
]

export const Router = (
  <RouterProvider {...{ router: createBrowserRouter(routes) }} />
)
