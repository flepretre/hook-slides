import React, { useEffect, useState, useContext } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

const code = `
const Context = React.createContext();

export const useRedux = () => {
  const store = useContext(Context);
  const [reduxState, setReduxState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setReduxState(store.getState()));
    return () => unsubscribe();
  });

  return [reduxState, store.dispatch];
};
`;



export default () => (
  <LiveProvider code={code} scope={{ useState, useEffect, useContext }} noInline>
    <LiveEditor/>
  </LiveProvider>
);
