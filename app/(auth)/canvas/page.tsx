"use client";
import CanvasHeader from "@/app/components/CanvasHeader";
import { useCanvas } from "@/app/hooks/useCanvas";
import React, { useState, ChangeEvent } from "react";

const strokeSettings: Record<StrokeType, StrokeConfig> = {
  pen: { type: "pen", width: 4 },
  pencil: { type: "pencil", width: 2 },
  brush: { type: "brush", width: 20 },
  eraser: { type: "eraser", width: 25 },
};

export default function Canvas() {
  const { canvasRef, onMouseDown, clearCanvas } = useCanvas(drawLine);
  const [text, setText] = useState<string>("Untitled");
  const [strokeColor, setStrokeColor] = useState<string>("#ffffff");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [strokeSetting, setStrokeSetting] = useState<StrokeConfig>(
    strokeSettings["pencil"]
  );

  const eraserColor = "#000000";

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleColorChange = (color: any) => {
    setStrokeColor(color.hex);
  };

  const handleToolSelection = (strokeType: StrokeType) => {
    setStrokeSetting(strokeSettings[strokeType]);
  };

  const handleTrashClick = () => {
    clearCanvas();
  };

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;

    let strokeStyle =
      strokeSetting.type === "eraser" ? eraserColor : strokeColor;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = strokeSetting.width;
    ctx.strokeStyle = strokeStyle;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();
  }

  return (
    <div>
      <CanvasHeader
        text={text}
        strokeSetting={strokeSetting}
        showColorPicker={showColorPicker}
        strokeColor={strokeColor}
        handleColorChange={handleColorChange}
        handleInputClick={() => {
          setText("");
        }}
        handleInputChange={handleInputChange}
        handleToolSelection={handleToolSelection}
        handleTrashClick={handleTrashClick}
        toggleColorPickerVisibility={() => {
          setShowColorPicker(!showColorPicker);
        }}
      />
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        className="w-screen h-[94vh]"
      ></canvas>
    </div>
  );
}
