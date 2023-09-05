export const generateNewCode = (value) => {
  const codeArr = value.split('.')
  const prefix = codeArr[0]
  const code = (parseInt(codeArr[1]) + 1).toString()
  return `${prefix}.${code.padStart(4, '0')}`
}
