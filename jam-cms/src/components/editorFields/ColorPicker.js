import React, { useState } from 'react';
import styled from 'styled-components';
import ChromePicker from 'react-color';

const ColorPicker = (props) => {
  const { value, defaultValue, onChange } = props;

  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Swatch style={{ backgroundColor: value }} onClick={() => setOpen(!open)} />

      <ClickAwayListener open={open} onClick={() => setOpen(false)} />

      {open && (
        <StyledChromePicker
          color={value || defaultValue}
          onChange={(color) => onChange(color.hex)}
          disableAlpha
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Swatch = styled.div`
  width: 100%;
  height: 25px;
  border-radius: 5px;
  border: 1px solid #001529;
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
  pointer-events: ${({ open }) => (open ? 'all' : 'none')};
`;

export default ColorPicker;
