'use client'
import { Transition } from '@headlessui/react'
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { PopoverPosition } from '@/enumerations/enumerations'

const DEFAULT_POPOVER_POSITION = {
  x: PopoverPosition.Center,
  y: PopoverPosition.Bottom,
  isOuterX: true,
  isOuterY: true,
  offsetX: 0,
  offsetY: 0,
}

const MyPopover = forwardRef(
  (
    {
      children,
      isOpen,
      onClickOutSide,
      content,
      popoverClassName,
      popoverPosition = { ...DEFAULT_POPOVER_POSITION },
      popoverRef,
      ...props
    },
    ref
  ) => {
    const popoverPositionProp = { ...DEFAULT_POPOVER_POSITION, ...popoverPosition }
    const targetRef = useRef(null)
    const popoverRefComponent = popoverRef ? popoverRef : useRef(null)
    const [domReady, setDomReady] = useState(false)
    const [isShowTmp, setIsShowTmp] = useState(false)
    const [popoverStyle, setPopoverStyle] = useState({})

    useImperativeHandle(ref, () => ({
      reCalculatePopoverPosition: () => {
        calculatePopoverPosition()
      },
    }))

    useEffect(() => {
      setDomReady(true)
    }, [])

    useEffect(() => {
      if (isOpen) {
        window.addEventListener('click', handleClickOutSide)
      } else {
        window.removeEventListener('click', handleClickOutSide)
      }

      return () => {
        window.removeEventListener('click', handleClickOutSide)
      }
    }, [isOpen])

    const handleClickOutSide = (e) => {
      if (popoverRefComponent.current && popoverRefComponent.current.contains(e.target)) return
      if (targetRef.current && targetRef.current.contains(e.target)) return
      if (typeof onClickOutSide !== 'function') return
      onClickOutSide()
    }

    const calculatePopoverPosition = () => {
      const { top, left, width, height } = targetRef.current?.getBoundingClientRect() || {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      }
      const { width: popoverWidth, height: popoverHeight } =
        popoverRefComponent.current?.getBoundingClientRect() || { width: 0, height: 0 }

      let popoverTop = 0
      let popoverLeft = 0
      if (popoverPositionProp.isOuterX) {
        if (popoverPositionProp.x === PopoverPosition.Center) {
          popoverLeft = left + width / 2 - popoverWidth / 2
        } else if (popoverPositionProp.x === PopoverPosition.Left) {
          popoverLeft = left - popoverWidth
          if (popoverLeft < 0) {
            if (popoverPositionProp.y === PopoverPosition.Center || !popoverPositionProp.isOuterY) {
              popoverLeft = left + width
            } else if (
              popoverPositionProp.y === PopoverPosition.Top ||
              popoverPositionProp.y === PopoverPosition.Bottom
            ) {
              popoverLeft = 0
            }
          }
        } else if (popoverPositionProp.x === PopoverPosition.Right) {
          popoverLeft = left + width
          if (popoverLeft + popoverWidth > window.innerWidth) {
            if (popoverPositionProp.y === PopoverPosition.Center || !popoverPositionProp.isOuterY) {
              popoverLeft = left - popoverWidth
            } else if (
              popoverPositionProp.y === PopoverPosition.Top ||
              popoverPositionProp.y === PopoverPosition.Bottom
            ) {
              popoverLeft = window.innerWidth - popoverWidth
            }
          }
        }
      } else {
        if (popoverPositionProp.x === PopoverPosition.Center) {
          popoverLeft = left + width / 2 - popoverWidth / 2
        } else if (popoverPositionProp.x === PopoverPosition.Left) {
          popoverLeft = left
        } else if (popoverPositionProp.x === PopoverPosition.Right) {
          popoverLeft = left + width - popoverWidth
        }
      }

      if (popoverPositionProp.isOuterY) {
        if (popoverPositionProp.y === PopoverPosition.Center) {
          popoverTop = top + height / 2 - popoverHeight / 2
        } else if (popoverPositionProp.y === PopoverPosition.Bottom) {
          popoverTop = top + height
          if (popoverTop + popoverHeight > window.innerHeight) {
            if (popoverPositionProp.x === PopoverPosition.Center || !popoverPositionProp.isOuterX) {
              popoverTop = top - popoverHeight
            } else if (
              popoverPositionProp.x === popoverPosition.Left ||
              popoverPositionProp.x === PopoverPosition.Right
            ) {
              popoverTop = window.innerHeight - popoverHeight
            }
          }
        } else if (popoverPositionProp.y === PopoverPosition.Top) {
          popoverTop = top - popoverHeight
          if (popoverTop < 0) {
            if (popoverPositionProp.x === PopoverPosition.Center || !popoverPositionProp.isOuterX) {
              popoverTop = top + height
            } else if (
              popoverPositionProp.x === popoverPosition.Left ||
              popoverPositionProp.x === PopoverPosition.Right
            ) {
              popoverTop = 0
            }
          }
        }
      } else {
        if (popoverPositionProp.y === PopoverPosition.Center) {
          popoverTop = top + height / 2 - popoverHeight / 2
        } else if (popoverPositionProp.y === PopoverPosition.Bottom) {
          popoverTop = top + height - popoverHeight
        } else if (popoverPositionProp.y === PopoverPosition.Top) {
          popoverTop = top
        }
      }

      if (popoverTop + popoverHeight <= top) {
        popoverTop -= 2
      }

      popoverTop += popoverPositionProp.offsetY
      popoverLeft += popoverPositionProp.offsetX

      setPopoverStyle({
        top: `${parseInt(popoverTop)}px`,
        left: `${parseInt(popoverLeft)}px`,
      })
      setIsShowTmp(true)
    }

    const handleBeforeEnter = () => {
      calculatePopoverPosition()
    }

    const handleAfterLeave = () => {
      setIsShowTmp(false)
    }

    if (!domReady) return null

    return (
      <div ref={targetRef} {...props}>
        {children}
        {createPortal(
          <>
            {isShowTmp && <div className="w-[1px] h-[1px] opacity-0 invisible"></div>}
            <Transition
              show={isOpen}
              enter="transition-all duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
              beforeEnter={handleBeforeEnter}
              afterLeave={handleAfterLeave}
            >
              <div
                ref={popoverRefComponent}
                className={twMerge('fixed p-2 rounded bg-white shadow-around', popoverClassName)}
                style={popoverStyle}
              >
                {content}
              </div>
            </Transition>
          </>,
          document.querySelector('#my-popover-container')
        )}
      </div>
    )
  }
)

export default MyPopover
