import { useRef, useEffect } from 'react';

export default ({ attributes, children, element }) => {
  const rootRef = useRef(null);

  useEffect(() => {
    katex.render(element.latex, rootRef.current, {
      throwOnError: false
    });
    // onChange && onChange(latex);
  }, [element.latex]);

  return (
    <span {...attributes}>
      <span contentEditable={false} className="is-latex" ref={rootRef} />
      { children}
    </span>
  );
};
