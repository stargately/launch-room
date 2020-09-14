import React from "react";
import { useFlags } from "launchdarkly-react-client-sdk";

export const HooksDemo: React.FC = () => {
  const { announcements } = useFlags();

  console.log("announcements", announcements);

  return <div>{announcements ? "Flag on" : "Flag off"}</div>;
};
