import React, { useEffect, useMemo, useRef, useState } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'styl... Remove this comment to see the full error message
import styled, { css, createGlobalStyle } from 'styled-components';
import { Modal } from 'antd';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module './LinkSelector' was resolved to '/Users/ro... Remove this comment to see the full error message
import LinkSelector from './LinkSelector';
// @ts-expect-error ts-migrate(6142) FIXME: Module './MediaLibrary' was resolved to '/Users/ro... Remove this comment to see the full error message
import MediaLibrary from './MediaLibrary';
import { colors } from '../theme';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../store' was resolved to '/Users/robinzim... Remove this comment to see the full error message
import { useStore } from '../store';

// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
let JoditEditor = () => <></>;

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

  const [modal, setModal] = useState(null);
  const [link, setLink] = useState(null);
  const [editor, setEditor] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [content, setContent] = useState(defaultValue);
  const [index, setIndex] = useState(0);

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
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    var anchors = document.querySelector('#jam-cms-sidebar').querySelectorAll('a');

    for (var i = 0; i < anchors.length; i++) {
      anchors[i].onclick = (e) => {
        e.preventDefault();
      };
    }
  }, [defaultValue, loaded]);

  const handleToggleFullscreen = () =>
    dispatch({ type: 'UPDATE_EDITOR_SETTINGS', payload: { fullscreen: !fullscreen } });

  const handleSelectImage = (image: any) => {
    const html = `<img src="${image.url}" alt="${image.altText}" />`;
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    editor.s.insertHTML(html);

    setModal(null);
    setEditor(null);
  };

  const handleSelectLink = (link: any) => {
    let target = '';

    if (link.target) {
      target = `target="${link.target}"`;
    }

    const html = `<a href="${link.url}" ${target}>${link.title}</a>`;

    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    editor.s.insertHTML(html);

    setModal(null);
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
            handleToggleFullscreen();
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
        link: {
          isActive:
            'function(e){var t=e.s.current();return Boolean(t&&i.Dom.closest(t,"a",e.editor))}',
          popup: function (e: any, t: any, n: any, r: any) {
            setEditor(e);
            setLink({
              // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ title: any; url: any; target: ... Remove this comment to see the full error message
              title: e.s?.range.cloneContents().textContent || e.s.current()?.textContent || '',
              url: t && typeof t.getAttribute === 'function' ? t.getAttribute('href') : '',
              target: t.target || '',
            });
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"link"' is not assignable to par... Remove this comment to see the full error message
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
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"image"' is not assignable to pa... Remove this comment to see the full error message
            setModal('image');
          },
        },
      ],
    };

    return loaded && (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <JoditEditor
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ ref: MutableRefObject<null>; value: any; c... Remove this comment to see the full error message
        ref={editorRef}
        value={defaultValue}
        config={config}
        onChange={(newContent: any) => {
          setContent(newContent);
          setIndex((index) => index + 1);
        }}
      />
    );
  }, [loaded, fullscreen]);

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Container fullscreen={fullscreen}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Global />

      {jodit}

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Modal
        title={modal === 'image' ? 'Media' : 'Link'}
        visible={!!modal}
        onCancel={() => {
          setModal(null);
          setLink(null);
        }}
        width={modal === 'image' || modal === 'editor' ? 1024 : 500}
        footer={null}
        destroyOnClose
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {modal === 'image' && <MediaLibrary onSelect={handleSelectImage} allow={['image']} />}
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {modal === 'link' && <LinkSelector onChange={handleSelectLink} value={link} />}
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  .jodit-placeholder {
    padding: 8px 0;
  }

  .jodit-container.jodit.jodit-wysiwyg_mode {
    ${({
  fullscreen
}: any) =>
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

const Global = createGlobalStyle`
  // Fullsize styles
  .jodit-container:not(.jodit_inline){
    background: ${colors.secondaryContrast} !important;
    .jodit-workplace {
      background: #fff;
    }
  }

  .jodit_fullsize-box_true.jodit_fullsize-box_true {
    z-index: 1000!important;
  }

  .jodit-popup-container, .jodit-dialog__panel {

    // Style popup
    .jodit-popup{
      border: 1px solid #dadada;
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
