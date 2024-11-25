import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import { useSelector } from 'react-redux'

export function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      
      {isAuthenticated && (
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      
      <main className={`flex-grow ${!isLandingPage ? 'py-10' : ''}`}>
        <div className={`${!isLandingPage ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : ''}`}>
          {children || <Outlet />}
        </div>
      </main>

      <Footer />
    </div>
  )
}