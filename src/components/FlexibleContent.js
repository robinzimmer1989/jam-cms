import React from 'react'
import { Button, Empty } from 'antd'

// import app components
import BlockWrapper from 'components/BlockWrapper'
import Header from 'components/postBlocks/Header'
import Footer from 'components/postBlocks/Footer'

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
          if (field.type === 'postSelector' && field?.value) {
            const posts = Object.values(site?.postTypes?.[field.value]?.posts || {}).filter(
              post => post.status === 'publish'
            )

            return {
              ...field,
              value: posts,
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

  const generateWrapper = (component, index) => {
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
              return generateWrapper(<Component {...data} />, index)
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
            <Button type="primary" onClick={onOpenDialog} children="Add" />
          </Empty>
        )}

        {editableFooter ? generateWrapper(footer, 'footer') : footer}
      </>
    )
  )
}

export default FlexibleContent
