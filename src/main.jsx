import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { store } from './store'
import { initAuth } from './store/slices/authSlice'
import { initializeTestData } from './utils/testData'
import './index.css'

// Initialize theme from localStorage or system preference
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = savedTheme || (prefersDark ? 'dark' : 'light')
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  }
  store.dispatch({ type: 'ui/setTheme', payload: theme })
  return theme
}

// Initialize auth state from localStorage
store.dispatch(initAuth())

// Initialize test data in development
if (process.env.NODE_ENV === 'development') {
  initializeTestData(store)
}

initializeTheme()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster position="top-right" />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)