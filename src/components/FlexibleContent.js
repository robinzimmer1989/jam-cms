import React from 'react'
import { Button, Empty } from 'antd'

// import app components
import BlockWrapper from './BlockWrapper'

import { generateSlug, convertToPropsSchema } from '../utils'
import { useStore } from '../store'

const FlexibleContent = (props) => {
  const {
    blocks,
    renderedBlocks,
    children,
    editableHeader,
    editableFooter,
    isTemplate,
    onOpenDialog,
    onMoveElement,
  } = props

  const [
    {
      editorState: { site },
    },
    dispatch,
  ] = useStore()

  let modifiedElements = []

  if (site && renderedBlocks) {
    modifiedElements = renderedBlocks.map((block) => {
      return {
        ...block,
        fields: block.fields.map((field) => {
          // Post relationship fields
          if (field.type === 'collection' && field?.value) {
            const posts = Object.values(site?.postTypes?.[field.value]?.posts || {}).filter(
              (post) => post.status === 'publish'
            )

            return {
              ...field,
              value: posts.map((o) => {
                return { ...o, slug: generateSlug(site?.postTypes?.[field.value], o.id, site.frontPage) }
              }),
            }
          }

          if (field.type === 'form' && field?.value) {
          }

          return field
        }),
      }
    })
  }

  modifiedElements = convertToPropsSchema(modifiedElements)

  const Header = blocks?.['header']?.component
  const header = !!Header && site?.settings?.header && (
    <Header {...convertToPropsSchema([site.settings.header])[0].data} />
  )

  const Footer = blocks?.['footer']?.component
  const footer = !!Footer && site?.settings?.footer && (
    <Footer {...convertToPropsSchema([site.settings.footer])[0].data} />
  )

  const generateWrapper = (component, index, settings = null) => {
    return (
      <BlockWrapper
        key={index}
        index={index}
        onClick={() => dispatch({ type: `SET_EDITOR_INDEX`, payload: index })}
        renderedBlocks={renderedBlocks}
        isTemplate={isTemplate}
        onOpenDialog={onOpenDialog}
        onMoveElement={onMoveElement}
        children={component}
        settings={settings}
      />
    )
  }

  return (
    site && (
      <>
        {header && (editableHeader ? generateWrapper(header, 'header') : header)}

        {modifiedElements.length > 0 || children ? (
          <>
            {modifiedElements.map(({ name, data }, index) => {
              const Component = blocks?.[name]?.component

              if (Component) {
                // Extract global settings from data, so we can apply it to the block wrapper in the next step.
                // This way the settings don't have to be applied for each block separately.
                const { settings, ...rest } = data
                return generateWrapper(<Component {...rest} />, index, settings)
              }
            })}

            {children}
          </>
        ) : (
          <Empty
            style={{ padding: 60 }}
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description=""
            className="reset-font"
          >
            <Button type="primary" onClick={() => onOpenDialog(0)} children="Add" />
          </Empty>
        )}

        {footer && (editableFooter ? generateWrapper(footer, 'footer') : footer)}
      </>
    )
  )
}

export default FlexibleContent
