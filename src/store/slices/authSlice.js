import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
      state.isAuthenticated = true
      // Store auth state in localStorage for persistence
      localStorage.setItem('auth', JSON.stringify({ user, token }))
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      // Clear auth state from localStorage
      localStorage.removeItem('auth')
    },
    // Initialize auth state from localStorage
    initAuth: (state) => {
      const auth = localStorage.getItem('auth')
      if (auth) {
        const { user, token } = JSON.parse(auth)
        state.user = user
        state.token = token
        state.isAuthenticated = true
      }
    },
  },
})

export const { setCredentials, logout, initAuth } = authSlice.actions
export default authSlice.reducer