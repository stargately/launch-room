import { clientReactRender } from "onefx/lib/iso-react-render/client-react-render";

import { noopReducer } from "onefx/lib/iso-react-render/root/root-reducer";
import React from "react";
import { ThemeProvider } from "@/shared/common/styles/theme-provider";
import { IdentityAppContainer } from "./view/identity-app-container";

clientReactRender({
  VDom: (
    <ThemeProvider>
      <IdentityAppContainer />
    </ThemeProvider>
  ),
  reducer: noopReducer,
});
