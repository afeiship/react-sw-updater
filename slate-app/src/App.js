import './App.css';
// Import React dependencies.
import React, { useMemo, useCallback, useState } from 'react'
// Import the Slate editor factory.
import { createEditor, Transforms, Editor } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}

const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  // Add the initial value when setting up our state.
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])


  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => {
        console.log('new value:', newValue);
        return setValue(newValue)
      }}
    >
      <Editable
        renderElement={renderElement}
        onKeyDown={event => {
          console.log(event.key);
          if (event.key === '&') {
            // Prevent the ampersand character from being inserted.
            event.preventDefault()
            // Execute the `insertText` method when the event occurs.
            editor.insertText('and')
          }

          if (event.key === '`' && event.ctrlKey) {
            // Prevent the "`" from being inserted by default.
            event.preventDefault()
            // Otherwise, set the currently selected blocks type to "code".
            Transforms.setNodes(
              editor,
              { type: 'code' },
              { match: n => Editor.isBlock(editor, n) }
            )
          }
        }} />
    </Slate>
  )
}

export default App;
