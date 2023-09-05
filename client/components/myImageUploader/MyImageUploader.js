'use client'
import { useRef, useState } from 'react'
import { uploadFiles, generateFileNameUrl } from '@/utils/fileUtil'
import MyPopover from '../myPopover/MyPopover'
import MyLoading from '../myLoading/MyLoading'
import Image from 'next/image'

const MyImageUploader = ({
  id,
  name,
  value,
  label,
  error,
  uploadText = 'Tải lên',
  desc = 'Kéo hoặc nhấn nút để tải ảnh lên',
  dragOverDesc = 'Thả ra để tải ảnh lên',
  required = false,
  width = '100%',
  height = '100%',
  disabled = false,
  onChange,
}) => {
  const popoverRef = useRef(null)
  const inputRef = useRef(null)
  const inputFileRef = useRef(null)
  const [isOpenPopover, setIsOpenPopover] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  const handleDragEnter = () => {
    if (disabled) return
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    if (e.relatedTarget instanceof Node) {
      if (inputRef.current) {
        if (inputRef.current.contains(e.relatedTarget)) return
      }
    }
    setIsDragOver(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleChange = (newFile) => {
    if (typeof onChange !== 'function') return
    onChange(newFile)
  }

  const handleUploadImage = async (files) => {
    if (!files.length) return
    setIsLoading(true)
    let uploadedFiles = await uploadFiles(files)
    uploadedFiles = uploadedFiles.map((file) => file.filename)
    if (!uploadedFiles.length) {
      setIsLoading(false)
      return
    }
    if (inputFileRef.current) {
      inputFileRef.current.value = null
    }
    handleChange(uploadedFiles[0])
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    setIsDragOver(false)
    if (disabled) return
    if (value) return
    const files = e.dataTransfer.files
    handleUploadImage(files)
  }

  const handleLoadImageComplete = () => {
    setIsLoading(false)
  }

  const handleRemove = () => {
    handleChange('')
  }

  const handleChangeInput = async (e) => {
    e.preventDefault()
    const files = e.target.files
    handleUploadImage(files)
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
        className={`relative border rounded-md transition-all duration-200 ${
          error
            ? 'border border-red-500'
            : value
            ? 'border border-input-border'
            : isDragOver
            ? 'border-solid border-primary'
            : 'border-dashed border-input-border'
        }`}
        style={{
          width,
          height,
        }}
        popoverClassName={`bg-red-500 text-white text-sm p-0`}
        content={
          <div ref={popoverRef} className="w-max px-2 py-1" onMouseLeave={handleMouseLeave}>
            {error}
          </div>
        }
      >
        {isLoading && <MyLoading className="absolute z-[1] rounded-md" />}
        <div
          ref={inputRef}
          className="relative w-full h-full"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {value ? (
            <div className="w-full h-full relative">
              <Image
                src={generateFileNameUrl(value)}
                alt={value}
                className="object-center object-contain z-0"
                fill
                onLoadingComplete={handleLoadImageComplete}
              />
              {!isLoading && !disabled && (
                <div
                  className="absolute flex items-center justify-center w-4 h-4 -top-[6px] -right-[6px] rounded-full bg-input-border text-white text-xs cursor-pointer transition-colors duration-200 hover:bg-red-500"
                  onClick={handleRemove}
                >
                  <i className="fa-solid fa-xmark"></i>
                </div>
              )}
            </div>
          ) : (
            <label htmlFor={id} className="w-full h-full flex items-center justify-center flex-col">
              {isDragOver ? (
                <div className="text-center px-2">{dragOverDesc}</div>
              ) : (
                <>
                  <div className="mb-2 text-center px-2">{desc}</div>
                  <div
                    className={`rounded-[48px] text-black-text bg-primary h-12 px-6 flex items-center gap-x-3 ${
                      disabled ? 'opacity-70 cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <i className="fa-solid fa-cloud-arrow-up text-2xl"></i>{' '}
                    <span className="font-medium">{uploadText}</span>
                  </div>
                </>
              )}
            </label>
          )}

          <input
            ref={inputFileRef}
            type="file"
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
      </MyPopover>
    </div>
  )
}

export default MyImageUploader
