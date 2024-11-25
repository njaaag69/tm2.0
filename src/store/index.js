import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import propertyReducer from './slices/propertySlice'
import tenantReducer from './slices/tenantSlice'
import uiReducer from './slices/uiSlice'
import companyReducer from './slices/companySlice'
import activityReducer from './slices/activitySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer,
    tenants: tenantReducer,
    ui: uiReducer,
    company: companyReducer,
    activity: activityReducer,
  },
})