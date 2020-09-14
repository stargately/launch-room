import { Switch } from "onefx/lib/react-router";
import { Route } from "onefx/lib/react-router-dom";
import { styled } from "onefx/lib/styletron-react";
import React, { useEffect, useState } from "react";
import { FOOTER_ABOVE, Footer } from "@/shared/common/footer";
import { Head } from "@/shared/common/head";
import { NotFound } from "@/shared/common/not-found";
import { ScrollToTop } from "@/shared/common/scroll-top";
import { fonts } from "@/shared/common/styles/style-font";
import { TopBar } from "@/shared/common/top-bar";
import { Home } from "@/shared/home/home";
import {
  asyncWithLDProvider,
  useLDClient,
} from "launchdarkly-react-client-sdk";

const initGoogleAnalytics = require("./common/google-analytics");

type Props = {
  googleTid: string;
};

export function App(props: Props): JSX.Element {
  const [LDProvider, setFlagsLoaded] = useState<null | React.FC>(null);
  const ldClient = useLDClient();
  useEffect(() => {
    initGoogleAnalytics({ tid: props.googleTid });
    (async () => {
      try {
        const Provider = await asyncWithLDProvider({
          clientSideID: "your-client-side-id",
          user: {
            key: "aa0ceb",
            name: "Grace Hopper",
            email: "gracehopper@example.com",
          },
          options: {
            baseUrl: "https://stargately.com",
            eventsUrl: "https://stargately.com",
            streaming: false,
          },
        });

        await ldClient?.identify({ key: "aa0ceb" });

        setFlagsLoaded(() => Provider);
      } catch (e) {
        console.log("failed to load flags", e);
      }
    })();
  }, []);

  if (LDProvider) {
    return (
      <LDProvider>
        <Inner />
      </LDProvider>
    );
  }

  return <Inner />;
}

const RootStyle = styled("div", ({ $theme }) => ({
  ...fonts.body,
  backgroundColor: $theme?.colors.black10,
  color: $theme?.colors.text01,
  textRendering: "optimizeLegibility",
}));

const Inner: React.FC = () => (
  <RootStyle>
    <Head />
    <TopBar />
    <div style={FOOTER_ABOVE}>
      <ScrollToTop>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </ScrollToTop>
    </div>
    <Footer />
  </RootStyle>
);
