// Importing necessary modules and functions
import { message } from "./events/message"
import { open } from "./events/open"
import { close } from "./events/close"
import { error } from "./events/error"
import { state } from "+local" // Assuming this module is defined elsewhere

// Authentication variables
const app_id = import.meta.env.VITE_APP_ID // App ID for authentication
const url = import.meta.env.VITE_BRO // Base URL for WebSocket connection

// URI for connecting to the WebSocket server
const uri = `${url}${app_id}` // Constructing the complete WebSocket URI

/**
 * Function to establish a WebSocket connection
 */
const connect = () => {
  console.log(" :: socket comprador iniciado")

  // Creating a new WebSocket instance
  const ws = new WebSocket(uri)

  // Assigning event handlers for WebSocket events
  ws.onopen = open // Event handler for when the connection is opened
  ws.onclose = close // Event handler for when the connection is closed
  ws.onerror = error // Event handler for WebSocket errors
  ws.onmessage = message // Event handler for incoming messages

  // Storing the WebSocket instance in the state for further reference
  state.WebSockets.comprador = ws // Assuming "state.WebSockets.comprador" is used elsewhere
}

/**
 * Default function to initiate the WebSocket connection
 */
export default connect
