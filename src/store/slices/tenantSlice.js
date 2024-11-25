import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tenants: [],
  loading: false,
  error: null,
  statements: {}, // Store monthly statements by property
}

const tenantSlice = createSlice({
  name: 'tenants',
  initialState,
  reducers: {
    setTenants: (state, action) => {
      state.tenants = action.payload
      state.loading = false
      state.error = null
    },
    addTenant: (state, action) => {
      state.tenants.push(action.payload)
    },
    updateTenant: (state, action) => {
      const index = state.tenants.findIndex(t => t.id === action.payload.id)
      if (index !== -1) {
        state.tenants[index] = action.payload
      }
    },
    deleteTenant: (state, action) => {
      state.tenants = state.tenants.filter(t => t.id !== action.payload)
    },
    updateBalances: (state) => {
      // Update balances on the 1st of each month
      state.tenants = state.tenants.map(tenant => ({
        ...tenant,
        balanceType: 'CD', // Change from BF to CD
        balance: tenant.balance + tenant.rentAmount // Add current month's rent
      }))
    },
    saveMonthlyStatement: (state, action) => {
      const { propertyId, month, statement } = action.payload
      if (!state.statements[propertyId]) {
        state.statements[propertyId] = {}
      }
      state.statements[propertyId][month] = statement
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const {
  setTenants,
  addTenant,
  updateTenant,
  deleteTenant,
  updateBalances,
  saveMonthlyStatement,
  setLoading,
  setError,
} = tenantSlice.actions

export default tenantSlice.reducer