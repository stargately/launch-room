import { clientReactRender } from "onefx/lib/iso-react-render/client-react-render";
import { noopReducer } from "onefx/lib/iso-react-render/root/root-reducer";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { combineReducers, Reducer } from "redux";
import { AppContainer } from "@/shared/app-container";
import { apolloClient } from "@/shared/common/apollo-client";
import { baseReducer } from "@/shared/common/base-reducer";
import { ThemeProvider } from "@/shared/common/styles/theme-provider";

const reducer = combineReducers({
  base: baseReducer,
  apolloState: noopReducer,
}) as Reducer;

export type RootState = ReturnType<typeof reducer>;

clientReactRender({
  VDom: (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <AppContainer />
      </ThemeProvider>
    </ApolloProvider>
  ),
  reducer,
});
