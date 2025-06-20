import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router";
import { router } from './Router/Router.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className=' bg-gray-100/45 pt-10'>
    <div className='font-urbanist max-w-11/12 mx-auto'>
      <RouterProvider router={router} />
    </div>
    </div>
  </StrictMode>,
)
