import ReactDOM from 'react-dom';
import React, { useMemo, useState } from 'react';
import { Editor, Transforms, createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { DefaultElement, CodeElement } from './elements';

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }]
    }
  ]);


  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = (props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  };

  window.editor = editor;

  return (
    // Add the editable component inside the context.
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => {
        console.log('new value:', newValue);
        setValue(newValue);
      }}
    >
      <Editable
        renderElement={renderElement}
        onKeyDown={event => {
          console.log('keydown: ', event);
          if (event.key === '`' && event.ctrlKey) {
            // Prevent the "`" from being inserted by default.
            event.preventDefault();
            event.preventDefault();
            // Determine whether any of the currently selected blocks are code blocks.
            const [match] = Editor.nodes(editor, {
              match: n => n.type === 'code'
            });
            console.log('match:', );
            // Toggle the block type depending on whether there's already a match.
            Transforms.setNodes(
              editor,
              { type: match ? 'paragraph' : 'code' },
              // { match: n => Editor.isBlock(editor, n) }
            );
          }
        }}
      />
    </Slate>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
