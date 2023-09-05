import { setTooltipState } from '@/redux/features/inputErrorTooltipSlice'
import { useDispatch, useSelector } from 'react-redux'

export const useInputErrorTooltip = () => {
  const dispatch = useDispatch()
  const isActive = useSelector((state) => state.inputErrorTooltip.isActive)

  const setIsActive = (state) => {
    dispatch(setTooltipState(state))
  }

  return { isActive, setIsActive }
}
