'use client'
import MyTooltip from './MyTooltip'
import { useInputErrorTooltip } from '@/app/hooks/inputErrorTooltip'

const MyTooltipContainer = () => {
  const { isActive: isActiveInputErrorTooltip } = useInputErrorTooltip()

  return (
    <div className="my-tooltip-container">
      <MyTooltip id="my-tooltip" />
      <MyTooltip id="my-tooltip-input-error-hover" className={'my-tooltip-error'} />
      <MyTooltip
        id="my-tooltip-input-error-focus"
        className={'my-tooltip-error'}
        isOpen={isActiveInputErrorTooltip}
      />
    </div>
  )
}

export default MyTooltipContainer
