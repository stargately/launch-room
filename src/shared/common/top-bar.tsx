import { styled, Theme } from "onefx/lib/styletron-react";
import { assetURL } from "onefx/lib/asset-url";
import { t } from "onefx/lib/iso-i18n";
import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import Select from "antd/lib/select";
import Space from "antd/lib/space";
import Typography from "antd/lib/typography";
import { RootState } from "@/client/javascripts/main";
import { Link } from "onefx/lib/react-router-dom";
import { useFetchEnvironments } from "@/shared/settings/hooks/use-fetch-environments";
import { useFetchProjects } from "@/shared/settings/hooks/use-fetch-projects";
import { CommonMargin } from "./common-margin";
import { Icon } from "./icon";
import { Cross } from "./icons/cross.svg";
import { Hamburger } from "./icons/hamburger.svg";
import { transition } from "./styles/style-animation";
import { colors } from "./styles/style-color";
import { media, PALM_WIDTH } from "./styles/style-media";
import { contentPadding, maxContentWidth } from "./styles/style-padding";

export const TOP_BAR_HEIGHT = 52;

export const TopBar = (): JSX.Element => {
  const [displayMobileMenu, setDisplayMobileMenu] = useState(false);

  const dispatch = useDispatch();

  const userId = useSelector((state: RootState) => state.base.userId);
  const workspaceId = useSelector((state: RootState) => state.base.workspaceId);
  const currentEnvironment = useSelector(
    (state: RootState) => state.base.currentEnvironment
  );

  const { data: projects } = useFetchProjects({
    workspace: workspaceId,
  });
  const { data: environments } = useFetchEnvironments({
    workspace: workspaceId,
  });

  const currentProject = useMemo(
    () =>
      projects?.find((project) => project._id === currentEnvironment.project),
    [projects, currentEnvironment]
  );

  const environmentOptions = useMemo(
    () =>
      environments?.reduce(
        (result: any, item) => ({
          ...result,
          [item.project]: [...(result[item.project] || []), item],
        }),
        []
      ),
    [environments]
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (
        document.documentElement &&
        document.documentElement.clientWidth > PALM_WIDTH
      ) {
        setDisplayMobileMenu(false);
      }
    });
  }, []);

  const hideMobileMenu = (): void => {
    setDisplayMobileMenu(false);
  };

  const renderMenu = (): JSX.Element =>
    userId ? (
      <>
        <A to="/default" onClick={hideMobileMenu}>
          {t("topbar.flags")}
        </A>
      </>
    ) : (
      <A key={0} to="/login" onClick={hideMobileMenu}>
        {t("topbar.login")}
      </A>
    );

  const renderMobileMenu = (): JSX.Element | null => {
    if (!displayMobileMenu) {
      return null;
    }

    return (
      <OutsideClickHandler onOutsideClick={hideMobileMenu}>
        <Dropdown>{renderMenu()}</Dropdown>
      </OutsideClickHandler>
    );
  };

  return (
    <div>
      <Bar>
        <MaxWidth>
          <Flex>
            <Logo />
            <CommonMargin />
            <BrandText to="/">{t("topbar.brand")}</BrandText>
            <CommonMargin />
            <div>
              <Space>
                {currentProject && (
                  <>
                    <Typography.Text>{currentProject.name}</Typography.Text>
                    <Select
                      defaultValue={currentProject.name}
                      style={{ width: 200 }}
                      onChange={(id) =>
                        dispatch({
                          type: "SET_CURRENT_ENVIRONMENT",
                          payload: environments?.find(
                            (value) => value._id === id
                          ),
                        })
                      }
                    >
                      {environmentOptions &&
                        Object.keys(environmentOptions).map((key, i) => {
                          const project = projects?.find(
                            (value) => value._id === key
                          );

                          return (
                            <Select.OptGroup label={project?.name} key={i}>
                              {environmentOptions[key].map((value: any) => (
                                <Select.Option
                                  key={value._id}
                                  value={value._id}
                                >
                                  {value.name}
                                </Select.Option>
                              ))}
                            </Select.OptGroup>
                          );
                        })}
                    </Select>
                  </>
                )}
              </Space>
            </div>
          </Flex>
          <Flex>
            <Menu>{renderMenu()}</Menu>
          </Flex>
          <HamburgerBtn
            displayMobileMenu={displayMobileMenu}
            onClick={() => {
              setDisplayMobileMenu(true);
            }}
          >
            <Hamburger />
          </HamburgerBtn>
          <CrossBtn displayMobileMenu={displayMobileMenu}>
            <Cross />
          </CrossBtn>
        </MaxWidth>
      </Bar>
      <BarPlaceholder />
      {renderMobileMenu()}
    </div>
  );
};

