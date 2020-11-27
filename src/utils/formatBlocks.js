import formatFieldForEditor from './formatFieldForEditor'
import formatFieldForDevelopment from './formatFieldForDevelopment'
import convertToPropsSchema from './convertToPropsSchema'

export default function formatBlocks(blocks, site, development = false) {
  let modifiedBlocks = []

  if (!development && (!blocks || !site)) {
    return modifiedBlocks
  }

  modifiedBlocks = blocks.map((block) => {
    return {
      ...block,
      fields: block.fields.map((field) =>
        development ? formatFieldForDevelopment(field) : formatFieldForEditor(field, site)
      ),
    }
  })

  modifiedBlocks = convertToPropsSchema(modifiedBlocks)

  return modifiedBlocks
}
