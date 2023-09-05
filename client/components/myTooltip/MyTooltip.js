'use client'
import { Tooltip } from 'react-tooltip'
import { twMerge } from 'tailwind-merge'

const MyTooltip = ({ id, className, isOpen }) => {
  return <Tooltip id={id} className={twMerge('z-50', className)} isOpen={isOpen}></Tooltip>
}

export default MyTooltip
