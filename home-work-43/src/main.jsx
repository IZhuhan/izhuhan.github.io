import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/home-work-43">
    <App />
  </BrowserRouter>
)
