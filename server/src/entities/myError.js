class MyError {
  /**
   * @param {string} field
   * @param {string} msg
   * @param {*} value
   */
  constructor(field, msg, value) {
    this.field = field
    this.msg = msg
    this.value = value
  }
}

export default MyError
