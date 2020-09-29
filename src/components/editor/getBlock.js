export default function(blockName) {
  let block = {}

  switch (blockName) {
    case 'Text':
      block = {
        name: blockName,
        fields: [
          {
            id: 'text',
            type: 'textarea',
            placeholder: 'Content',
            label: 'Text',
            value: '',
          },
        ],
        style: {},
      }
      break

    case 'Banner':
      block = {
        name: blockName,
        fields: [
          {
            id: 'image',
            type: 'image',
            placeholder: '',
            label: 'Upload Image',
            value: '',
          },
        ],
        style: {},
      }
      break

    default:
  }

  return block
}
