const config = {
  id: 'texteditor',
  label: 'Text Editor',
  fields: [
    {
      id: 'flex',
      type: 'flexible_content',
      label: 'Rich Text',
      items: [
        {
          id: 'text',
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
          id: 'textimage',
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
          id: 'gallery',
          type: 'layout',
          label: 'Gallery',
          fields: [
            {
              id: 'columns',
              type: 'number',
              label: 'Columns',
              min: 1,
              max: 4,
              defaultValue: 2,
            },
            {
              id: 'gallery',
              type: 'gallery',
              label: 'Gallery',
            },
          ],
        },
        {
          id: 'embed',
          type: 'layout',
          label: 'Embed',
          fields: [
            {
              id: 'url',
              type: 'text',
              label: 'Url',
            },
          ],
        },
        {
          id: 'quote',
          type: 'layout',
          label: 'Quote',
          fields: [
            {
              id: 'text',
              type: 'wysiwyg',
              label: 'Text',
            },
            {
              id: 'author',
              type: 'text',
              label: 'Author',
            },
            {
              id: 'position',
              type: 'text',
              label: 'Position',
            },
          ],
        },
      ],
    },
  ],
};

export default config;
