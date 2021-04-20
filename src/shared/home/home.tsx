import React from "react";
import { colors } from "@/shared/common/styles/style-color";
import { ContentPadding } from "@/shared/common/styles/style-padding";
import Row from "antd/lib/grid/row";
import { assetURL } from "onefx/lib/asset-url";
import { styled } from "onefx/lib/styletron-react";
import { Link } from "onefx/lib/react-router-dom";
import Col from "antd/lib/grid/col";
import Layout from "antd/lib/layout";
import { media } from "@/shared/common/styles/style-media";
import { t } from "onefx/lib/iso-i18n";
import { margin } from "polished";
import Button from "antd/lib/button";
import { CommonMargin } from "../common/common-margin";

const Fade = require("react-reveal/Fade");

export const Home = (): JSX.Element => {
  return (
    <Layout>
      <Layout.Content>
        <ContentPadding>
          <StyledHeroRow gutter={32}>
            <Col md={12} xs={24}>
              <HeroH1>{t("home.title_0")}</HeroH1>
              <HeroP>{t("home.desc_0")}</HeroP>

              <CommonMargin />

              <Fade ssrReveal={true}>
                <Link to="/sign-up">
                  <Button size="large" type="primary">
                    GET STARTED FREE
                  </Button>
                </Link>
              </Fade>
              <CommonMargin />
            </Col>

            <Col md={12} xs={24}>
              <Fade right ssrReveal={true}>
                <Img src={assetURL("hero.svg")} alt="Feature flag" />
              </Fade>
            </Col>
          </StyledHeroRow>
        </ContentPadding>
      </Layout.Content>

      <GreyContent>
        <ContentPadding>
          <StyledHeroRow gutter={32}>
            <Col md={12} xs={24}>
              <Fade left ssrReveal={true}>
                <Img src={assetURL("cloud-security.svg")} alt="Feature flag" />
              </Fade>
            </Col>

            <Col md={12} xs={24}>
              <HeroH1>{t("home.title_1")}</HeroH1>
              <HeroP>{t("home.desc_1")}</HeroP>
            </Col>
          </StyledHeroRow>
        </ContentPadding>
      </GreyContent>

      <Layout.Content>
        <WaveImg src={assetURL("wave.png")} />
        <ContentPadding>
          <StyledHeroRow gutter={32}>
            <Col md={12} xs={24}>
              <Card>
                <IconContainer>
                  <Icon src={assetURL("mobile-icon.svg")} />
                </IconContainer>
                <CardTitle>{t("home.card_title_0")}</CardTitle>
                <p>{t("home.card_desc_0")}</p>
              </Card>
            </Col>
            <Col md={12} xs={24}>
              <Card>
                <IconContainer>
                  <Icon src={assetURL("server-icon.svg")} />
                </IconContainer>
                <CardTitle>{t("home.card_title_1")}</CardTitle>
                <p>{t("home.card_desc_1")}</p>
              </Card>
            </Col>
            <Col md={12} xs={24}>
              <Card>
                <IconContainer>
                  <Icon src={assetURL("cms-icon.svg")} />
                </IconContainer>
                <CardTitle>{t("home.card_title_2")}</CardTitle>
                <p>{t("home.card_desc_2")}</p>
              </Card>
            </Col>
            <Col md={12} xs={24}>
              <Card>
                <IconContainer>
                  <Icon src={assetURL("map-icon.svg")} />
                </IconContainer>
                <CardTitle>{t("home.card_title_3")}</CardTitle>
                <p>{t("home.card_desc_3")}</p>
              </Card>
            </Col>
          </StyledHeroRow>
        </ContentPadding>
      </Layout.Content>
    </Layout>
  );
};

const WaveImg = styled("img", {
  position: "absolute",
  height: 500,
});

const Img = styled("img", {
  width: "90%",
  margin: "0 auto",
  display: "block",
  [media.palm]: {
    width: "100%",
  },
});

const HeroH1 = styled("h1", ({ $theme }) => ({
  color: colors.text01,
  fontSize: "36px",
  margin: 0,
  fontWeight: 500,
  [media.palm]: {
    fontSize: $theme.sizing[4],
  },
}));

const HeroP = styled("div", ({ $theme }) => ({
  fontSize: $theme.sizing[3],
  ...margin($theme.sizing[5], 0),
}));

const StyledHeroRow = styled(Row, ({ $theme }) => ({
  ...margin("80px", 0),
  [media.palm]: {
    ...margin($theme.sizing[5], 0, 0),
  },
}));

const Card = styled("div", {
  textAlign: "center",
  wordWrap: "break-word",
});

const IconContainer = styled("div", {
  background: "#5B67FB",
  borderRadius: "100%",
  height: "80px",
  margin: "0 auto 30px",
  width: "80px",
  display: "flex",
});

const Icon = styled("img", {
  display: "block",
  margin: "auto",
});

const CardTitle = styled("h3", {
  fontWeight: 700,
});

const GreyContent = styled(Layout.Content, ({ $theme }) => ({
  backgroundColor: $theme.colors.black40,
}));
