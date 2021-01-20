import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Space } from 'antd';

// import app components
import MenuBuilder from './MenuBuilder';
import MediaLibrary from './MediaLibrary';
import LinkSelector from './LinkSelector';
import Caption from './Caption';

// Admin fields
import CollectionSelector from './editorFields/CollectionSelector';
import FormSelector from './editorFields/FormSelector';
import Text from './editorFields/Text';
import Wysiwyg from './editorFields/Wysiwyg';
import FilePicker from './editorFields/FilePicker';
import Menu from './editorFields/Menu';
import Repeater from './editorFields/Repeater';
import Link from './editorFields/Link';
import Select from './editorFields/Select';
import Checkbox from './editorFields/Checkbox';
import Radio from './editorFields/Radio';
import Number from './editorFields/Number';
import FlexibleContent from './editorFields/FlexibleContent';
import DatePicker from './editorFields/DatePicker';
import Group from './editorFields/Group';
import Gallery from './editorFields/Gallery';

import { useStore } from '../store';

export const getField = ({ index, field, site, onChangeElement, dispatch }) => {
  let component;

  switch (field.type) {
    case 'group':
      component = (
        <Group
          {...field}
          site={site}
          dispatch={dispatch}
          onChange={(value) => onChangeElement({ ...field, value })}
        />
      );
      break;

    case 'text':
      component = (
        <Text {...field} onChange={(e) => onChangeElement({ ...field, value: e.target.value })} />
      );
      break;

    case 'wysiwyg':
      component = (
        <Wysiwyg
          {...field}
          index={index}
          onChange={(value) => onChangeElement({ ...field, value })}
        />
      );
      break;

    case 'number':
      component = <Number {...field} onChange={(value) => onChangeElement({ ...field, value })} />;
      break;

    case 'date_picker':
      component = (
        <DatePicker {...field} onChange={(value) => onChangeElement({ ...field, value })} />
      );
      break;

    case 'link':
      component = (
        <Link
          {...field}
          onRemove={() => onChangeElement({ ...field, value: null })}
          onClick={() =>
            dispatch({
              type: `SET_DIALOG`,
              payload: {
                open: true,
                title: 'Link',
                component: (
                  <LinkSelector
                    {...field}
                    onChange={(value) => onChangeElement({ ...field, value })}
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
      component = <Select {...field} onChange={(value) => onChangeElement({ ...field, value })} />;
      break;

    case 'checkbox':
      component = (
        <Checkbox {...field} onChange={(value) => onChangeElement({ ...field, value })} />
      );
      break;

    case 'radio':
      component = <Radio {...field} onChange={(value) => onChangeElement({ ...field, value })} />;
      break;

    case 'collection':
      component = (
        <CollectionSelector
          {...field}
          site={site}
          onSelect={(value) => onChangeElement({ ...field, value })}
        />
      );
      break;

    case 'form':
      component = (
        <FormSelector
          {...field}
          site={site}
          onSelect={(value) => onChangeElement({ ...field, value })}
        />
      );
      break;

    case 'repeater':
      component = (
        <Repeater
          {...field}
          site={site}
          dispatch={dispatch}
          onChange={(value) => onChangeElement({ ...field, value })}
        />
      );
      break;

    case 'flexible_content':
      component = (
        <FlexibleContent
          {...field}
          site={site}
          dispatch={dispatch}
          onChange={(value) => onChangeElement({ ...field, value })}
        />
      );
      break;

    case 'image':
      component = (
        <FilePicker
          {...field}
          onRemove={() => onChangeElement({ ...field, value: null })}
          onClick={() =>
            dispatch({
              type: `SET_DIALOG`,
              payload: {
                open: true,
                component: (
                  <MediaLibrary
                    onSelect={(value) => onChangeElement({ ...field, value })}
                    allow={['image']}
                  />
                ),
                width: 1024,
              },
            })
          }
        />
      );
      break;

    case 'gallery':
      component = (
        <Gallery
          {...field}
          dispatch={dispatch}
          onChange={(value) => onChangeElement({ ...field, value })}
        />
      );
      break;

    case 'file':
      component = (
        <FilePicker
          {...field}
          onRemove={() => onChangeElement({ ...field, value: null })}
          onClick={() =>
            dispatch({
              type: `SET_DIALOG`,
              payload: {
                open: true,
                component: (
                  <MediaLibrary onSelect={(value) => onChangeElement({ ...field, value })} />
                ),
                width: 1024,
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
                    {...field}
                    onChange={(value) => onChangeElement({ ...field, value })}
                  />
                ),
                width: 1024,
              },
            })
          }
        />
      );
      break;

    default:
  }

  return (
    <Fragment key={field.id}>
      {field.type === 'repeater' || field.type === 'flexible_content' || field.type === 'group' ? (
        component
      ) : (
        <FieldContainer>
          <Space direction="vertical" size={6}>
            <Caption children={field.label || field.id} />
            {component}
          </Space>
        </FieldContainer>
      )}
    </Fragment>
  );
};

const EditorFields = (props) => {
  const { fields, onChangeElement } = props;

  const [
    {
      editorState: { site },
    },
    dispatch,
  ] = useStore();

  return (
    <Container>
      {fields && fields.map((field) => getField({ field, site, onChangeElement, dispatch }))}
    </Container>
  );
};

const Container = styled.div`
  > .ant-collapse {
    border: none;
    border-bottom: 1px solid #d9d9d9;
  }

  .ant-collapse-header {
    padding: 12px 16px 12px 30px;
  }
`;

const FieldContainer = styled.div`
  padding: 8px 4px;
`;

export default EditorFields;
