import React, { useState } from 'react';
import styled from 'styled-components';
import ChromePicker from 'react-color';

export interface IColorPicker {
  value: string;
  defaultValue?: string;
  onChange: Function;
}

const ColorPicker = (props: IColorPicker) => {
  const { value, defaultValue, onChange } = props;

  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Content onClick={() => setOpen(!open)}>
        <Color style={{ backgroundColor: value }} />
        <Code children={value} />
      </Content>

      <ClickAwayListener open={open} onClick={() => setOpen(false)} />

      {open && (
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

const StyledChromePicker = styled(ChromePicker as any)`
  position: absolute;
  z-index: 12;
  left: 0;
  top: 35px;
`;

const ClickAwayListener = styled('div' as any)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 11;
  pointer-events: ${({ open }: any) => (open ? 'all' : 'none')};
`;

export default ColorPicker;
