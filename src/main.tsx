import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Minimal React entry point for build compatibility
// This Blazor project uses wwwroot/index.html as the actual entry point
const App = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Blazor WebAssembly App</h1>
      <p className="text-muted-foreground">
        This project has been converted to Blazor. 
        Please access the app through the Blazor entry point.
      </p>
    </div>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)