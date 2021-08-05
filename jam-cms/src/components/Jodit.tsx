import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import { Modal } from 'antd';

// import app components
import LinkSelector from './LinkSelector';
import MediaLibrary from './MediaLibrary';
import { colors } from '../theme';
import { useStore } from '../store';

let JoditEditor = (props: any) => <></>;

const HTMLEditor = (props: any) => {
  const { defaultValue = '', onChange } = props;

  const [
    {
      editorState: {
        editorSettings: { fullscreen },
      },
    },
    dispatch,
  ] = useStore();

  const editorRef = useRef(null);

  const [modal, setModal] = useState('');
  const [link, setLink] = useState({} as any);
  const [editor, setEditor] = useState({} as any);
  const [loaded, setLoaded] = useState(false);
  const [content, setContent] = useState(defaultValue);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState(1);

  // We can't trigger the onChange callback within the useMemo function because this resets other fields
  // We're using an index instead of the content which should make the comparison more efficient
  useEffect(() => {
    // The editor fires one onChange event on load if no content is given and two events if the textfield already has a default value.
    // As a result the postHasChanged / siteHasChanged flags will be true so the user won't be able to navigate away, even though has didn't change anything.
    // That's why we add a check for the index and default value here.
    if ((defaultValue && index > 1) || (!defaultValue && index > 0)) {
      onChange(content);
    }
  }, [index]);

  // Jodit module loader on component mount (SSR fix)
  useEffect(() => {
    JoditEditor = require('jodit-react').default;
    setLoaded(true);
  }, []);

  // Disable links in sidebar to allow for relative links (not catched by Jodit)
  useEffect(() => {
    const anchors = document.querySelector('#jam-cms-sidebar')?.querySelectorAll('a') || [];

    for (let i = 0; i < anchors.length; i++) {
      anchors[i].onclick = (e) => {
        e.preventDefault();
      };
    }
  }, [defaultValue, loaded]);

  const handleSetFullscreen = (value: boolean) =>
    dispatch({ type: 'UPDATE_EDITOR_SETTINGS', payload: { fullscreen: value } });

  const handleSelectImage = (image: any) => {
    const html = `<img src="${image.url}" alt="${image.altText}" class="wp-image-${image.id}" />`;

    editor.s.insertHTML(html);

    setModal('');
    setEditor({});
  };

  const handleSelectLink = (link: any) => {
    let target = '';

    if (link.target) {
      target = `target="${link.target}"`;
    }

    const html = `<a href="${link.url}" ${target}>${link.title}</a>`;

    editor.s.insertHTML(html);

    setModal('');
    setLink(null);
    setEditor(null);
  };

  // We use the useMemo hook here to fix some issues where the editor gets resetted because of global state changes
  const jodit = useMemo(() => {
    // Jodit Playground: https://xdsoft.net/jodit/play.html

    const config = {
      // Options: http://rmamuzic.rs/node_modules/jodit/examples/index.html
      toolbarDisableStickyForMobile: false,
      useSearch: false,
      minHeight: 300,
      spellcheck: false,
      showCharsCounter: false,
      showXPathInStatusbar: false,
      toolbarButtonSize: 'small',
      defaultMode: mode,
      placeholder: 'Write something...',
      // Clean: https://xdsoft.net/jodit/doc/options/cleanHTML/
      cleanHTML: {
        fillEmptyParagraph: false,
      },
      // Controls: https://xdsoft.net/jodit/doc/options/controls/
      controls: {
        // We store the fullscreen state in the global state to avoid certain responsiveness bugs with the popup menu
        fullsize: {
          exec: function (e: any) {
            handleSetFullscreen(!fullscreen);
          },
          update: function (e: any) {
            var t = e.j,
              n = fullscreen ? 'shrink' : 'fullsize';
            (e.state.activated = fullscreen),
              t.o.textIcons ? (e.state.text = n) : (e.state.icon.name = n);
          },
          tooltip: 'Open editor in fullsize',
          mode: 3,
        },
        source: {
          mode: 3,
          exec: function (e: any) {
            setMode((mode) => (mode === 1 ? 2 : 1));
          },
          isActive: 'function(e){return e.getRealMode()===o.MODE_SOURCE}',
          tooltip: 'Change mode',
        },
        link: {
          isActive:
            'function(e){var t=e.s.current();return Boolean(t&&i.Dom.closest(t,"a",e.editor))}',
          popup: function (e: any, t: any, n: any, r: any) {
            setEditor(e);
            setLink({
              title: e.s?.range.cloneContents().textContent || e.s.current()?.textContent || '',
              url: t && typeof t.getAttribute === 'function' ? t.getAttribute('href') : '',
              target: t ? t.target : '',
            });
            setModal('link');
            return;
          },
          tags: ['a'],
          tooltip: 'Insert link',
        },
      },
      disablePlugins:
        'print,preview,table-keyboard-navigation,image-processor,xpath,stat,search,limit,font,color,paste-storage,about,video,image,error-messages,copy-format,class-span',
      buttonsXS: ['link', 'align', 'bold', 'paragraph', 'fullsize', 'dots'],
      extraButtons: [
        {
          name: 'jamImage',
          tooltip: 'Image',
          iconURL:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNzkyIDE3OTIiIGNsYXNzPSJqb2RpdC1pY29uX2ltYWdlIGpvZGl0LWljb24iPiA8cGF0aCBkPSJNNTc2IDU3NnEwIDgwLTU2IDEzNnQtMTM2IDU2LTEzNi01Ni01Ni0xMzYgNTYtMTM2IDEzNi01NiAxMzYgNTYgNTYgMTM2em0xMDI0IDM4NHY0NDhoLTE0MDh2LTE5MmwzMjAtMzIwIDE2MCAxNjAgNTEyLTUxMnptOTYtNzA0aC0xNjAwcS0xMyAwLTIyLjUgOS41dC05LjUgMjIuNXYxMjE2cTAgMTMgOS41IDIyLjV0MjIuNSA5LjVoMTYwMHExMyAwIDIyLjUtOS41dDkuNS0yMi41di0xMjE2cTAtMTMtOS41LTIyLjV0LTIyLjUtOS41em0xNjAgMzJ2MTIxNnEwIDY2LTQ3IDExM3QtMTEzIDQ3aC0xNjAwcS02NiAwLTExMy00N3QtNDctMTEzdi0xMjE2cTAtNjYgNDctMTEzdDExMy00N2gxNjAwcTY2IDAgMTEzIDQ3dDQ3IDExM3oiPjwvcGF0aD4gPC9zdmc+',
          exec: function (e: any) {
            setEditor(e);
            setModal('image');
          },
        },
      ],
    };

    return (
      loaded && (
        <JoditEditor
          ref={editorRef}
          value={defaultValue}
          config={config}
          onChange={(newContent: any) => {
            setContent(newContent);
            setIndex((index) => index + 1);
          }}
        />
      )
    );
  }, [loaded, fullscreen, mode]);

  return (
    <Container className={fullscreen ? 'jodit-fullscreen' : ''} fullscreen={fullscreen}>
      <Global />

      {jodit}

      <Modal
        title={modal === 'image' ? 'Media' : 'Link'}
        visible={!!modal}
        onCancel={() => {
          setModal('');
          setLink(null);
        }}
        width={modal === 'image' || modal === 'editor' ? 1024 : 500}
        footer={null}
        destroyOnClose
      >
        {modal === 'image' && <MediaLibrary onSelect={handleSelectImage} allow={['image']} />}
        {modal === 'link' && <LinkSelector onChange={handleSelectLink} value={link} />}
      </Modal>
    </Container>
  );
};

