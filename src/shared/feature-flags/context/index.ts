import React from "react";

export const WorkspaceIdContext = React.createContext("");
export const RefetchContext = React.createContext(
  () =>
    new Promise(() => {
      return 0;
    })
);
