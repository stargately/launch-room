import React from "react";

type RefetchContextType = (variables?: any) => void;

export const WorkspaceIdContext = React.createContext("");
export const RefetchContext = React.createContext<RefetchContextType>(
  () =>
    new Promise(() => {
      return 0;
    })
);
