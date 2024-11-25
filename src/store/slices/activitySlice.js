import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activities: [],
  loading: false,
  error: null,
}

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    addActivity: (state, action) => {
      state.activities.unshift({
        ...action.payload,
        timestamp: new Date().toISOString(),
      })
    },
    setActivities: (state, action) => {
      state.activities = action.payload
    },
    clearActivities: (state) => {
      state.activities = []
    },
  },
})

export const { addActivity, setActivities, clearActivities } = activitySlice.actions
export default activitySlice.reducer