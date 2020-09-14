import React from "react";
import { actionSetTheme } from "@/shared/common/base-reducer";
import { colors } from "@/shared/common/styles/style-color";
import { ContentPadding } from "@/shared/common/styles/style-padding";
import Row from "antd/lib/grid/row";
import { assetURL } from "onefx/lib/asset-url";
import { styled } from "onefx/lib/styletron-react";
import { connect } from "react-redux";
import Col from "antd/lib/grid/col";
import { Flex } from "@/shared/common/flex";
import { media } from "@/shared/common/styles/style-media";
import { t } from "onefx/lib/iso-i18n";
import { margin } from "polished";
import Button from "antd/lib/button";
import { CommonMargin } from "../common/common-margin";

const Fade = require("react-reveal/Fade");

export const Home = connect(
  (state: { base: { themeCode: "dark" | "light" } }) => ({
    themeCode: state.base.themeCode,
  }),
  (dispatch) => ({
    actionSetTheme: (themeCode: "dark" | "light") => {
      dispatch(actionSetTheme(themeCode));
    },
  })
)(
  (): JSX.Element => {
    return (
      <div>
        <ContentPadding>
          <StyledHeroRow gutter={32}>
            <Col md={12} xs={24}>
              <HeroH1>{t("home.title")}</HeroH1>
              <HeroP>{t("home.desc")}</HeroP>

              <CommonMargin />

              <Fade ssrReveal={true}>
                <Button href="/sign-up/" type="primary">
                  Sign Up for Free
                </Button>
                <CommonMargin />
                <Button>Fork me on Github</Button>
              </Fade>
              <CommonMargin />
            </Col>

            <Col md={12} xs={24}>
              <Flex center={true} width="100%">
                <Fade right ssrReveal={true} style={{ width: "100%" }}>
                  <Img src={assetURL("hero.svg")} alt="Feature flag" />
                </Fade>
                <CommonMargin />
              </Flex>
            </Col>
          </StyledHeroRow>
        </ContentPadding>
      </div>
    );
  }
);

const Img = styled("img", {
  width: "100%",
  height: "400px",
  [media.palm]: {
    width: "100%",
  },
});

const HeroH1 = styled("h1", ({ $theme }) => ({
  color: colors.text01,
  fontSize: $theme.sizing[5],
  margin: 0,
  fontWeight: 700,
  [media.palm]: {
    fontSize: $theme.sizing[4],
  },
}));

const HeroP = styled("div", ({ $theme }) => ({
  fontSize: $theme.sizing[3],
  fontWeight: 400,
  ...margin($theme.sizing[3], 0),
}));

const StyledHeroRow = styled(Row, ({ $theme }) => ({
  ...margin("120px", 0, 0),
  [media.palm]: {
    ...margin($theme.sizing[5], 0, 0),
  },
}));
