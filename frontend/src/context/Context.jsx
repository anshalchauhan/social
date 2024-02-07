// React
import { createContext, useContext, useEffect, useState } from "react";

// Creating Context
const AppContext = createContext(null);

// Creating hook for easy accessibility
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user-social"));

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
