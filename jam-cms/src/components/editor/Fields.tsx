import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Space, Typography } from 'antd';

// import app components
import MediaLibrary from '../MediaLibrary';
import LinkSelector from '../LinkSelector';
import Caption from '../Caption';

// Admin fields
import Text from '../editorFields/Text';
import Wysiwyg from '../editorFields/Wysiwyg';
import FilePicker from '../editorFields/FilePicker';
import Menu from '../editorFields/Menu';
import Repeater from '../editorFields/Repeater';
import Link from '../editorFields/Link';
import Select from '../editorFields/Select';
import Checkbox from '../editorFields/Checkbox';
import Radio from '../editorFields/Radio';
import Number from '../editorFields/Number';
import FlexibleContent from '../editorFields/FlexibleContent';
import DatePicker from '../editorFields/DatePicker';
import Group from '../editorFields/Group';
import Gallery from '../editorFields/Gallery';
import GoogleMap from '../editorFields/GoogleMap';
import ColorPicker from '../editorFields/ColorPicker';

import { useAppDispatch, uiActions } from '../../redux';

export const getField = ({ index, field, onChangeElement, level = 1 }: any) => {
  const dispatch: any = useAppDispatch();

  let component;

  switch (field.type) {
    case 'group':
      component = (
        <Group {...field} onChange={(value: any) => onChangeElement({ ...field, value })} />
      );
      break;

    case 'text':
      component = (
        <Text
          {...field}
          onChange={(e: any) => onChangeElement({ ...field, value: e.target.value })}
        />
      );
      break;

    case 'color_picker':
      component = (
        <ColorPicker {...field} onChange={(value: any) => onChangeElement({ ...field, value })} />
      );
      break;

    case 'wysiwyg':
      component = (
        <Wysiwyg
          {...field}
          index={index}
          onChange={(value: any) => onChangeElement({ ...field, value })}
        />
      );
      break;

    case 'number':
      component = (
        <Number {...field} onChange={(value: any) => onChangeElement({ ...field, value })} />
      );
      break;

    case 'date_picker':
      component = (
        <DatePicker {...field} onChange={(value: any) => onChangeElement({ ...field, value })} />
      );
      break;

    case 'link':
      component = (
        <Link
          {...field}
          onRemove={() => onChangeElement({ ...field, value: null })}
          onClick={() =>
            dispatch(
              uiActions.showDialog({
                open: true,
                title: 'Link',
                component: (
                  <LinkSelector
                    {...field}
                    onChange={(value: any) => onChangeElement({ ...field, value })}
                  />
                ),
                width: 500,
              })
            )
          }
        />
      );
      break;

    case 'select':
      component = (
        <Select {...field} onChange={(value: any) => onChangeElement({ ...field, value })} />
      );
      break;

    case 'checkbox':
      component = (
        <Checkbox {...field} onChange={(value: any) => onChangeElement({ ...field, value })} />
      );
      break;

    case 'radio':
      component = (
        <Radio {...field} onChange={(value: any) => onChangeElement({ ...field, value })} />
      );
      break;

    case 'repeater':
      component = (
        <Repeater
          {...field}
          onChange={(value: any) => onChangeElement({ ...field, value })}
          level={level}
        />
      );
      break;

    case 'flexible_content':
      component = (
        <FlexibleContent
          {...field}
          onChange={(value: any) => onChangeElement({ ...field, value })}
          level={level}
        />
      );
      break;

    case 'image':
      component = (
        <FilePicker
          {...field}
          onRemove={() => onChangeElement({ ...field, value: null })}
          onClick={() =>
            dispatch(
              uiActions.showDialog({
                open: true,
                title: 'Media',
                component: (
                  <MediaLibrary
                    onSelect={(value: any) => onChangeElement({ ...field, value })}
                    allow={['image']}
                  />
                ),
                width: 1024,
              })
            )
          }
        />
      );
      break;

    case 'gallery':
      component = (
        <Gallery
          {...field}
          dispatch={dispatch}
          onChange={(value: any) => onChangeElement({ ...field, value })}
        />
      );
      break;

    case 'file':
      component = (
        <FilePicker
          {...field}
          onRemove={() => onChangeElement({ ...field, value: null })}
          onClick={() =>
            dispatch(
              uiActions.showDialog({
                open: true,
                title: 'Media',
                component: (
                  <MediaLibrary onSelect={(value: any) => onChangeElement({ ...field, value })} />
                ),
                width: 1024,
              })
            )
          }
        />
      );
      break;

    case 'menu':
      component = (
        <Menu {...field} onChange={(value: any) => onChangeElement({ ...field, value })} />
      );
      break;

    case 'google_map':
      component = (
        <GoogleMap {...field} onChange={(value: any) => onChangeElement({ ...field, value })} />
      );
      break;

    default:
  }

  return (
    <Fragment key={field.id}>
      {field.type === 'repeater' || field.type === 'flexible_content' || field.type === 'group' ? (
        component
      ) : (
        <FieldContainer level={level}>
          <Space direction="vertical" size={6}>
            <Caption children={field.label || field.id} />
            {field.instructions && (
              <Typography.Text type="secondary" children={field.instructions} />
            )}
            {component}
          </Space>
        </FieldContainer>
      )}
    </Fragment>
  );
};

const Fields = (props: any) => {
  const { fields, onChangeElement } = props;

  return (
    <Container>
      {fields &&
        fields
          .filter((field: any) => !!field)
          .map((field: any) => getField({ field, onChangeElement, level: 0 }))}
    </Container>
  );
};

const Container = styled.div`
  > .ant-collapse {
    border: none;
    border-bottom: 1px solid #d9d9d9;
  }

  .ant-collapse-header {
    padding: 12px 40px 12px 10px !important;
    cursor: grab;
  }

  .ant-collapse-item {
    position: relative;
  }
`;

const FieldContainer = styled('div' as any)`
  padding: 12px ${({ level }: any) => (level === 0 ? '16px' : '10px')};
`;

export default Fields;
