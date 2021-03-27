import React from "react";

type Props = {
  value: boolean;
};

export const VarIcon: React.FC<Props> = ({ value }) => {
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
        style={{
          fill: value ? "rgb(56, 217, 169)" : "rgb(34, 139, 230)",
          strokeWidth: 0,
        }}
      ></polygon>
    </svg>
  );
};
