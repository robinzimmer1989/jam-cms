import React from 'react'
import { Button, Empty } from 'antd'

// import app components
import BlockWrapper from 'components/BlockWrapper'
import Header from 'components/postBlocks/Header'
import Footer from 'components/postBlocks/Footer'

import { generateSlug } from 'utils'
import { convertToPropsSchema } from 'utils'
import { useStore } from 'store'

const FlexibleContent = props => {
  const {
    allElements,
    renderedElements,
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

  // Post relationship fields
  if (site && renderedElements) {
    modifiedElements = renderedElements.map(block => {
      return {
        ...block,
        fields: block.fields.map(field => {
          if (field.type === 'collectionSelector' && field?.value) {
            const posts = Object.values(site?.postTypes?.[field.value]?.posts || {}).filter(
              post => post.status === 'publish'
            )

            return {
              ...field,
              value: posts.map(o => {
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

  const header = site?.settings?.header && <Header {...convertToPropsSchema([site.settings.header])[0].data} />

  const footer = site?.settings?.footer && <Footer {...convertToPropsSchema([site.settings.footer])[0].data} />

  const generateWrapper = (component, index, settings = null) => {
    return (
      <BlockWrapper
        key={index}
        index={index}
        onClick={() => dispatch({ type: `SET_EDITOR_INDEX`, payload: index })}
        renderedElements={renderedElements}
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
        {editableHeader ? generateWrapper(header, 'header') : header}

        {modifiedElements.length > 0 || children ? (
          <>
            {modifiedElements.map(({ name, data }, index) => {
              const Component = allElements[name].component

              // Extract global settings from data, so we can apply it to the block wrapper in the next step.
              // This way the settings don't have to be applied for each block separately.
              const { settings, ...rest } = data
              return generateWrapper(<Component {...rest} />, index, settings)
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

        {editableFooter ? generateWrapper(footer, 'footer') : footer}
      </>
    )
  )
}

export default FlexibleContent
