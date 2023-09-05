'use client'
import { CheckboxSize } from '@/enumerations/enumerations'

const MyCheckbox = ({
  name,
  id,
  label,
  value,
  checked = false,
  checkboxSize = CheckboxSize.Medium,
  onChange,
}) => {
  const handleChange = (e) => {
    if (typeof onChange !== 'function') return
    onChange(e.target.checked, value)
  }

  return (
    <div className="relative flex items-center group">
      <input
        type="checkbox"
        name={name}
        id={id}
        className="opacity-0 w-[1px] h-[1px] absolute"
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className={`block border rounded overflow-hidden relative group-focus-within:border-black-text transition-all duration-200 ${
          checked ? 'border-primary' : 'border-input-border'
        } ${
          checkboxSize === CheckboxSize.Small
            ? 'w-4 h-4'
            : checkboxSize === CheckboxSize.Medium
            ? 'w-5 h-5'
            : 'w-6 h-6'
        }`}
      >
        <div
          className={`absolute w-full h-full top-0 left-0 flex items-center justify-center text-white transition-all duration-200 ${
            checked ? 'bg-primary' : 'rotate-90 opacity-0'
          } ${
            checkboxSize === CheckboxSize.Small
              ? 'text-xs'
              : checkboxSize === CheckboxSize.Medium
              ? 'text-sm'
              : ''
          }`}
        >
          <i className="fa-solid fa-check"></i>
        </div>
      </label>
      {label && (
        <label htmlFor={id} className="pl-2">
          {label}
        </label>
      )}
    </div>
  )
}

export default MyCheckbox
