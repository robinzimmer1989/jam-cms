import React from 'react';
import { Button, Empty } from 'antd';

// import app components
import BlockWrapper from './BlockWrapper';

import { convertToPropsSchema } from '../utils';
import { useStore } from '../store';

const FlexibleContent = (props) => {
  const {
    blocks,
    renderedBlocks,
    children,
    editableHeader,
    editableFooter,
    editable = true,
    onOpenDialog,
    onMoveElement,
  } = props;

  const [
    {
      editorState: { site, editable: editorEditable },
    },
    dispatch,
  ] = useStore();

  const Header = blocks?.['header']?.component;
  const header = !!Header && site?.settings?.header && (
    <Header {...convertToPropsSchema([site.settings.header])[0].data} />
  );

  const Footer = blocks?.['footer']?.component;
  const footer = !!Footer && site?.settings?.footer && (
    <Footer {...convertToPropsSchema([site.settings.footer])[0].data} />
  );

  const generateWrapper = (component, index, settings = null) => {
    return (
      <BlockWrapper
        key={index}
        index={index}
        onClick={() => dispatch({ type: `SET_EDITOR_INDEX`, payload: index })}
        renderedBlocks={renderedBlocks}
        onOpenDialog={onOpenDialog}
        onMoveElement={onMoveElement}
        children={component}
        settings={settings}
      />
    );
  };

  return (
    site && (
      <>
        {header &&
          (editableHeader && editable && editorEditable
            ? generateWrapper(header, 'header')
            : header)}

        {renderedBlocks.length > 0 || children ? (
          <>
            {renderedBlocks.map(({ id, data }, index) => {
              const Component = blocks?.[id]?.component;

              if (Component) {
                // Extract global settings from data, so we can apply it to the block wrapper in the next step.
                // This way the settings don't have to be applied for each block separately.
                const { settings, ...rest } = data;
                return editable && editorEditable ? (
                  generateWrapper(<Component {...rest} />, index, settings)
                ) : (
                  <Component key={index} {...rest} />
                );
              }
            })}

            {children}
          </>
        ) : (
          <>
            {editable && editorEditable && (
              <Empty
                style={{ padding: 60 }}
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 60 }}
                description=""
                className="flexible-content-empty"
              >
                <Button type="primary" onClick={() => onOpenDialog(0)} children="Add" />
              </Empty>
            )}
          </>
        )}

        {footer &&
          (editableFooter && editable && editorEditable
            ? generateWrapper(footer, 'footer')
            : footer)}
      </>
    )
  );
};

export default FlexibleContent;
