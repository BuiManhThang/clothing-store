'use client'
import { TooltipType } from '@/enumerations/enumerations'

const MyTooltipWrapper = ({
  className,
  children,
  content,
  contentHtml,
  dataTooltipId = 'my-tooltip',
  type = TooltipType.Dark,
}) => {
  return (
    <div
      className={className}
      data-tooltip-id={dataTooltipId}
      data-tooltip-content={content ? content : undefined}
      data-tooltip-html={contentHtml ? contentHtml : undefined}
      data-tooltip-variant={type}
    >
      {children}
    </div>
  )
}

export default MyTooltipWrapper
