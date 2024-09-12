"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Cookie from "js-cookie";

interface GlobalStateType {
  isUserLogin: boolean;
  setIsUserLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalState = createContext<GlobalStateType>({
  isUserLogin: false,
  setIsUserLogin: () => {},
});

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isUserLogin, setIsUserLogin] = useState<boolean>(false);

  // Check the token on initial load and whenever it changes
  useEffect(() => {
    const token = Cookie.get("token");
    if (token) {
      setIsUserLogin(true); // User is logged in if token exists
    } else {
      setIsUserLogin(false); // User is not logged in if token doesn't exist
    }
  }, []);

  return (
    <GlobalState.Provider
      value={{
        isUserLogin,
        setIsUserLogin,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalState);
};
