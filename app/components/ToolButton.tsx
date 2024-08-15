import React from "react";
import ToolTip from "./ToolTip";

type ToolButtonProps = {
  isSelected?: boolean;
  icon: JSX.Element;
  tooltipText?: string;
};

const ToolButton: React.FC<ToolButtonProps> = ({
  isSelected = false,
  icon,
  tooltipText,
}) => {
  return (
    <div
      className={`rounded-full w-[35px] h-[35px] flex items-center justify-center cursor-pointer ${
        isSelected ? "bg-[#424142]" : "bg-none"
      }`}
    >
      {tooltipText ? <ToolTip title={tooltipText}>{icon}</ToolTip> : icon}
    </div>
  );
};

export default ToolButton;
