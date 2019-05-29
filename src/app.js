import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

// 构建初始状态…
const initialState = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.'
              }
            ]
          }
        ]
      }
    ]
  }
});

export default class extends React.Component {
  state = {
    value: initialState
  };

  constructor(inProps){
    super(inProps);
    this.editor = React.createRef();
  }

  componentDidMount() {
    window.editor = this.editor.current;
  }

  _onChange = (inEvent) => {
    const { value } = inEvent;
    console.log('value:->', value);
    console.log(value.toJSON());
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <Editor ref={this.editor} value={value} onChange={this._onChange} />
      </div>
    );
  }
}
