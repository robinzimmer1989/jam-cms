import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Button, Space, Collapse } from 'antd';

// import app components
import MenuBuilder from './MenuBuilder';
import MediaLibrary from './MediaLibrary';
import LinkSelector from './LinkSelector';
import Caption from './Caption';

// Admin fields
import CollectionSelector from './postEditorAdminFields/CollectionSelector';
import FormSelector from './postEditorAdminFields/FormSelector';
import Text from './postEditorAdminFields/Text';
import Wysiwyg from './postEditorAdminFields/Wysiwyg';
import ImagePicker from './postEditorAdminFields/ImagePicker';
import Menu from './postEditorAdminFields/Menu';
import Repeater from './postEditorAdminFields/Repeater';
import Link from './postEditorAdminFields/Link';
import Select from './postEditorAdminFields/Select';
import Number from './postEditorAdminFields/Number';
import Settings from './postEditorAdminFields/Settings';
import FlexibleContent from './postEditorAdminFields/FlexibleContent';

import { useStore } from '../store';

export const getField = ({ field, index, site, onChangeElement, dispatch }) => {
  let component;

  switch (field.type) {
    case 'text':
      component = (
        <Text
          {...field}
          onChange={(e) => onChangeElement({ ...field, value: e.target.value }, index)}
        />
      );
      break;

    case 'wysiwyg':
      component = (
        <Wysiwyg
          {...field}
          onChange={(editorState) => onChangeElement({ ...field, value: editorState }, index)}
        />
      );
      break;

    case 'number':
      component = (
        <Number
          {...field}
          onChange={(number) => onChangeElement({ ...field, value: number }, index)}
        />
      );
      break;

    case 'link':
      component = (
        <Link
          {...field}
          onRemove={() => onChangeElement({ ...field, value: null }, index)}
          onClick={() =>
            dispatch({
              type: `SET_DIALOG`,
              payload: {
                open: true,
                title: 'Link',
                component: (
                  <LinkSelector
                    index={index}
                    {...field}
                    onChange={(value) => onChangeElement({ ...field, value }, index)}
                  />
                ),
                width: 500,
              },
            })
          }
        />
      );
      break;

    case 'select':
      component = (
        <Select
          {...field}
          onChange={(optionValue) => onChangeElement({ ...field, value: optionValue }, index)}
        />
      );
      break;

    case 'settings':
      component = (
        <Settings
          {...field}
          onChange={(newValue) => onChangeElement({ ...field, value: newValue }, index)}
        />
      );
      break;

    case 'collection':
      component = (
        <CollectionSelector
          {...field}
          site={site}
          onSelect={(postTypeID) => onChangeElement({ ...field, value: postTypeID }, index)}
        />
      );
      break;

    case 'formSelector':
      component = (
        <FormSelector
          {...field}
          site={site}
          onSelect={(formID) => onChangeElement({ ...field, value: formID }, index)}
        />
      );
      break;

    case 'repeater':
      component = (
        <Repeater
          {...field}
          site={site}
          dispatch={dispatch}
          onChange={(items) => onChangeElement({ ...field, value: items }, index)}
        />
      );
      break;

    case 'flexible_content':
      component = (
        <FlexibleContent
          {...field}
          site={site}
          dispatch={dispatch}
          onChange={(items) => onChangeElement({ ...field, value: items }, index)}
        />
      );
      break;

    case 'image':
      component = (
        <ImagePicker
          {...field}
          onRemove={() => onChangeElement({ ...field, value: null }, index)}
          onClick={() =>
            dispatch({
              type: `SET_DIALOG`,
              payload: {
                open: true,
                component: (
                  <MediaLibrary
                    onSelect={(image) => onChangeElement({ ...field, value: image }, index)}
                    allow={['image']}
                  />
                ),
                width: 1000,
              },
            })
          }
        />
      );
      break;

    case 'menu':
      component = (
        <Menu
          {...field}
          onClick={() =>
            dispatch({
              type: `SET_DIALOG`,
              payload: {
                open: true,
                title: 'Menu',
                component: (
                  <MenuBuilder
                    index={index}
                    {...field}
                    onChange={(menu) => onChangeElement({ ...field, value: menu }, index)}
                  />
                ),
                width: 1000,
              },
            })
          }
        />
      );
      break;

    default:
  }

  return (
    <Fragment key={index}>
      {field.type === 'repeater' || field.type === 'flexible_content' ? (
        <Collapse className="block-collapse">
          <Collapse.Panel header={field.label || field.id}>{component}</Collapse.Panel>
        </Collapse>
      ) : (
        <FieldContainer>
          <Caption children={field.label} />
          {component}
        </FieldContainer>
      )}
    </Fragment>
  );
};

const BlockEditFields = (props) => {
  const { fields, isTemplate, isSiteComponent, onDeleteElement, onChangeElement } = props;

  const [
    {
      editorState: { site },
    },
    dispatch,
  ] = useStore();

  return (
    <Container>
      <div>
        {fields &&
          fields.map((field, index) => getField({ field, index, site, onChangeElement, dispatch }))}
      </div>

      {!isTemplate && !isSiteComponent && (
        <ButtonContainer>
          <Button onClick={onDeleteElement} children={`Delete Block`} danger block />
        </ButtonContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 75px);

  .block-collapse {
    .ant-collapse-header {
      padding: 12px 16px 12px 30px;
    }
  }
`;

const FieldContainer = styled.div`
  padding: 12px 12px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  padding: 0 4px;
`;

export default BlockEditFields;
