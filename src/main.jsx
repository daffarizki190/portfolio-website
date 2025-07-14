import React from "react"
import ReactDOM from "react-dom/client"
import { HelmetProvider } from 'react-helmet-async'
import App from "./App.jsx"
import ErrorBoundary from "./components/ErrorBoundary.jsx"
import Analytics from "./components/Analytics.jsx"

import "./index.css"



if (import.meta.env.PROD) {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0]
    if (perfData) {
      console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms')
    }
  })
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<HelmetProvider>
			<ErrorBoundary>
				<Analytics />
				<App />
			</ErrorBoundary>
		</HelmetProvider>
	</React.StrictMode>,
)
