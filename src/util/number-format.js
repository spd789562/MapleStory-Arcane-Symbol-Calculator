const numberFormat = function numberFormat(number) {
  return `${number}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default numberFormat
