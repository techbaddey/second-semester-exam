import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import App from './App'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter><React.StrictMode>
    <HelmetProvider>
		<App />
    </HelmetProvider>
	</React.StrictMode></BrowserRouter>
	
)