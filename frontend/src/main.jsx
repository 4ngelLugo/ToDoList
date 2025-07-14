import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Tareas from './views/Tareas.jsx'
import Login from './views/Login.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/inicio' replace />} />
        <Route path='/inicio' element={<Login />} />
        <Route path='/tareas' element={<Tareas />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
