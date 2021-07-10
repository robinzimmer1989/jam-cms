import React, { useState } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled from 'styled-components';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import ChromePicker from 'react-color';

const ColorPicker = (props: any) => {
  const { value, defaultValue, onChange } = props;

  const [open, setOpen] = useState(false);

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Container>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Content onClick={() => setOpen(!open)}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Color style={{ backgroundColor: value }} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Code children={value} />
      </Content>

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ClickAwayListener open={open} onClick={() => setOpen(false)} />

      {open && (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <StyledChromePicker
          color={value || defaultValue}
          onChange={(color: any) => onChange(color.hex)}
          disableAlpha
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  width: 140px;
  border: 1px solid #001529;
  border-radius: 5px;
  overflow: hidden;
`;

const Color = styled.div`
  width: 40px;
  height: 25px;
  border-right: 1px solid #001529;
`;

const Code = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const StyledChromePicker = styled(ChromePicker)`
  position: absolute;
  z-index: 12;
  left: 0;
  top: 35px;
`;

const ClickAwayListener = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 11;
  pointer-events: ${({
  open
}: any) => (open ? 'all' : 'none')};
`;

export default ColorPicker;
