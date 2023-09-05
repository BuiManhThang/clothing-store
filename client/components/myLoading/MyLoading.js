'use client'
import styles from './MyLoading.module.css'
import { twMerge } from 'tailwind-merge'
import { LoadingType } from '@/enumerations/enumerations'

const MyLoading = ({
  type,
  overlayColor,
  className = '',
  isShowOverlay = true,
  width = 24,
  height = 24,
}) => {
  if (typeof width === 'number') width = `${width}px`
  if (typeof height === 'number') height = `${height}px`
  return (
    <div
      className={twMerge(
        `w-full h-full flex items-center justify-center ${isShowOverlay && 'bg-black/30'}`,
        className
      )}
    >
      <div
        style={{
          width,
          height,
          backgroundColor: overlayColor,
        }}
        className={`rounded-full border-t-[3px] border-b-[3px] border-l-[3px] border-r-[3px] border-l-transparent border-r-transparent animate-spin ${
          type === LoadingType.Secondary
            ? 'border-t-black-text border-b-black-text'
            : type === LoadingType.Special
            ? 'border-t-black-text border-b-black-text'
            : 'border-t-white border-b-white'
        }`}
      ></div>
    </div>
  )
}

export default MyLoading
