import React from 'react';
import styled from 'styled-components';
import { PageHeader, Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

// import app components
import { useStore } from '../store';
import { colors } from '../theme';

const EditorSidebar = (props) => {
  const { title, children } = props;

  const [, dispatch] = useStore();

  const handleClose = () => {
    dispatch({ type: 'SET_EDITOR_SIDEBAR', payload: null });
    dispatch({ type: 'SET_EDITOR_INDEX', payload: null });
  };

  return (
    <Container>
      <PageHeader
        title={title}
        extra={[<CloseOutlined key="close" onClick={handleClose} />]}
        style={{ paddingLeft: 20, paddingRight: 20 }}
      />

      <Divider style={{ margin: 0 }} />

      {children}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: ${colors.background.light};

  .ant-page-header {
    background: #fff;
  }
`;

export default EditorSidebar;
