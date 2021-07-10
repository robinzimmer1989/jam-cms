import React, { Fragment } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
import { Space, Typography } from 'antd';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module '../MediaLibrary' was resolved to '/Users/r... Remove this comment to see the full error message
import MediaLibrary from '../MediaLibrary';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../LinkSelector' was resolved to '/Users/r... Remove this comment to see the full error message
import LinkSelector from '../LinkSelector';
import Caption from '../Caption';

// Admin fields
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editorFields/Text' was resolved to '/Us... Remove this comment to see the full error message
import Text from '../editorFields/Text';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editorFields/Wysiwyg' was resolved to '... Remove this comment to see the full error message
import Wysiwyg from '../editorFields/Wysiwyg';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editorFields/FilePicker' was resolved t... Remove this comment to see the full error message
import FilePicker from '../editorFields/FilePicker';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editorFields/Menu' was resolved to '/Us... Remove this comment to see the full error message
import Menu from '../editorFields/Menu';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editorFields/Repeater' was resolved to ... Remove this comment to see the full error message
import Repeater from '../editorFields/Repeater';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editorFields/Link' was resolved to '/Us... Remove this comment to see the full error message
import Link from '../editorFields/Link';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editorFields/Select' was resolved to '/... Remove this comment to see the full error message
import Select from '../editorFields/Select';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editorFields/Checkbox' was resolved to ... Remove this comment to see the full error message
import Checkbox from '../editorFields/Checkbox';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editorFields/Radio' was resolved to '/U... Remove this comment to see the full error message
import Radio from '../editorFields/Radio';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editorFields/Number' was resolved to '/... Remove this comment to see the full error message
import Number from '../editorFields/Number';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editorFields/FlexibleContent' was resol... Remove this comment to see the full error message
import FlexibleContent from '../editorFields/FlexibleContent';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editorFields/DatePicker' was resolved t... Remove this comment to see the full error message
import DatePicker from '../editorFields/DatePicker';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editorFields/Group' was resolved to '/U... Remove this comment to see the full error message
import Group from '../editorFields/Group';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editorFields/Gallery' was resolved to '... Remove this comment to see the full error message
import Gallery from '../editorFields/Gallery';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editorFields/GoogleMap' was resolved to... Remove this comment to see the full error message
import GoogleMap from '../editorFields/GoogleMap';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editorFields/ColorPicker' was resolved ... Remove this comment to see the full error message
import ColorPicker from '../editorFields/ColorPicker';

// @ts-expect-error ts-migrate(6142) FIXME: Module '../../store' was resolved to '/Users/robin... Remove this comment to see the full error message
import { useStore } from '../../store';

export const getField = ({
  index,
  field,
  site,
  onChangeElement,
  dispatch,
  level = 1
}: any) => {
  let component;
  switch (field.type) {
    case 'group':
      component = (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Group
          {...field}
          site={site}
          dispatch={dispatch}
          onChange={(value: any) => onChangeElement({ ...field, value })}
        />
      );
      break;

    case 'text':
      component = (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Text {...field} onChange={(e: any) => onChangeElement({ ...field, value: e.target.value })} />
      );
      break;

    case 'color_picker':
      component = (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ColorPicker {...field} onChange={(value: any) => onChangeElement({ ...field, value })} />
      );
      break;

    case 'wysiwyg':
      component = (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Wysiwyg
          {...field}
          index={index}
          onChange={(value: any) => onChangeElement({ ...field, value })}
        />
      );
      break;

    case 'number':
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      component = <Number {...field} onChange={(value: any) => onChangeElement({ ...field, value })} />;
      break;

    case 'date_picker':
      component = (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <DatePicker {...field} onChange={(value: any) => onChangeElement({ ...field, value })} />
      );
      break;

    case 'link':
      component = (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
                  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <LinkSelector
                    {...field}
                    onChange={(value: any) => onChangeElement({ ...field, value })}
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
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      component = <Select {...field} onChange={(value: any) => onChangeElement({ ...field, value })} />;
      break;

    case 'checkbox':
      component = (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Checkbox {...field} onChange={(value: any) => onChangeElement({ ...field, value })} />
      );
      break;

    case 'radio':
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      component = <Radio {...field} onChange={(value: any) => onChangeElement({ ...field, value })} />;
      break;

    case 'repeater':
      component = (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Repeater
          {...field}
          site={site}
          dispatch={dispatch}
          onChange={(value: any) => onChangeElement({ ...field, value })}
        />
      );
      break;

    case 'flexible_content':
      component = (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <FlexibleContent
          {...field}
          site={site}
          dispatch={dispatch}
          onChange={(value: any) => onChangeElement({ ...field, value })}
        />
      );
      break;

    case 'image':
      component = (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <FilePicker
          {...field}
          onRemove={() => onChangeElement({ ...field, value: null })}
          onClick={() =>
            dispatch({
              type: `SET_DIALOG`,
              payload: {
                open: true,
                title: 'Media',
                component: (
                  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MediaLibrary
                    onSelect={(value: any) => onChangeElement({ ...field, value })}
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
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Gallery
          {...field}
          dispatch={dispatch}
          onChange={(value: any) => onChangeElement({ ...field, value })}
        />
      );
      break;

    case 'file':
      component = (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <FilePicker
          {...field}
          onRemove={() => onChangeElement({ ...field, value: null })}
          onClick={() =>
            dispatch({
              type: `SET_DIALOG`,
              payload: {
                open: true,
                title: 'Media',
                component: (
                  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <MediaLibrary onSelect={(value: any) => onChangeElement({ ...field, value })} />
                ),
                width: 1024,
              },
            })
          }
        />
      );
      break;

    case 'menu':
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      component = <Menu {...field} onChange={(value: any) => onChangeElement({ ...field, value })} />;
      break;

    case 'google_map':
      component = (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <GoogleMap
          {...field}
          site={site}
          onChange={(value: any) => onChangeElement({ ...field, value })}
        />
      );
      break;

    default:
  }

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Fragment key={field.id}>
      {field.type === 'repeater' || field.type === 'flexible_content' || field.type === 'group' ? (
        component
      ) : (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <FieldContainer level={level + 1}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Space direction="vertical" size={6}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Caption children={field.label || field.id} />
            {field.instructions && (
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

  const [
    {
      editorState: { site },
    },
    dispatch,
  ] = useStore();

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Container>
      {fields &&
        fields
          .filter((field: any) => !!field)
          .map((field: any) => getField({ field, site, onChangeElement, dispatch, level: 0 }))}
    </Container>
  );
};

const Container = styled.div`
  background: #fff;

  > .ant-collapse {
    border: none;
    border-bottom: 1px solid #d9d9d9;
  }

  .ant-collapse-header {
    padding: 12px 16px 12px 30px;
  }
`;

const FieldContainer = styled.div`
  padding: 8px ${({
  level
}: any) => (level === 1 ? '16px' : '4px')};
`;

export default Fields;
