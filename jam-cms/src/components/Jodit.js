import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Modal } from 'antd';

// import app components
import LinkSelector from './LinkSelector';
import MediaLibrary from './MediaLibrary';
import { colors } from '../theme';

let JoditEditor = () => <></>;

const HTMLEditor = ({ defaultValue = '', fullscreen, onToggleFullscreen, onChange }) => {
  const editorRef = useRef(null);

  const [modal, setModal] = useState(null);
  const [editor, setEditor] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Jodit module loader on component mount (SSR fix)
  useEffect(() => {
    JoditEditor = require('jodit-react').default;
    setLoaded(true);
  }, []);

  const handleSelectImage = (image) => {
    const html = `<img src="${image.url}" alt="${image.altText}" />`;
    editor.s.insertHTML(html);

    setModal(null);
    setEditor(null);
  };

  const handleSelectLink = (link) => {
    const html = `<a href="${link.url}" target="${link.target}">${link.title}</a>`;
    editor.s.insertHTML(html);

    setModal(null);
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
      // Controls: https://xdsoft.net/jodit/doc/options/controls/
      controls: {
        // We store the fullscreen state in the global state to avoid certain responsiveness bugs with the popup menu
        fullsize: {
          exec: function (e) {
            onToggleFullscreen();
          },
          update: function (e) {
            var t = e.j,
              n = fullscreen ? 'shrink' : 'fullsize';
            (e.state.activated = fullscreen),
              t.o.textIcons ? (e.state.text = n) : (e.state.icon.name = n);
          },
          tooltip: 'Open editor in fullsize',
          mode: 3,
        },
      },
      disablePlugins:
        'print,preview,table-keyboard-navigation,image-processor,xpath,symbols,stat,search,placeholder,limit,font,color,paste-storage,about',
      buttonsXS: ['align', 'bold', 'paragraph', 'fullsize', 'dots'],
      extraButtons: [
        {
          name: 'jamImage',
          iconURL:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNzkyIDE3OTIiIGNsYXNzPSJqb2RpdC1pY29uX2ltYWdlIGpvZGl0LWljb24iPiA8cGF0aCBkPSJNNTc2IDU3NnEwIDgwLTU2IDEzNnQtMTM2IDU2LTEzNi01Ni01Ni0xMzYgNTYtMTM2IDEzNi01NiAxMzYgNTYgNTYgMTM2em0xMDI0IDM4NHY0NDhoLTE0MDh2LTE5MmwzMjAtMzIwIDE2MCAxNjAgNTEyLTUxMnptOTYtNzA0aC0xNjAwcS0xMyAwLTIyLjUgOS41dC05LjUgMjIuNXYxMjE2cTAgMTMgOS41IDIyLjV0MjIuNSA5LjVoMTYwMHExMyAwIDIyLjUtOS41dDkuNS0yMi41di0xMjE2cTAtMTMtOS41LTIyLjV0LTIyLjUtOS41em0xNjAgMzJ2MTIxNnEwIDY2LTQ3IDExM3QtMTEzIDQ3aC0xNjAwcS02NiAwLTExMy00N3QtNDctMTEzdi0xMjE2cTAtNjYgNDctMTEzdDExMy00N2gxNjAwcTY2IDAgMTEzIDQ3dDQ3IDExM3oiPjwvcGF0aD4gPC9zdmc+',
          exec: function (e) {
            setEditor(e);
            setModal('image');
          },
        },
        {
          name: 'jamLink',
          iconURL:
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNzkyIDE3OTIiIGNsYXNzPSJqb2RpdC1pY29uX2xpbmsgam9kaXQtaWNvbiI+IDxwYXRoIGQ9Ik0xNTIwIDEyMTZxMC00MC0yOC02OGwtMjA4LTIwOHEtMjgtMjgtNjgtMjgtNDIgMC03MiAzMiAzIDMgMTkgMTguNXQyMS41IDIxLjUgMTUgMTkgMTMgMjUuNSAzLjUgMjcuNXEwIDQwLTI4IDY4dC02OCAyOHEtMTUgMC0yNy41LTMuNXQtMjUuNS0xMy0xOS0xNS0yMS41LTIxLjUtMTguNS0xOXEtMzMgMzEtMzMgNzMgMCA0MCAyOCA2OGwyMDYgMjA3cTI3IDI3IDY4IDI3IDQwIDAgNjgtMjZsMTQ3LTE0NnEyOC0yOCAyOC02N3ptLTcwMy03MDVxMC00MC0yOC02OGwtMjA2LTIwN3EtMjgtMjgtNjgtMjgtMzkgMC02OCAyN2wtMTQ3IDE0NnEtMjggMjgtMjggNjcgMCA0MCAyOCA2OGwyMDggMjA4cTI3IDI3IDY4IDI3IDQyIDAgNzItMzEtMy0zLTE5LTE4LjV0LTIxLjUtMjEuNS0xNS0xOS0xMy0yNS41LTMuNS0yNy41cTAtNDAgMjgtNjh0NjgtMjhxMTUgMCAyNy41IDMuNXQyNS41IDEzIDE5IDE1IDIxLjUgMjEuNSAxOC41IDE5cTMzLTMxIDMzLTczem04OTUgNzA1cTAgMTIwLTg1IDIwM2wtMTQ3IDE0NnEtODMgODMtMjAzIDgzLTEyMSAwLTIwNC04NWwtMjA2LTIwN3EtODMtODMtODMtMjAzIDAtMTIzIDg4LTIwOWwtODgtODhxLTg2IDg4LTIwOCA4OC0xMjAgMC0yMDQtODRsLTIwOC0yMDhxLTg0LTg0LTg0LTIwNHQ4NS0yMDNsMTQ3LTE0NnE4My04MyAyMDMtODMgMTIxIDAgMjA0IDg1bDIwNiAyMDdxODMgODMgODMgMjAzIDAgMTIzLTg4IDIwOWw4OCA4OHE4Ni04OCAyMDgtODggMTIwIDAgMjA0IDg0bDIwOCAyMDhxODQgODQgODQgMjA0eiI+PC9wYXRoPiA8L3N2Zz4=',
          exec: function (e) {
            setEditor(e);
            setModal('link');
          },
        },
      ],
    };

    let init = true;

    return (
      loaded && (
        <JoditEditor
          ref={editorRef}
          value={defaultValue}
          config={config}
          onChange={(newContent) => {
            // The editor fires an onChange event on load which causes the postHasChanged / siteHasChanged values to be off
            if (init) {
              init = false;
            } else {
              onChange(newContent);
            }
          }}
        />
      )
    );
  }, [loaded, fullscreen]);

  return (
    <Container fullscreen={fullscreen}>
      {jodit}

      <Modal
        title={'Link'}
        visible={!!modal}
        onCancel={() => setModal(null)}
        width={modal === 'image' || modal === 'editor' ? 1024 : 500}
        footer={null}
      >
        {modal === 'image' && <MediaLibrary onSelect={handleSelectImage} />}
        {modal === 'link' && (
          <LinkSelector
            onChange={handleSelectLink}
            value={{ title: editor.s.range.cloneContents().textContent, url: '', target: '' }}
          />
        )}
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  .jodit-container.jodit.jodit-wysiwyg_mode {
    ${({ fullscreen }) =>
      fullscreen &&
      css`
        position: fixed;
        left: 0;
        top: 0;
        width: 100% !important;
        height: 100% !important;
        z-index: 1000;
      `}
  }

  .jodit-workplace {
    max-width: 600px;
    margin: 0 auto;
  }

  .jodit-container:not(.jodit_inline) {
    border: none;
  }

  .jodit-container:not(.jodit_inline) .jodit-wysiwyg {
    padding: 8px 0;
  }

  .jodit-toolbar__box:not(:empty) {
    width: 100% !important;
    border: 1px solid #dadada;
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

export default HTMLEditor;
