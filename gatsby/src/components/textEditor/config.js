import TextEditor from './TextEditor';

const config = {
  id: 'texteditor',
  label: 'Text Editor',
  component: TextEditor,
  fields: [
    {
      id: 'flex',
      type: 'flexible_content',
      label: 'Rich Text',
      items: [
        {
          id: 'layout1',
          type: 'layout',
          label: 'Text',
          fields: [
            {
              id: 'text',
              type: 'wysiwyg',
              label: 'Text',
            },
          ],
        },
        {
          id: 'layout2',
          type: 'layout',
          label: 'Text & Image',
          fields: [
            {
              id: 'text',
              type: 'wysiwyg',
              label: 'Text',
            },
            {
              id: 'image',
              type: 'image',
              label: 'Image',
            },
            {
              id: 'alignment',
              type: 'select',
              label: 'Image Alignment',
              defaultValue: 'left',
              options: [
                {
                  name: 'Left',
                  value: 'left',
                },
                {
                  name: 'Right',
                  value: 'right',
                },
              ],
            },
          ],
        },
        {
          id: 'images',
          type: 'layout',
          label: 'Images',
          fields: [
            {
              id: 'columns',
              type: 'number',
              label: 'Columns',
              min: 1,
              max: 4,
            },
            {
              id: 'gallery',
              type: 'gallery',
              label: 'Gallery',
            },
          ],
        },
      ],
    },
  ],
};

export default config;
