export default function formatFieldForDevelopment(field) {
  if (field.type === 'collection') {
    return {
      ...field,
    }
  }

  if (field.type === 'form' && field?.value) {
    return {
      ...field,
    }
  }

  if (field.type === 'wysiwyg') {
    return {
      ...field,
      value: `
        <h2>Lorem Ipsum</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing tristique risus nec feugiat in fermentum posuere urna. Facilisis sed odio morbi quis commodo odio aenean.</p>
        <p>Sem et tortor consequat id. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Sodales ut etiam sit amet nisl purus in. Elementum tempus egestas sed sed risus pretium quam. Vitae tempus quam pellentesque nec. Ut lectus arcu bibendum at varius vel pharetra vel turpis. </p>
      `,
    }
  }

  if (field.type === 'number') {
    return {
      ...field,
      value: 2,
    }
  }

  console.log(field)

  if (field.type === 'select') {
    return {
      ...field,
      value: field.options && field.options[Math.floor(Math.random() * field.options.length)].value,
    }
  }

  if (field.type === 'repeater') {
    return {
      ...field,
      value: field.items && field.items.map((o) => formatFieldForDevelopment(o)),
    }
  }

  if (field.type === 'link') {
    return {
      ...field,
      value: {
        title: `Lorem Ipsum`,
        url: `/`,
      },
    }
  }

  if (field.type === 'text') {
    return {
      ...field,
      value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    }
  }

  if (field.type === 'image' && !field?.value) {
    return {
      ...field,
      value: {
        alt: '',
        childImageSharp: {
          fluid: {
            aspectRatio: 1,
            base64: '',
            sizes: '(max-width: 1200px) 100vw, 1200px',
            src: 'https://picsum.photos/1200/1200',
            srcSet: '',
          },
        },
        filename: 'placeholder.jpeg',
        height: 1200,
        width: 1200,
        title: 'placeholder',
        type: 'image',
        url: 'https://picsum.photos/1200/1200',
      },
    }
  }

  return field
}
