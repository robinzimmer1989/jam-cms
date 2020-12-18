import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

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
import FilePicker from './postEditorAdminFields/FilePicker';
import Menu from './postEditorAdminFields/Menu';
import Repeater from './postEditorAdminFields/Repeater';
import Link from './postEditorAdminFields/Link';
import Select from './postEditorAdminFields/Select';
import Checkbox from './postEditorAdminFields/Checkbox';
import Radio from './postEditorAdminFields/Radio';
import Number from './postEditorAdminFields/Number';
import Settings from './postEditorAdminFields/Settings';
import FlexibleContent from './postEditorAdminFields/FlexibleContent';

import { useStore } from '../store';

export const getField = ({ field, site, onChangeElement, dispatch }) => {
  let component;

  switch (field.type) {
    case 'text':
      component = (
        <Text {...field} onChange={(e) => onChangeElement({ ...field, value: e.target.value })} />
      );
      break;

    case 'wysiwyg':
      component = <Wysiwyg {...field} onChange={(value) => onChangeElement({ ...field, value })} />;
      break;

    case 'number':
      component = <Number {...field} onChange={(value) => onChangeElement({ ...field, value })} />;
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

    case 'settings':
      component = (
        <Settings {...field} onChange={(value) => onChangeElement({ ...field, value })} />
      );
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

    case 'formSelector':
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
                width: 1000,
              },
            })
          }
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
                    {...field}
                    onChange={(value) => onChangeElement({ ...field, value })}
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
    <Fragment key={field.id}>
      {field.type === 'repeater' || field.type === 'flexible_content' ? (
        component
      ) : (
        <FieldContainer>
          <Caption children={field.label || field.id} />
          {component}
        </FieldContainer>
      )}
    </Fragment>
  );
};

const BlockEditFields = (props) => {
  const { fields, isSiteComponent, onDeleteElement, onChangeElement } = props;

  const [
    {
      editorState: { site },
    },
    dispatch,
  ] = useStore();

  return (
    <Container>
      <div>
        {fields && fields.map((field) => getField({ field, site, onChangeElement, dispatch }))}
      </div>

      {!isSiteComponent && (
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
    position: relative;

    .ant-collapse-header {
      padding: 12px 16px 12px 30px;
    }
  }
`;

const FieldContainer = styled.div`
  padding: 12px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  padding: 12px;
`;

export default BlockEditFields;