const MaxWidth = styled("div", () => ({
  display: "flex",
  flexDirection: "row",
  ...maxContentWidth,
  justifyContent: "space-between",
  alignItems: "center",
}));

const Bar = styled("nav", ({ $theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  lineHeight: `${TOP_BAR_HEIGHT}px`,
  height: `${TOP_BAR_HEIGHT}px`,
  backgroundColor: $theme.colors.white,
  boxShadow: "0 0 4px 0 #c6c6c6ba",
  color: $theme.colors.textReverse,
  position: "fixed",
  top: "0px",
  left: "0px",
  "z-index": "70",
  ...contentPadding,
  boxSizing: "border-box",
}));

const BarPlaceholder = styled("div", () => {
  const height = TOP_BAR_HEIGHT / 2;
  return {
    display: "block",
    padding: `${height}px ${height}px ${height}px ${height}px`,
    backgroundColor: colors.white,
  };
});

function HamburgerBtn({
  displayMobileMenu,
  children,
  onClick,
}: {
  displayMobileMenu: boolean;
  children: Array<JSX.Element> | JSX.Element;
  onClick: () => void;
}): JSX.Element {
  const Styled = styled("div", {
    ":hover": {
      color: colors.primary,
    },
    display: "none!important",
    [media.palm]: {
      display: "flex!important",
      ...(displayMobileMenu ? { display: "none!important" } : {}),
    },
    cursor: "pointer",
    justifyContent: "center",
  });
  return <Styled onClick={onClick}>{children}</Styled>;
}

function CrossBtn({
  displayMobileMenu,
  children,
}: {
  displayMobileMenu: boolean;
  children: Array<JSX.Element> | JSX.Element;
}): JSX.Element {
  const Styled = styled("div", {
    ":hover": {
      color: colors.primary,
    },
    display: "none!important",
    [media.palm]: {
      display: "none!important",
      ...(displayMobileMenu ? { display: "flex!important" } : {}),
    },
    cursor: "pointer",
    justifyContent: "center",
    padding: "5px",
  });
  return <Styled>{children}</Styled>;
}

const LogoWrapper = styled("a", {
  width: `${TOP_BAR_HEIGHT}px`,
  height: `${TOP_BAR_HEIGHT}px`,
});

function Logo(): JSX.Element {
  return (
    <LogoWrapper href="/">
      <Icon url={assetURL("favicon.svg")} />
    </LogoWrapper>
  );
}

const A = styled(Link, ({ $theme }: { $theme: Theme }) => ({
  color: $theme.colors.text01,
  marginLeft: "14px",
  textDecoration: "none",
  ":hover": {
    color: $theme.colors.primary,
  },
  transition,
  fontWeight: "bold",
  [media.palm]: {
    boxSizing: "border-box",
    width: "100%",
    padding: "16px 0 16px 0",
    borderBottom: "1px #EDEDED solid",
  },
}));

const BrandText = styled(Link, ({ $theme }) => ({
  color: $theme.colors.text01,
  textDecoration: "none",
  ":hover": {
    color: $theme.colors.primary,
  },
  transition,
  fontWeight: "bold",
  marginLeft: 0,
}));

const Flex = styled("div", () => ({
  flexDirection: "row",
  display: "flex",
  boxSizing: "border-box",
}));

const Menu = styled("div", {
  display: "flex!important",
  [media.palm]: {
    display: "none!important",
  },
});

const Dropdown = styled("div", {
  backgroundColor: colors.nav01,
  display: "flex",
  flexDirection: "column",
  ...contentPadding,
  position: "fixed",
  top: TOP_BAR_HEIGHT,
  "z-index": "1",
  width: "100vw",
  height: "100vh",
  alignItems: "flex-end!important",
  boxSizing: "border-box",
});
