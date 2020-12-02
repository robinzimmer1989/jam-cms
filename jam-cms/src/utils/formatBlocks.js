import formatFieldForEditor from './formatFieldForEditor';
import convertToPropsSchema from './convertToPropsSchema';

export default function formatBlocks(blocks, site) {
  let modifiedBlocks = [];

  if (!blocks || !site) {
    return modifiedBlocks;
  }

  modifiedBlocks = blocks.map((block) => {
    return {
      ...block,
      fields: block.fields.map((field) => formatFieldForEditor(field, site)),
    };
  });

  modifiedBlocks = convertToPropsSchema(modifiedBlocks);

  return modifiedBlocks;
}
