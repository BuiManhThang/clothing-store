'use client'
import { useState, useRef } from 'react'
import MyLoading from '../myLoading/MyLoading'
import MyPopover from '../myPopover/MyPopover'
import { uploadFiles, generateFileNameUrl } from '@/utils/fileUtil'
import Image from 'next/image'
import SimpleBar from 'simplebar-react'

const MyImageUploaderMultiple = ({
  id,
  name,
  label,
  error,
  value = [],
  uploadText = 'Tải lên',
  required = false,
  disabled = false,
  width = 96,
  height = 96,
  onChange,
}) => {
  const formatedWidth = typeof width === 'string' ? width : `${width}px`
  const formatedHeight = typeof height === 'string' ? height : `${height}px`

  const popoverRef = useRef(null)
  const inputRef = useRef(null)
  const inputFileRef = useRef(null)
  const [isOpenPopover, setIsOpenPopover] = useState(false)
  const [isFocus, setIsFocus] = useState(false)

  const handleFocus = (e) => {
    setIsFocus(true)
    setIsOpenPopover(true)
  }

  const handleBlur = (e) => {
    setIsFocus(false)
    setIsOpenPopover(false)
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

  const handleChange = (newFiles) => {
    if (typeof onChange !== 'function') return
    onChange(newFiles)
  }

  const handleUploadImages = async (files) => {
    if (!files.length) return
    let uploadedFiles = await uploadFiles(files)
    uploadedFiles = uploadedFiles.map((file) => file.filename)
    if (!uploadedFiles.length) {
      return
    }
    if (inputFileRef.current) {
      inputFileRef.current.value = null
    }
    const newFiles = [...value, ...uploadedFiles]
    handleChange(newFiles)
  }

  const handleRemove = (fileIndex) => {
    const newFiles = [...value]
    newFiles.splice(fileIndex, 1)
    handleChange(newFiles)
  }

  const handleChangeInput = async (e) => {
    e.preventDefault()
    const files = e.target.files
    handleUploadImages(files)
  }

  return (
    <div>
      {label ? (
        <label htmlFor={id} className={`block w-max flex-shrink-0 font-medium mb-1`}>
          {label}
          {required && <span className="text-red-500 inline-block pl-1">*</span>}
        </label>
      ) : null}

      <MyPopover
        isOpen={isOpenPopover && (error ? true : false)}
        className={`w-full relative rounded-md transition-all duration-200 border px-[10px] ${
          error ? 'border-red-500' : 'border-input-border'
        }`}
        popoverClassName={`bg-red-500 text-white text-sm p-0`}
        content={
          <div ref={popoverRef} className="w-max px-2 py-1" onMouseLeave={handleMouseLeave}>
            {error}
          </div>
        }
      >
        <div className="flex w-full" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
          <label
            htmlFor={id}
            className="block mr-2 my-[10px] flex-shrink-0"
            style={{
              width: formatedWidth,
              height: formatedHeight,
            }}
          >
            <div
              className={`w-full h-full text-black-text bg-primary flex flex-col items-center justify-center gap-y-1 rounded-md ${
                disabled ? 'opacity-70 cursor-default' : 'cursor-pointer'
              }`}
            >
              <i className="fa-solid fa-cloud-arrow-up text-lg"></i>{' '}
              <span className="font-medium">{uploadText}</span>
            </div>
          </label>
          <SimpleBar
            style={{
              width: `calc(100% - ${formatedWidth} - 10px)`,
            }}
            autoHide={false}
          >
            <div className="flex items-center flex-grow gap-x-2 pb-[10px]">
              {value.map((image, index) => (
                <div
                  className="flex-shrink-0 mt-[10px] relative rounded-md border border-input-border"
                  style={{
                    width: formatedWidth,
                    height: formatedHeight,
                  }}
                  key={index}
                >
                  <Image
                    src={generateFileNameUrl(image)}
                    alt={image}
                    className="object-center object-contain z-0"
                    fill
                    sizes={formatedWidth}
                  />
                  {!disabled && (
                    <div
                      className="absolute flex items-center justify-center w-4 h-4 -top-[6px] -right-[6px] rounded-full bg-input-border text-white text-xs cursor-pointer transition-colors duration-200 hover:bg-red-500"
                      onClick={() => handleRemove(index)}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                  )}
                </div>
              ))}
              <input
                ref={inputFileRef}
                type="file"
                multiple
                name={name}
                id={id}
                accept="image/png, image/jpeg"
                className="absolute w-[1px] h-[1px] opacity-0"
                disabled={disabled}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChangeInput}
              />
            </div>
          </SimpleBar>
        </div>
      </MyPopover>
    </div>
  )
}

export default MyImageUploaderMultiple
