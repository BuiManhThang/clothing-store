'use client'
import { TextFieldType, PopoverPosition } from '@/enumerations/enumerations'
import { useRef, useState, forwardRef } from 'react'
import MyPopover from '../myPopover/MyPopover'
import { twMerge } from 'tailwind-merge'

const MyTextField = forwardRef(
  (
    {
      value,
      id,
      name,
      label,
      placeholder,
      error,
      endIcon,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onClickEndIcon,
      endIconClassName = '',
      textFieldType = TextFieldType.Primary,
      isLabelHorizontal = false,
      disabled = false,
      required = false,
      type = 'text',
    },
    ref
  ) => {
    const popoverRef = useRef(null)
    const inputRef = ref ? ref : useRef(null)
    const [isFocus, setIsFocus] = useState(false)
    const [isOpenPopover, setIsOpenPopover] = useState(false)

    const handleChange = (e) => {
      if (disabled) return
      if (typeof onChange !== 'function') return
      onChange(e)
    }

    const handleFocus = (e) => {
      setIsFocus(true)
      setIsOpenPopover(true)
      if (typeof onFocus !== 'function') return
      onFocus(e)
    }

    const handleBlur = (e) => {
      setIsFocus(false)
      setIsOpenPopover(false)
      if (typeof onBlur !== 'function') return
      onBlur(e)
    }

    const handleMouseOver = () => {
      if (!error) return
      if (!isOpenPopover) setIsOpenPopover(true)
    }

    const handleMouseLeave = (e) => {
      if (e.relatedTarget instanceof Node) {
        if (popoverRef.current) {
          if (popoverRef.current.contains(e.relatedTarget)) return
        }
        if (inputRef.current) {
          if (inputRef.current.contains(e.relatedTarget)) return
        }
      }
      if (!isFocus) {
        setIsOpenPopover(false)
      }
    }

    const handleClickEndIcon = () => {
      if (typeof onClickEndIcon !== 'function') return
      onClickEndIcon()
    }

    const handleKeyDown = (e) => {
      if (typeof onKeyDown !== 'function') return
      onKeyDown(e)
    }

    return (
      <div className="w-full">
        <div className={`w-full ${isLabelHorizontal ? 'flex items-center' : ''}`}>
          {textFieldType === TextFieldType.Secondary && label && (
            <label
              htmlFor={id}
              className={`block w-max flex-shrink-0 font-medium ${
                isLabelHorizontal ? 'mr-2' : 'mb-1'
              }`}
            >
              {label}
              {required && <span className="text-red-500 inline-block pl-1">*</span>}
            </label>
          )}
          <MyPopover
            isOpen={isOpenPopover && (error ? true : false)}
            className="relative w-full"
            popoverClassName={`bg-red-500 text-white text-sm p-0`}
            content={
              <div ref={popoverRef} className="w-max px-2 py-1" onMouseLeave={handleMouseLeave}>
                {error}
              </div>
            }
          >
            <>
              <input
                id={id}
                ref={inputRef}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                autoComplete="off"
                className={`h-12 border text-black-text placeholder-input-placeholder bg-white disabled:bg-gray-100 w-full outline-none transition-colors ${
                  textFieldType === TextFieldType.Secondary ? 'rounded-lg' : 'rounded-[24px]'
                } ${
                  error
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-input-border focus:border-black-text'
                } ${endIcon ? 'pr-14 pl-4' : 'px-4'}`}
                disabled={disabled}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                onKeyDown={handleKeyDown}
              />
              {endIcon && (
                <div
                  className={twMerge(
                    `absolute top-1/2 -translate-y-1/2 w-12 h-[46px] right-[1px] flex items-center justify-center ${
                      textFieldType === TextFieldType.Secondary
                        ? 'rounded-e-lg'
                        : 'rounded-e-[24px]'
                    }`,
                    endIconClassName
                  )}
                  onClick={handleClickEndIcon}
                >
                  {endIcon}
                </div>
              )}
              {textFieldType === TextFieldType.Primary && label && (
                <label
                  htmlFor={id}
                  className={`absolute inline-block leading-none w-max flex-shrink-0 transition-all ${
                    value || isFocus
                      ? 'left-[15px] -top-[5px] text-xs font-medium text-black-text bg-white px-[2px]'
                      : 'left-[17px] top-1/2 -translate-y-1/2 text-input-placeholder'
                  }`}
                >
                  {label}
                  {required && <span className="text-red-500 inline-block pl-1">*</span>}
                </label>
              )}
            </>
          </MyPopover>
        </div>
      </div>
    )
  }
)

export default MyTextField
