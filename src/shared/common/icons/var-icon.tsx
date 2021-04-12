import React from "react";

type Props = {
  index: number;
};

type Colors = {
  [key: number]: string;
};

const colors: Colors = {
  0: "rgb(56, 217, 169)",
  1: "rgb(34, 139, 230)",
  2: "rgb(247, 103, 7)",
  3: "rgb(21, 170, 191)",
  4: "rgb(255, 212, 59)",
  5: "rgb(228, 0, 144)",
  6: "rgb(25, 113, 194)",
  7: "rgb(169, 227, 75)",
  8: "rgb(254, 160, 13)",
  9: "rgb(121, 80, 242)",
  10: "rgb(224, 49, 49)",
  11: "rgb(109, 225, 127)",
};

export const VarIcon: React.FC<Props> = ({ index }) => {
  return (
    <svg
      style={{ marginRight: "12px" }}
      x="0"
      y="0"
      width="16px"
      height="16px"
      viewBox="0 0 32 32"
    >
      <polygon
        points="0,16 16,32 32,16 16,0"
        style={{ fill: colors[index % 12], strokeWidth: 0 }}
      />
    </svg>
  );
};
