import { Switch } from "onefx/lib/react-router";
import { Route } from "onefx/lib/react-router-dom";
import { styled } from "onefx/lib/styletron-react";
import React, { useEffect } from "react";
import { FOOTER_ABOVE, Footer } from "@/shared/common/footer";
import { Head } from "@/shared/common/head";
import { NotFound } from "@/shared/common/not-found";
import { ScrollToTop } from "@/shared/common/scroll-top";
import { fonts } from "@/shared/common/styles/style-font";
import { TopBar } from "@/shared/common/top-bar";
import { Home } from "@/shared/home/home";
import { FlagsStatusTableController } from "./feature-flags/flags-status-table-controller";
import { FlagDetailsController } from "./flag-details/flag-details-controller";

const initGoogleAnalytics = require("./common/google-analytics");

type Props = {
  googleTid: string;
};

const RootStyle = styled("div", ({ $theme }) => ({
  ...fonts.body,
  backgroundColor: $theme?.colors.black10,
  color: $theme?.colors.text01,
  textRendering: "optimizeLegibility",
}));

export const App: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    initGoogleAnalytics({ tid: props.googleTid });
  });
  return (
    <RootStyle>
      <Head />
      <TopBar />
      <div style={FOOTER_ABOVE}>
        <ScrollToTop>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/default">
              <FlagsStatusTableController />
            </Route>
            <Route exact path="/default/features/:flagKey">
              <FlagDetailsController />
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
};
