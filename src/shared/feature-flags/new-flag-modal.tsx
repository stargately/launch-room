import Button from "antd/lib/button";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { NewFlagForm } from "@/shared/feature-flags/new-flag-form";
import { styled } from "onefx/lib/styletron-react";
import { margin } from "polished";
import { UpsertFlagVariables } from "../flag-details/data/__generated__/UpsertFlag";

type Props = {
  action: (variables: UpsertFlagVariables) => Promise<void>;
  newFlagLabel: string;
  loading?: boolean;
};

const StyledAddFlag = styled("div", ({ $theme }) => ({
  ...margin($theme.sizing[2], 0),
}));

export const NewFlagModal: React.FC<Props> = ({
  action,
  newFlagLabel,
  loading,
}) => {
  const [visible, setVisible] = useState(false);
  const close = () => setVisible(false);
  const open = () => setVisible(true);
  return (
    <StyledAddFlag>
      <Button onClick={open}>{newFlagLabel}</Button>
      <Modal visible={visible} footer={null} onCancel={close}>
        <NewFlagForm upsertFlag={action} closeModal={close} loading={loading} />
      </Modal>
    </StyledAddFlag>
  );
};
