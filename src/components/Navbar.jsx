import { Menu, Building2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { logout } from '../store/slices/authSlice'
import { ThemeToggle } from './ThemeToggle'
import { CompanySelector } from './CompanySelector'

export function Navbar({ onMenuClick }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const isLandingPage = location.pathname === '/'

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {isAuthenticated && (
              <button
                type="button"
                className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
                onClick={onMenuClick}
              >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" />
              </button>
            )}
            
            <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center">
              <Building2 className="h-8 w-8 text-primary-600 mr-2" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Njagua</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <>
                <CompanySelector />
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Login
                </Link>
                {!isLandingPage && (
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}