'use client'
import { Dialog, Transition } from '@headlessui/react'
import MyTooltipWrapper from '../myTooltip/MyTooltipWrapper'
import { twMerge } from 'tailwind-merge'
import { Fragment } from 'react'

const MyPopup = ({
  children,
  header,
  footer,
  isOpen,
  title = 'Popup title',
  popupClassName = '',
  contentClassName = '',
  isShowBackdrop = true,
  closeWhenClickOutSide = false,
  onClose = () => {},
}) => {
  const handleClose = () => {
    if (typeof onClose !== 'function') return
    onClose()
  }

  const handleClickOutSide = () => {
    if (typeof onClose !== 'function') return
    // if (!closeWhenClickOutSide) return
    onClose()
  }
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={handleClickOutSide}>
        {isShowBackdrop && (
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
        )}

        <Transition.Child
          className="fixed inset-0 flex items-center justify-center p-4"
          enter="ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className={twMerge('mx-auto rounded bg-white', popupClassName)}>
            {header ? (
              header
            ) : (
              <div className="flex items-center justify-between pt-6 px-6">
                <div className="font-medium text-xl">{title}</div>
                <MyTooltipWrapper
                  className="text-xl text-gray-500 cursor-pointer w-8 h-8 rounded-full bg-white flex items-center justify-center transition-all hover:text-gray-800 hover:bg-gray-200"
                  content="Đóng"
                >
                  <div onClick={handleClose}>
                    <i class="fa-solid fa-xmark"></i>
                  </div>
                </MyTooltipWrapper>
              </div>
            )}
            <div className={twMerge(`px-6 pt-3 ${footer ? 'pb-3' : 'pb-6'}`, contentClassName)}>
              {children}
            </div>
            {footer ? footer : null}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default MyPopup
