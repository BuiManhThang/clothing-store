import { configureStore } from '@reduxjs/toolkit'
import inputErrorTooltipReducer from './features/inputErrorTooltipSlice'

export default configureStore({
  reducer: {
    inputErrorTooltip: inputErrorTooltipReducer,
  },
})
