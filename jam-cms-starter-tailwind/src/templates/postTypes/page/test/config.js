const config = {
  id: 'test',
  postTypeID: 'page',
  label: 'Test',
  fields: [
    {
      id: 'wysiwyg',
      type: 'wysiwyg',
      label: 'Text',
      instructions: 'Some instructions...', // optional
    },
    {
      id: 'checkbox',
      type: 'checkbox',
      label: 'Checkbox',
      defaultValue: 'checkbox-1', // optional
      instructions: 'Some instructions...', // optional
      options: [
        {
          name: 'Checkbox 1',
          value: 'checkbox-1',
        },
        {
          name: 'Checkbox 2',
          value: 'checkbox-2',
        },
      ],
    },
    {
      id: 'color',
      type: 'color_picker',
      label: 'Primary Color',
      defaultValue: '#000000', // optional
      instructions: 'Some instructions...', // optional
    },
    {
      id: 'date',
      type: 'date_picker',
      label: 'Date',
      defaultValue: new Date(), // optional
      instructions: 'Some instructions...', // optional
    },
    {
      id: 'file',
      type: 'file',
      label: 'File',
      instructions: 'Some instructions...', // optional
    },
    {
      id: 'flexible',
      type: 'flexible_content',
      label: 'Flexible Content',
      instructions: 'Some instructions...', // optional
      items: [
        {
          id: 'layout1',
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
          label: 'Text & Image',
          fields: [
            {
              id: 'text',
              type: 'wysiwyg',
              label: 'Text',
              instructions: 'Some instructions...', // optional
            },
            {
              id: 'image',
              type: 'image',
              label: 'Image',
              instructions: 'Some instructions...', // optional
            },
          ],
        },
      ],
    },
    {
      id: 'gallery',
      label: 'Gallery',
      type: 'gallery',
      instructions: 'Some instructions...', // optional
    },
    {
      id: 'map',
      label: 'Map',
      type: 'google_map',
      instructions: 'Some instructions...', // optional
    },
    {
      id: 'group',
      label: 'Group',
      type: 'group',
      instructions: 'Some instructions...', // optional
      fields: [
        {
          id: 'text',
          type: 'text',
          label: 'Text',
          instructions: 'Some instructions...', // optional
        },
      ],
    },
    {
      id: 'image',
      type: 'image',
      label: 'Image',
      instructions: 'Some instructions...', // optional
    },
    {
      id: 'link',
      type: 'link',
      label: 'Link',
      instructions: 'Some instructions...', // optional
    },
    {
      id: 'number',
      type: 'number',
      label: 'Number',
      defaultValue: 3, // optional
      instructions: 'Some instructions...', // optional
      min: 1, // optional
      max: 4, // optional
      step: 1, // optional
    },
    {
      id: 'radio',
      type: 'radio',
      label: 'Radio',
      defaultValue: 'radio-1',
      instructions: 'Some instructions...', // optional
      options: [
        {
          name: 'Radio 1',
          value: 'radio-1',
        },
        {
          name: 'Radio 2',
          value: 'radio-2',
        },
      ],
    },
    {
      id: 'repeater',
      type: 'repeater',
      label: 'Repeataer',
      instructions: 'Some instructions...', // optional
      items: [
        {
          id: 'image',
          type: 'image',
          label: 'Add Image',
          instructions: 'Some instructions...', // optional
        },
      ],
    },
    {
      id: 'select',
      type: 'select',
      label: 'Select',
      defaultValue: 'option1',
      instructions: 'Some instructions...', // optional
      options: [
        {
          name: 'Option 1',
          value: 'option1',
        },
        {
          name: 'Option 2',
          value: 'option2',
        },
      ],
    },
    {
      id: 'text',
      type: 'text',
      label: 'Text',
      instructions: 'Some instructions...', // optional
      rows: 5, // default: 1
    },
    {
      id: 'wysiwyg',
      type: 'wysiwyg',
      label: 'Wysiwyg',
      instructions: 'Some instructions...', // optional
    },
  ],
};

export default config;
