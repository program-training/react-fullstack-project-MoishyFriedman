import React, { createContext, useState } from "react";

interface VisibilityState {
  home: "visible" | "invisible";
  trips: "visible" | "invisible";
  tripDetail: "visible" | "invisible";
  newTripForm: "visible" | "invisible";
  updateTripForm: "visible" | "invisible";
  userRegistration: "visible" | "invisible";
  userLogin: "visible" | "invisible";
}

interface VisibilityContext {
  visibility: VisibilityState;
  setVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
}

interface VisibilityContextProviderProps {
  children: React.ReactNode;
}

export const visibilityContext = createContext<VisibilityContext | null>(null);

const VisibilityContextProvider: React.FC<VisibilityContextProviderProps> = (
  prop
) => {
  const [visibility, setVisibility] = useState<VisibilityState>({
    home: "visible",
    trips: "invisible",
    tripDetail: "invisible",
    newTripForm: "invisible",
    updateTripForm: "invisible",
    userRegistration: "invisible",
    userLogin: "invisible",
  });

  return (
    <visibilityContext.Provider value={{ visibility, setVisibility }}>
      {prop.children}
    </visibilityContext.Provider>
  );
};

export default VisibilityContextProvider;
