import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentCompany: null,
  companies: [],
  loading: false,
  error: null,
}

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCurrentCompany: (state, action) => {
      state.currentCompany = action.payload
    },
    setCompanies: (state, action) => {
      state.companies = action.payload
    },
    addCompany: (state, action) => {
      state.companies.push(action.payload)
    },
    updateCompany: (state, action) => {
      const index = state.companies.findIndex(c => c.id === action.payload.id)
      if (index !== -1) {
        state.companies[index] = action.payload
      }
    },
    deleteCompany: (state, action) => {
      state.companies = state.companies.filter(c => c.id !== action.payload)
    },
  },
})

export const {
  setCurrentCompany,
  setCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
} = companySlice.actions

export default companySlice.reducer