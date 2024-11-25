import { useDispatch, useSelector } from 'react-redux'
import { Sun, Moon } from 'lucide-react'
import { toggleTheme } from '../store/slices/uiSlice'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui?.theme) || 'light'

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </motion.button>
  )
}