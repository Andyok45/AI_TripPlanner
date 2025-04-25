import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip'
import Header from './components/custom/Header'
import { Toaster } from 'sonner'
import React from 'react'
import FinalBudget from './final-budget'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './viewTrip/[tripId]'

const router = createBrowserRouter([
  {
  path: '/',
  element: <App />,
},{
  path: '/create-trip',
  element: <CreateTrip/>
},{
  path: '/final-budget',
  element: <FinalBudget/>
},{
  path: '/view-trip/:tripId',
  element: <ViewTrip/>
}])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router= {router}/>
    </GoogleOAuthProvider>

  </React.StrictMode>,
)
