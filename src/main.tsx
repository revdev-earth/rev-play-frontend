import { createRoot } from "react-dom/client"

import { Provider } from "+redux"

import { Router } from "./Router"
import { ErrorBoundary } from "ErrorBundary"

import "./styles"

const root = document.getElementById("root") as HTMLElement

createRoot(root).render(
  <ErrorBoundary>
    <Provider {...{ children: Router }} />
  </ErrorBoundary>
)
