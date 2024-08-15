import React, { ChangeEvent } from "react";
import { IoColorPaletteOutline, IoTrashOutline } from "react-icons/io5";
import { HiOutlinePencil } from "react-icons/hi2";
import { PiPaintBrushLight } from "react-icons/pi";
import { BsEraser, BsPen } from "react-icons/bs";
import { ChromePicker } from "react-color";
import { LuUndo, LuRedo } from "react-icons/lu";
import ToolButton from "./ToolButton";
import ToolTip from "./ToolTip";

type CanvasHeaderProps = {
  text: string;
  strokeSetting: StrokeConfig;
  showColorPicker: boolean;
  strokeColor: string;
  handleColorChange: (color: any) => void;
  handleInputClick: () => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleToolSelection: (strokeType: StrokeType) => void;
  handleClearClick: () => void;
  toggleColorPickerVisibility: () => void;
};

const CanvasHeader: React.FC<CanvasHeaderProps> = ({
  text,
  strokeSetting,
  showColorPicker,
  strokeColor,
  handleColorChange,
  handleInputClick,
  handleInputChange,
  handleToolSelection,
  handleClearClick,
  toggleColorPickerVisibility,
}) => {
  return (
    <div className="flex justify-between w-screen h-[6vh] bg-[#2c2c2c] items-center px-8">
      <input
        type="text"
        value={text}
        onClick={handleInputClick}
        onChange={handleInputChange}
        className="text-white bg-[#2c2c2c] border-r-2 border-r-[#424142] focus:outline-none"
      />
      <div className="flex justify-center gap-4 items-center">
        <ToolButton
          icon={
            <HiOutlinePencil
              size={20}
              color="#fff"
              onClick={() => handleToolSelection("pencil")}
            />
          }
          isSelected={strokeSetting.type === "pencil"}
          tooltipText="Pencil"
        />
        <ToolButton
          icon={
            <BsPen
              size={20}
              color="#fff"
              onClick={() => handleToolSelection("pen")}
            />
          }
          isSelected={strokeSetting.type === "pen"}
          tooltipText="Pen"
        />
        <ToolButton
          icon={
            <PiPaintBrushLight
              size={22}
              color="#fff"
              onClick={() => handleToolSelection("brush")}
            />
          }
          isSelected={strokeSetting.type === "brush"}
          tooltipText="Brush"
        />
        <ToolButton
          icon={
            <BsEraser size={22} onClick={() => handleToolSelection("eraser")} />
          }
          isSelected={strokeSetting.type === "eraser"}
          tooltipText="Eraser"
        />
        <ToolTip title="Pick color">
          <div
            className="w-[30px] h-[30px] rounded-full cursor-pointer hover:opacity-90 flex justify-center"
            onClick={toggleColorPickerVisibility}
            style={{
              backgroundColor: strokeColor,
            }}
          >
            <IoColorPaletteOutline size={22} className="mt-[4px]" />
          </div>
        </ToolTip>
        {showColorPicker ? (
          <div
            className="absolute z-20 top-[60px] left-[60%] transform -translate-x-[40%] p-2 bg-[#424142] rounded-lg"
            onMouseLeave={toggleColorPickerVisibility}
          >
            <ChromePicker
              color={strokeColor}
              onChange={handleColorChange}
              className="bg-black"
            />
          </div>
        ) : null}
      </div>
      <div className="flex items-center">
        <ToolButton
          icon={<LuUndo size={20} color="#fff" onClick={() => {}} />}
          tooltipText="Undo"
        />
        <ToolButton
          icon={<LuRedo size={20} color="#fff" onClick={() => {}} />}
          tooltipText="Redo"
        />
        <ToolButton
          icon={
            <IoTrashOutline size={20} color="#fff" onClick={handleClearClick} />
          }
          tooltipText="Clear"
        />
      </div>
    </div>
  );
};

export default CanvasHeader;
