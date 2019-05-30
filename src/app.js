import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer'
import data from './assets/value';

// 构建初始状态…
const initialState = Value.fromJSON(data);
const intialPlainData =  Plain.deserialize('Hello, fei!');

function CodeNode(inProps) {
  const { attributes, children } = inProps;
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
}

function BoldMark(inProps) {
  const { children } = inProps;
  console.log('bold children', children);

  return <strong>{children}</strong>;
}

export default class extends React.Component {
  state = {
    value: intialPlainData
  };

  constructor(inProps) {
    super(inProps);
    this.editor = React.createRef();
  }

  _onChange = (inEvent) => {
    const { value } = inEvent;
    // console.log('value:->', value);
    // console.log(value.toJSON());
    this.setState({ value });
  };

  _onKeyDown = (inEvent, inEditor, inNext) => {
    console.log('current:->', inEditor.value.blocks);
    if (inEvent.ctrlKey && inEvent.key === '`') {
      inEvent.preventDefault();
      return inEditor.toggleMark('bold');
    }
    return inNext();
  };

  _onRenderBlock = (inProps, inEditor, inNext) => {
    switch (inProps.node.type) {
      case 'code':
        return <CodeNode {...inProps} />;
      default:
        return inNext();
    }
  };

  _onRenderMark = (inProps, inEditor, inNext) => {
    console.log('mark!', inProps);
    console.log(inProps.mark.type);


    switch (inProps.mark.type) {
      case 'bold':
        console.log('case bold!');

        return <BoldMark {...inProps} />;
      default:
        return inNext();
    }
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <Editor
          ref={this.editor}
          value={value}
          renderMark={this._onRenderMark}
          renderBlock={this._onRenderBlock}
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
        />
      </div>
    );
  }
}