const Container = styled('div' as any)`
  .jodit-wysiwyg_mode,
  .jodit-source__mode {
    ${({ fullscreen }: any) =>
      fullscreen
        ? css`
            position: fixed;
            left: 0;
            top: 0;
            width: 100% !important;
            height: 100% !important;
            z-index: 1000;

            .jodit-wysiwyg {
              padding: 20px !important;
            }

            .jodit-placeholder {
              padding: 20px;
            }

            .jodit-workplace {
              max-width: 600px;
              margin: 0 auto;
            }
          `
        : css`
            .jodit-resizer {
              display: none;
            }
          `}
  }

  .jodit-container:not(.jodit_inline) {
    border: none;
  }

  .jodit-container:not(.jodit_inline) .jodit-wysiwyg {
    padding: 8px;
    border-left: 1px solid ${colors.tertiary};
    border-right: 1px solid ${colors.tertiary};
    border-bottom: 1px solid ${colors.tertiary};
  }

  .jodit-toolbar__box:not(:empty) {
    width: 100% !important;
    border: 1px solid ${colors.tertiary};
    border-radius: 4px;
    background: ${colors.secondaryContrast};
  }

  .jodit-toolbar-editor-collection_mode_horizontal:after {
    background: ${colors.secondaryContrast};
  }

  .jodit-wysiwyg {
    h1 {
      font-size: 1.5rem;
    }

    h2 {
      font-size: 1.4rem;
    }

    h3 {
      font-size: 1.3rem;
    }

    h4 {
      font-size: 1.2rem;
    }

    ul,
    ol {
      padding-left: 20px;
    }

    ul {
      list-style-type: disc;
    }

    ol {
      list-style-type: decimal;
    }

    a {
      text-decoration: underline;
    }
  }

  .jodit-ui-group__jamImage {
    order: -2;
  }

  .jodit-ui-group__jamLink {
    order: -1;
  }
`;

