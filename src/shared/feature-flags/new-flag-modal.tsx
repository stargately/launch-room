import Button from "antd/lib/button";
import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { NewFlagForm } from "@/shared/feature-flags/new-flag-form";

type Props = {
  action: Promise<boolean>;
};

export const NewFlagModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const close = () => setVisible(false);
  const open = () => setVisible(true);
  return (
    <>
      <Button onClick={open}>+ Flag</Button>
      <Modal style={{ top: 0 }} visible={visible} onOk={close} onCancel={close}>
        <NewFlagForm />
      </Modal>
    </>
  );
};
