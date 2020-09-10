const formFieldAreUpdated = (fields) => (prevValues, currentValues) =>
  fields.some((field) => prevValues[field] !== currentValues[field])

export default formFieldAreUpdated
