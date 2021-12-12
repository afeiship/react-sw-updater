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

  const DefaultElement = (props) => {
    return <p className='i-am-p' {...props.attributes}>{props.children}</p>;
  };

// Define a rendering function based on the element passed to `props`. We use
// `useCallback` here to memoize the function for subsequent renders.
  const renderElement = (props) => {
    switch (props.element.type) {
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
