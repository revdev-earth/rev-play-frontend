//

import { createRoot } from "react-dom/client"

import { Provider } from "+redux"

import { Router } from "./Router"
import { ErrorBoundary } from "ErrorBundary"

import "./styles"

const root = document.getElementById("root") as HTMLDivElement

fetch(import.meta.env.VITE_BACK_URL)

createRoot(root).render(
  <ErrorBoundary children={<Provider {...{ children: Router }} />} />
)
