import React, { createContext, useState } from "react";

interface IdContext {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

interface IdContextProviderProps {
  children: React.ReactNode;
}

export const idContext = createContext<IdContext | null>(null);

const IdContextProvider: React.FC<IdContextProviderProps> = (prop) => {
  const [userId, setUserId] = useState<string>("");

  return (
    <idContext.Provider value={{ userId, setUserId }}>
      {prop.children}
    </idContext.Provider>
  );
};

export default IdContextProvider;
