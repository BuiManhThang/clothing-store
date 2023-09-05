'use client'
import MyTextField from '../myTextField/MyTextField'
import MyPopover from '../myPopover/MyPopover'
import { PopoverPosition, TextFieldType } from '@/enumerations/enumerations'
import { useEffect, useRef, useState } from 'react'
import SimpleBar from 'simplebar-react'

const getInputTextFromValue = (value, valueField, displayField, options = []) => {
  if (!valueField || !displayField || !value) return ''
  const selectedOption = options.find((option) => option[valueField] === value)
  if (!selectedOption) return ''
  return selectedOption[displayField]
}

const filterOptions = (displayField, options = [], searchText = '') => {
  if (!searchText) return options
  const lowerCaseSearchText = searchText.toLowerCase()
  return options.filter((option) => {
    const lowerCaseOption = option[displayField].toLowerCase()
    return lowerCaseOption.includes(lowerCaseSearchText)
  })
}

const MyCombobox = ({
  value,
  id,
  name,
  label,
  placeholder,
  error,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  noDataTemplate,
  isAllowFreeText = true,
  popoverClassName = '',
  valueField = 'id',
  displayField = 'text',
  noDataText = 'Không có dữ liệu!',
  options = [],
  isLabelHorizontal = false,
  disabled = false,
  required = false,
}) => {
  const inputRef = useRef(null)
  const popoverRef = useRef(null)
  const popoverComponentRef = useRef(null)
  const timeoutScroll = useRef(null)
  const optionsRef = useRef([])
  const [inputText, setInputText] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [hoverIndex, setHoverIndex] = useState(-1)
  const [filteredOptions, setFilterdOptions] = useState(() =>
    filterOptions(displayField, options, inputText)
  )

  useEffect(() => {
    setInputText(getInputTextFromValue(value, valueField, displayField, options))
  }, [value])

  useEffect(() => {
    scrollOptionIntoView()
  }, [hoverIndex])

  useEffect(() => {
    if (isActive) {
      setFilterdOptions(options)
      if (!value) return
      const currentHoverIndex = options.findIndex((option) => option[valueField] === value)
      if (currentHoverIndex === -1) return
      setHoverIndex(currentHoverIndex)
      clearTimeout(timeoutScroll.current)
      setTimeout(() => {
        scrollOptionIntoView()
      }, 150)
    } else {
      if (isAllowFreeText) return
      setInputText(getInputTextFromValue(value, valueField, displayField, options))
    }

    return () => {
      clearTimeout(timeoutScroll.current)
    }
  }, [isActive])

  useEffect(() => {
    calculatePopoverPosition()
  }, [filteredOptions.length])

  const calculatePopoverPosition = () => {
    if (typeof popoverComponentRef.current?.reCalculatePopoverPosition !== 'function') return
    popoverComponentRef.current.reCalculatePopoverPosition()
  }

  const handleChangeInputText = (e) => {
    const newInputText = e.target.value
    setInputText(newInputText)
    if (!isActive) setIsActive(true)
    const newFilteredOptions = filterOptions(displayField, options, newInputText)
    setFilterdOptions(newFilteredOptions)
    if (hoverIndex !== -1) {
      const hoverItem = options[hoverIndex]
      const newHoverIndex = newFilteredOptions.findIndex(
        (option) => option[valueField] === hoverItem[valueField]
      )
      setHoverIndex(newHoverIndex)
    }
  }

  const handleClickEndIcon = () => {
    if (isActive) {
      setIsActive(false)
    } else {
      setIsActive(true)
      if (typeof inputRef.current?.focus === 'function') inputRef.current.focus()
    }
  }

  const handleClickOutSide = () => {
    setIsActive(false)
  }

  const handleClickOption = (option) => {
    setIsActive(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
    if (typeof onChange !== 'function') return
    onChange(option[valueField])
  }

  const handleBlur = () => {
    if (typeof onBlur !== 'function') return
    onBlur(e)
  }

  const handleFocus = (e) => {
    if (typeof onFocus !== 'function') return
    onFocus(e)
  }

  const scrollOptionIntoView = () => {
    if (!popoverRef.current) return
    if (!hoverIndex === -1) return
    const hoverItem = optionsRef.current[hoverIndex]
    if (!hoverItem) return
    const { top, bottom } = hoverItem.getBoundingClientRect()
    const { top: popoverTop, bottom: popoverBottom } = popoverRef.current.getBoundingClientRect()
    if (top < popoverTop) {
      hoverItem.scrollIntoView(true)
    } else if (bottom > popoverBottom) {
      hoverItem.scrollIntoView(false)
    }
  }

  const handleKeyDown = (e) => {
    const key = e.key
    if (typeof onKeyDown === 'function') onKeyDown(e)

    if (key === 'ArrowDown') {
      e.preventDefault()
      if (!isActive) {
        setIsActive(true)
      } else {
        const newHoverIndex = hoverIndex + 1
        if (newHoverIndex >= filteredOptions.length) return
        setHoverIndex(newHoverIndex)
      }
    } else if (key === 'ArrowUp') {
      e.preventDefault()
      if (!isActive) {
        setIsActive(true)
      } else {
        const newHoverIndex = hoverIndex - 1
        if (newHoverIndex < 0) return
        setHoverIndex(newHoverIndex)
      }
    } else if (key === 'Enter') {
      e.preventDefault()
      if (!isActive) {
        setIsActive(true)
      } else if (hoverIndex !== -1) {
        onChange(filteredOptions[hoverIndex][valueField])
        setIsActive(false)
      }
    } else if (key === 'Tab') {
      e.preventDefault()
      setIsActive(false)
    }
  }

  return (
    <MyPopover
      ref={popoverComponentRef}
      isOpen={isActive}
      popoverRef={popoverRef}
      className="w-full"
      popoverClassName={`px-0 py-2 ${popoverClassName}`}
      popoverPosition={{
        x: PopoverPosition.Left,
        isOuterX: false,
      }}
      content={
        <SimpleBar className="max-h-[352px]" autoHide={false}>
          {filteredOptions.length ? (
            filteredOptions.map((option, index) => (
              <div
                key={`${option[valueField]}`}
                ref={(el) => (optionsRef.current[index] = el)}
                className={`flex items-center h-12 w-full px-4 transition-colors cursor-pointer ${
                  hoverIndex === index ? 'bg-gray-200' : 'bg-white hover:bg-gray-200'
                }`}
                onClick={() => handleClickOption(option)}
              >
                <div
                  className="flex-shrink-0 w-[calc(100%_-_24px)] line-clamp-1"
                  title={option[displayField]}
                >
                  {option[displayField]}
                </div>
                <div className="text-green-500 flex-shrink-0 w-6 flex items-center justify-center">
                  {option[valueField] === value && <i className="fa-solid fa-check"></i>}
                </div>
              </div>
            ))
          ) : noDataTemplate ? (
            { noDataTemplate }
          ) : (
            <div className="flex items-center justify-center h-12 w-full px-4 bg-white text-gray-500">
              {noDataText}
            </div>
          )}
        </SimpleBar>
      }
      onClickOutSide={handleClickOutSide}
    >
      <MyTextField
        id={id}
        ref={inputRef}
        name={name}
        label={label}
        placeholder={placeholder}
        textFieldType={TextFieldType.Secondary}
        disabled={disabled}
        required={required}
        error={error}
        isLabelHorizontal={isLabelHorizontal}
        endIcon={
          <i
            className={`fa-solid fa-chevron-down transition-transform duration-200 ${
              isActive && 'rotate-180'
            }`}
          ></i>
        }
        endIconClassName={`cursor-pointer transition-all hover:bg-gray-200`}
        value={inputText}
        onChange={handleChangeInputText}
        onClickEndIcon={handleClickEndIcon}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
    </MyPopover>
  )
}

export default MyCombobox
