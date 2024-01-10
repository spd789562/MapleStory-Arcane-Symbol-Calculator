function numberFormat(num: number) {
  return (num || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default numberFormat;
