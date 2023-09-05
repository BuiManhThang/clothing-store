'use client'
import { ButtonType, LoadingType, TooltipType } from '@/enumerations/enumerations'
import MyLoading from '../myLoading/MyLoading'
import MyTooltipWrapper from '../myTooltip/MyTooltipWrapper'

const MyButtonTemplate = ({ children, type, disabled, onClick, isLoading }) => {
  let loadingType = LoadingType.Primary
  if (type === ButtonType.Secondary) loadingType = LoadingType.Secondary
  else if (type === ButtonType.Special) loadingType = LoadingType.Special

  const handleClick = (e) => {
    if (disabled || isLoading) return
    if (typeof onClick === 'function') onClick(e)
  }

  return (
    <button
      className={`relative h-12 rounded-[48px] px-9 flex items-center font-medium ${
        type === ButtonType.Secondary
          ? 'bg-white text-black-text border border-black-text'
          : type === ButtonType.Special
          ? 'bg-primary text-black-text border'
          : 'bg-black text-white'
      } disabled:opacity-70 disabled:cursor-default`}
      style={{
        color: isLoading ? 'transparent' : null,
        fill: isLoading ? 'transparent' : null,
      }}
      disabled={disabled || isLoading}
      onClick={handleClick}
    >
      {children}
      {isLoading && (
        <div className="absolute w-full h-full top-0 left-0 rounded-[48px] overflow-hidden">
          <MyLoading type={loadingType} isShowOverlay={false} />
        </div>
      )}
    </button>
  )
}

const MyButton = ({
  children,
  type,
  disabled,
  onClick,
  isLoading,
  tooltip,
  tooltipType = TooltipType.Dark,
}) => {
  if (tooltip)
    return (
      <MyTooltipWrapper content={tooltip} type={tooltipType}>
        <MyButtonTemplate type={type} disabled={disabled} isLoading={isLoading} onClick={onClick}>
          {children}
        </MyButtonTemplate>
      </MyTooltipWrapper>
    )

  return (
    <MyButtonTemplate type={type} disabled={disabled} isLoading={isLoading} onClick={onClick}>
      {children}
    </MyButtonTemplate>
  )
}

export default MyButton
