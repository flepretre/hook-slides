import React, { useEffect, useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { getPage } from './pages';
import raf from 'raf';


const Pager = ({renderer}) => {
  const [ page, setPage ] = useState(0);

  const elements = getPage(page).map(({ id, urls: { thumb }}) => (
    <img key={id} src={thumb} style={{'height': '150px', margin: '10px 10px 10px 10px'}}/>
  ));

  return (<div>
    <header>
      <button onClick={() => page < 3 && setPage(page + 1)} disabled={page ===3}>suivant</button>
    </header>
    <div>
      {renderer(elements)}
    </div>
  </div>)
};

export default () => {
  const code = `
const Hook = ({ children }) => {
  const [length, setLength] = useState(0);

  useEffect(
    () => {
      if (length < children.length) {
        const timeout = setTimeout(() => raf(() => setLength(length + 1)), 200);
        // return () => clearTimeout(timeout);
      }
    },
    [length],
  );
  
  // useEffect(() => setLength(0), [children]);

  return children.slice(0, length);
};

render(<Pager renderer={(elements) => (<Hook>{elements}</Hook>)} />);
`;

  return (
    <LiveProvider code={code} scope={{ useState, useEffect, Pager, raf }} noInline>
      <LiveEditor/>
      <br/>
      <LiveError/>
      <LivePreview/>
    </LiveProvider>
  );
};
