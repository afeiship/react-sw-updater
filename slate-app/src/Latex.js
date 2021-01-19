import './App.css';
// Import React dependencies.
import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react';
// Import the Slate editor factory.
import { createEditor, Transforms, Editor, Text } from 'slate';
import * as slate from 'slate';
import LatexEl from './latex-el';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';
import parseTex from 'texjs-parser';

const withLatex = (editor) => {
  const { isInline, isVoid } = editor;
  editor.isVoid = (element) => {
    return element.type.includes('latex') ? true : isVoid(element);
  };
  return editor;
};

const DefaultElement = (props) => {
  return <div {...props.attributes}>{props.children}</div>;
};

export default () => {
  const editor = useMemo(() => withLatex(withReact(createEditor())), []);
  // Add the initial value when setting up our state.

  const [value, setValue] = useState([]);

  const renderElement = (props) => {
    switch (props.element.type) {
      case 'latex:sqrt':
        return <LatexEl {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  };

  const insertSqrt = () => {
    const text = { text: '' };
    const res = window.prompt('请输入平方根的值(也可以是latex源码)?'); // 打开显示提示文本为"你觉得很幸运吗?"的提示窗口
    const latex = String.raw`\sqrt{${res}}`;
    console.log(parseTex(latex));
    const voidNode = { type: 'latex:sqrt', latex, children: [text] };
    Transforms.insertNodes(editor, voidNode);
  };

  return (
    <div className="editor-container">
      <nav className="is-toolbar">
        <button data-action="sqrt" onClick={insertSqrt}>
          平方根
        </button>
      </nav>
      <Slate editor={editor} value={value} onChange={setValue}>
        <Editable renderElement={renderElement} />
      </Slate>
    </div>
  );
};
