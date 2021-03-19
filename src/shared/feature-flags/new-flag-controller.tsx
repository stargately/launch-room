/* eslint-disable camelcase */
import React from "react";
import { NewFlagModal } from "./new-flag-modal";
import { useUpsertFlag } from "../flag-details/hooks/use-upsert-flag";

type Props = {
  newFlagLabel: string;
};

export const NewFlagController: React.FC<Props> = ({ newFlagLabel }) => {
  const { upsertFlag } = useUpsertFlag();
  return <NewFlagModal action={upsertFlag} newFlagLabel={newFlagLabel} />;
};
