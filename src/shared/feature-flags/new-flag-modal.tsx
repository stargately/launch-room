import Button from "antd/lib/button";
import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { NewFlagForm } from "@/shared/feature-flags/new-flag-form";
import { UpsertFlagVariables } from "../flag-details/data/__generated__/UpsertFlag";

type Props = {
  action: (variables: UpsertFlagVariables) => Promise<void>;
};

export const NewFlagModal: React.FC<Props> = ({ action }) => {
  const [visible, setVisible] = useState(false);
  const close = () => setVisible(false);
  const open = () => setVisible(true);
  return (
    <>
      <Button onClick={open}>+ Flag</Button>
      <Modal style={{ top: 0 }} visible={visible} footer={null}>
        <NewFlagForm action={action} closeModal={close} />
      </Modal>
    </>
  );
};
