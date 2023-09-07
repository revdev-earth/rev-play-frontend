import {
  RouteObject,
  RouterProvider,
  createBrowserRouter
} from "react-router-dom"

import Home from "./routes/Home"
// import Auth from "./routes/Auth"

import ProxyRoot from "./fragments/ProxyRoot"

import Access from "./routes/Access"
import Trade from "./routes/Trade"
import Instructions from "./routes/public_routes/Instructions"
import LicenseAgreement from "./routes/public_routes/License Agreement"
import PropertyRecognitionAgreementAndUserCommitment from "./routes/public_routes/Property Recognition and user commitment"
import PrivacyPolicy from "./routes/public_routes/Privacy Policy"
import Deriv from "./routes/Deriv"
import ProxyCleaner from "./fragments/ProxyCleaner"

import Register1 from "./routes/Register1"
import Register2 from "./routes/Register2"
import Login from "./routes/Login"
import ResetPassword1 from "./routes/ResetPassword1"
import ResetPassword2 from "./routes/ResetPassword2"
import PDF from "./routes/PDF"

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
    path: "reset-password-1",
    element: <ProxyCleaner />,
    children: [
      {
        index: true,
        element: <ResetPassword1 />
      }
    ]
  },

  {
    path: "reset-password-2",
    element: <ProxyCleaner />,
    children: [
      {
        index: true,
        element: <ResetPassword2 />
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
        path: "license_agreement",
        element: <LicenseAgreement />
      },
      {
        path: "property_recognition_agreement_and_user_commitment",
        element: <PropertyRecognitionAgreementAndUserCommitment />
      },
      {
        path: "privacy_policy",
        element: <PrivacyPolicy />
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
