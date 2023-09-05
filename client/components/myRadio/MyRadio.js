'use client'
import { RadioSize } from '@/enumerations/enumerations'

const MyRadio = ({
  name,
  id,
  label,
  value,
  checked = false,
  checkboxSize = RadioSize.Medium,
  onChange,
}) => {
  const handleChange = (e) => {
    if (typeof onChange !== 'function') return
    onChange(e.target.checked, value)
  }

  return (
    <div className="relative flex items-center group">
      <input
        type="radio"
        name={name}
        id={id}
        className="opacity-0 w-[1px] h-[1px] absolute"
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className={`border rounded-full overflow-hidden flex items-center justify-center group-focus-within:border-black-text transition-all duration-200 ${
          checked ? 'border-primary' : 'border-input-border'
        } ${
          checkboxSize === RadioSize.Small
            ? 'w-4 h-4'
            : checkboxSize === RadioSize.Medium
            ? 'w-5 h-5'
            : 'w-6 h-6'
        }`}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            checked ? 'bg-primary' : 'opacity-0'
          } ${
            checkboxSize === RadioSize.Small
              ? 'w-2 h-2'
              : checkboxSize === RadioSize.Medium
              ? 'w-3 h-3'
              : 'w-4 h-4'
          }`}
        ></div>
      </label>
      {label && (
        <label htmlFor={id} className="pl-2">
          {label}
        </label>
      )}
    </div>
  )
}

export default MyRadio
