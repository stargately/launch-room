import React from "react";
import "../../client/stylesheets/antd.less";
import { Story } from "@storybook/react/types-6-0";
import { BrowserRouter } from "react-router-dom";
import { Provider as StyletronProvider } from "onefx/lib/styletron-react";
// @ts-ignore
import { Client as StyletronClient } from "styletron-engine-atomic";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "onefx/lib/iso-react-render/root/configure-store";
import { MockedProvider, MockedProviderProps } from "@apollo/client/testing";
import { ThemeProvider } from "./styles/theme-provider";

const styletron = new StyletronClient({ prefix: "_" });

type Opts = {
  base: Record<string, unknown>;
} & Pick<MockedProviderProps, "mocks">;

export const themeDecorator = (opts?: Opts) =>
  function Inner(story: Story): JSX.Element {
    return (
      <ReduxProvider store={configureStore({ base: opts?.base || {} })}>
        <StyletronProvider value={styletron}>
          <ThemeProvider>
            <MockedProvider mocks={opts?.mocks}>
              <BrowserRouter>{React.createElement(story)}</BrowserRouter>
            </MockedProvider>
          </ThemeProvider>
        </StyletronProvider>
      </ReduxProvider>
    );
  };
