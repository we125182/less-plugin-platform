const requiredProps = [
  'platform'
]

function validateOptions(options) {
  if (options.toString() !== '[object Object]') {
    throw new Error('[less-platform-plugin]: options is not a Object')
  }

  Object.keys(options).forEach(key => {
    if (requiredProps.includes(key) && !options[key]) {
      console.warn(`[less-platform-plugin]: ${key} in options is required`)
    }
  })
}

module.exports = validateOptions