const Global = createGlobalStyle`

  .jodit-container{
    background: transparent !important;
  }

  .jodit-workplace {
    background: #fff;
  }
  
  .jodit-fullscreen {
    .jodit-toolbar-editor-collection {
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
    }

    .jodit-container:not(.jodit_inline){
      background: ${colors.secondaryContrast} !important;
    }
  }

  .jodit_fullsize-box_true.jodit_fullsize-box_true {
    z-index: 1000!important;
  }

  .jodit-popup-container, .jodit-dialog__panel {

    // Style popup
    .jodit-popup{
      border: 1px solid ${colors.tertiary};
      border-radius: 4px;
      box-shadow: none;
      overflow: hidden;
    }

    .jodit-toolbar-editor-collection_mode_horizontal:after {
      background: ${colors.secondaryContrast};
    }
    
    // Remove icons in link menu
    .jodit-toolbar-button_brush,
    .jodit-toolbar-button_file {
      display: none;
    }

    // Remove unlink button from link popup (doesn't work)
    .jodit-ui-button_unlink{
      display: none;
    }

    .jodit-popup__content{
      padding: 0;
      max-height: 400px;
      background: ${colors.secondaryContrast};

      .jodit-toolbar-button_link{
        display: none;
      }
    }

    .jodit-ui-input__label, label {
      margin-bottom: 2px !important;
      font-size: 10px;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 0.5px;
      color: ${colors.secondary};
    }

    .jodit-ui-block {
      margin-top: 20px;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .jodit-ui-button_status_primary, .jodit-ui-button_ok {
      background-color: #2a88fb;
      color: #fff;

      &:hover {
        background-color: #0069d9 !important;
        color: #fff;
      }

      .jodit-ui-button__icon {
        svg {
          path {
            fill: #fff;
          }
        }
      }
    }

    .jodit-input_group{
      margin-top: 0 !important;
    }

    .jodit-ui-form {
      padding: 10px;
    }

    .jodit-toolbar-button, .jodit-toolbar-button__button {
      min-height: auto !important;
    }

    .jodit-toolbar-button__button {
      padding: 2px 6px;
    }
  }
`;

export default HTMLEditor;
