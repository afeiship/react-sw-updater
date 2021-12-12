import ReactDOM from 'react-dom';
import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }]
    }
  ]);

  return (
    // Add the editable component inside the context.
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <Editable
        onKeyDown={event => {
          console.log('keydown: ', event);
          if (event.key === '&') {
            // Prevent the ampersand character from being inserted.
            event.preventDefault();
            // Execute the `insertText` method when the event occurs.
            editor.insertText('and');
          }
        }}
      />
    </Slate>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
