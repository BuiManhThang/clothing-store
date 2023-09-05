export const validateEmail = (value) => {
  if (!value) return true
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) return true
  return false
}

export const validatePassword = (value) => {
  if (!value) return true
  if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test(value)) return true
  return false
}

export const validateRequire = (value) => {
  if (!value) return false
  if (Array.isArray(value) && !value.length) return false
  return true
}
