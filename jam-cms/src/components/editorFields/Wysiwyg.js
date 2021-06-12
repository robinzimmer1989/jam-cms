import React from 'react';

// import app components
import HTMLEditor from '../Jodit';
import { useStore } from '../../store';

const Wysiwyg = (props) => {
  const { value, onChange } = props;

  const [
    {
      editorState: {
        editorSettings: { fullscreen },
      },
    },
    dispatch,
  ] = useStore();

  const handleChange = (c) => onChange(c);

  const handleToggleFullscreen = () =>
    dispatch({ type: 'UPDATE_EDITOR_SETTINGS', payload: { fullscreen: !fullscreen } });

  return (
    <HTMLEditor
      onChange={handleChange}
      defaultValue={value}
      fullscreen={fullscreen}
      onToggleFullscreen={handleToggleFullscreen}
    />
  );
};

export default Wysiwyg;
