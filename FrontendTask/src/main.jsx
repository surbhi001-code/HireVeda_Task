import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App.jsx'
import { CandidatesProvider } from './context/CandidatesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CandidatesProvider>
        <App />
        <ToastContainer
          position="bottom-right"
          autoClose={2800}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="colored"
        />
      </CandidatesProvider>
    </BrowserRouter>
  </StrictMode>,
)
