export const formatDate = (inputValue, format = 'dd/MM/yyyy') => {
  if (!inputValue) return ''
  let dateObject = inputValue
  if (typeof inputValue === 'string') {
    dateObject = new Date(inputValue)
  }
  if (dateObject instanceof Date) {
    const d = dateObject.getDate()
    const m = dateObject.getMonth() + 1
    const y = dateObject.getFullYear()

    return format
      .replace('dd', `${d}`.padStart(2, '0'))
      .replace('MM', `${m}`.padStart(2, '0'))
      .replace('yyyy', y)
  }
  return ''
}

export const numberWithCommas = (inputValue, separate = '.') => {
  return inputValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separate)
}
