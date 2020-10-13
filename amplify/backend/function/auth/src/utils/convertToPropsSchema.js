const convertToPropsSchema = blocks => {
  return blocks.map(o => {
    const data = {}
    o.fields.forEach(o => (data[o.id] = o.value))

    return {
      name: o.name,
      data,
    }
  })
}

module.exports = convertToPropsSchema
