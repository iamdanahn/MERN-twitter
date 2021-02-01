const validText = str => {
    // checks to see if it is type string and > 0 length
  return typeof str === 'string' && str.trim().length > 0;
}

module.exports = validText;