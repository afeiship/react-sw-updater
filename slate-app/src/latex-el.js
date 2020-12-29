import { useRef, useEffect } from 'react';

export default (props) => {
  const rootRef = useRef(null);
  const { latex, onChange } = props;

  useEffect(() => {
    katex.render(String.raw`${latex}`, rootRef.current, {
      throwOnError: false
    });
    onChange && onChange(latex);
  }, [latex])

  return <span className="is-latex" ref={rootRef} />
}
