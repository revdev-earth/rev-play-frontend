import { Component, ErrorInfo, ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Manejar el error aquí
    this.setState({ hasError: true, error, errorInfo })
    console.log(`Error cached : `, error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state
      // Devuelve el comportamiento de manejo de errores personalizado
      return (
        <div
          style={{
            maxWidth: "80vw",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "2rem 0",
            overflowY: "scroll"
          }}
        >
          <h1>¡Oops! Algo salió mal.</h1>
          <pre>{JSON.stringify(error, null, 2)}</pre>
          {/* <pre>{JSON.stringify(errorInfo, null, 2)}</pre> */}
          <pre>{errorInfo?.componentStack}</pre>
        </div>
      )
      return
    }

    // Devuelve el contenido del componente
    return this.props.children
  }
}
