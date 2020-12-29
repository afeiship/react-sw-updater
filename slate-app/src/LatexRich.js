import './App.css';
// Import React dependencies.
import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react'
// Import the Slate editor factory.
import { createEditor, Transforms, Editor, Text } from 'slate'
import * as slate from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

import "@jswork/next-sample"

const DefaultElement = props => {
  return <div {...props.attributes}>{props.children}</div>
}


const ImageElement = ({ attributes, children, element }) => {
  return (
    <span {...attributes}>
      <img
        contentEditable={false} src="https://himg.bdimg.com/sys/portrait/item/be10475f686d6c73db00.jpg" />
      {children}
    </span>
  )
}

const LatexElement = ({ attributes, children, element }) => {
  const dom = useRef(null);
  const latexes = [
    String.raw`c = \pm\sqrt{a^2 + b^2}`,
    String.raw`\ce{2H2 + O2 ->T[燃烧] 2H2O}`
  ]

  useEffect(() => {
    katex.render(nx.sample(latexes), dom.current, {
      throwOnError: false
    });
  }, [])
  return (
    <span {...attributes} onClick={e => { console.log('click latex'); }}>
      <span
        contentEditable={false}
        className="is-latex" ref={dom}>LAtex</span>
      { children}
    </span>
  )
}


const withImage = editor => {
  const { isInline, isVoid } = editor
  editor.isInline = element => {
    return element.type === 'image' ? true : isInline(element)
  };
  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  };
  return editor
}


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



const App = () => {
  const editor = useMemo(() => withImage(withLatex(withReact(createEditor()))), [])
  // Add the initial value when setting up our state.

  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])

  const renderElement = (props) => {
    switch (props.element.type) {
      case 'latex':
        return <LatexElement {...props} />
      case 'image':
        return <ImageElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }

  const insertLatex = () => {
    const text = { text: '' }
    const voidNode = { type: 'latex', children: [text] }
    Transforms.insertNodes(editor, voidNode)
  }

  const insertImage = () => {
    const text = { text: '' }
    const voidNode = { type: 'image', children: [text] }
    Transforms.insertNodes(editor, voidNode)
  }

  return (
    <div className="editor-container">
      <h1>Latex rich</h1>
      <nav className="editor-container__toolbar">
        <button onClick={insertLatex}>Insert math latex</button>
        <button onClick={insertImage}>Insert image</button>
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
  )
}

export default App;
