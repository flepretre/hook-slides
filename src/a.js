import {
    LiveProvider,
    LiveEditor,
    LiveError,
    LivePreview
  } from 'react-live'
  
import React, { useState } from "react";

export default () => {
  const countCode = `
    const Counter = () => {
        const [ count, setCount ] = useState(0);
    
        return <button onClick={() => setCount(count + 1)}>{count}</button>;
    }

    render(<Counter />);
    `;

  return (
    <LiveProvider code={countCode} scope={{useState}} noInline>
      <LiveEditor />
      <br />
      <LivePreview />
    </LiveProvider>
  );
};
