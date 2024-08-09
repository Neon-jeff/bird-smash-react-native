import { createContext, useState } from "react";

const gameContext = createContext({});

const GameContextProvider = ({ children }) => {
  const [hasCollided, setHascollided] = useState(false);
  return <gameContext.Provider>{children}</gameContext.Provider>;
};
