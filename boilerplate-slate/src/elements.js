import React from 'react';

export const DefaultElement = (props) => {
  return <p className='i-am-p' {...props.attributes}>{props.children}</p>;
};

// Define a React component renderer for our code blocks.
export const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};
