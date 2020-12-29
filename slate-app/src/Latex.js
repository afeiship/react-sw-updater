import './App.css';
// Import React dependencies.
import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react'
// Import the Slate editor factory.
import { createEditor, Transforms, Editor, Text } from 'slate'
import * as slate from 'slate';
import LatexEl from './latex-el';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

const withLatex = editor => {
  const { isInline, isVoid } = editor
  editor.isInline = element => {
    return element.type === 'latex' ? true : isInline(element)
  };
  editor.isVoid = element => {
    return element.type === 'latex' ? true : isVoid(element)
  };
  return editor
}

const DefaultElement = props => {
  return <div {...props.attributes}>{props.children}</div>
}


export default () => {
  const editor = useMemo(() => ((withReact(createEditor()))), [])
  // Add the initial value when setting up our state.

  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])

  const renderElement = (props) => {
    console.log(props);
    switch (props.element.type) {
      case 'latex:sqrt':
        return <LatexEl latex={props.element.latex} />
      default:
        return <DefaultElement {...props} />
    }
  }

  const insertSqrt = () => {
    const text = { text: '' }
    const voidNode = { type: 'latex:sqrt', latex: '\sqrt', children: [text] }
    Transforms.insertNodes(editor, voidNode)
  }


  return <div className="editor-container">
    <nav className="is-toolbar">
      <button data-action="sqrt" onClick={insertSqrt}>平方根</button>
    </nav>
    <Slate
      editor={editor}
      value={value}
      onChange={setValue}
    >
      <Editable
        renderElement={renderElement} />
    </Slate>
  </div>
}
