import { createSlice } from '@reduxjs/toolkit'

export const inputErrorTooltipSlice = createSlice({
  name: 'inputErrorTooltip',
  initialState: {
    isActive: false,
  },
  reducers: {
    setTooltipState: (state, action) => {
      state.isActive = action.payload
    },
  },
})

export const { setTooltipState } = inputErrorTooltipSlice.actions

export default inputErrorTooltipSlice.reducer
