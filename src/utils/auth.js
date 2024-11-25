import Cookies from 'js-cookie'
import zxcvbn from 'zxcvbn'

export const TOKEN_KEY = 'auth_token'
export const USER_KEY = 'user_data'

export const setAuthToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { secure: true, sameSite: 'strict' })
}

export const getAuthToken = () => {
  return Cookies.get(TOKEN_KEY)
}

export const removeAuthToken = () => {
  Cookies.remove(TOKEN_KEY)
  Cookies.remove(USER_KEY)
}

export const checkPasswordStrength = (password) => {
  const result = zxcvbn(password)
  return {
    score: result.score,
    feedback: result.feedback,
  }
}

export const generateTwoFactorCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}