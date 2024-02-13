import React, { createContext, useState, useContext } from 'react';

const GhostContext = createContext();

export const GhostProvider = ({ children }) => {
  const [userSelection, setUserSelection] = useState(null);

  return (
    <GhostContext.Provider value={{ userSelection, setUserSelection }}>
      {children}
    </GhostContext.Provider>
  );
};

export const useGhostContext = () => useContext(GhostContext);
