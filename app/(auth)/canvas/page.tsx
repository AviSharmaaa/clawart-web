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
  const { canvasRef, onMouseDown, clearCanvas } = useCanvas(
    handleMouseUp,
    handleMouseMove
  );
  const [text, setText] = useState<string>("Untitled");
  const [strokeColor, setStrokeColor] = useState<string>("#ffffff");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [strokeSetting, setStrokeSetting] = useState<StrokeConfig>(
    strokeSettings["pencil"]
  );

  const [history, setHistory] = useState<Path[]>([]);
  const [pathPoints, setPathPoints] = useState<Point[]>([]);

  const eraserColor = "#000000";

  const handleMouseDown = () => {
    const newPath: Path = {
      points: [],
      strokeColor: strokeColor,
      strokeConfig: strokeSetting,
    };
    setHistory((prevHistory) => [...prevHistory, newPath]);
    onMouseDown();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleColorChange = (color: { hex: string }) => {
    setStrokeColor(color.hex);
  };

  const handleToolSelection = (strokeType: StrokeType) => {
    setStrokeSetting(strokeSettings[strokeType]);
  };

  const handleClearClick = () => {
    clearCanvas();
    setPathPoints([]);
    setHistory([]);
  };

  function handleMouseUp() {
    setPathPoints([]);
  }

  function handleMouseMove(ctx: CanvasRenderingContext2D, point: Point) {
    setPathPoints((prevPoints) => {
      const updatedPoints = [...prevPoints, point];
      updateHistory(updatedPoints);
      return updatedPoints;
    });
    drawLine(ctx);
  }

  const updateHistory = (updatedPoints: Point[]) => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory[newHistory.length - 1].points = updatedPoints;
      return newHistory;
    });
  };

  function drawLine(ctx: CanvasRenderingContext2D) {
    history.forEach((path) => {
      const strokeStyle =
        path.strokeConfig.type === "eraser" ? eraserColor : path.strokeColor;

      path.points.forEach((point, index) => {
        if (index === 0) return;
        const prevPoint = path.points[index - 1];
        ctx.beginPath();
        ctx.lineWidth = path.strokeConfig.width;
        ctx.strokeStyle = strokeStyle;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.moveTo(prevPoint.x, prevPoint.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      });
    });
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
        handleClearClick={handleClearClick}
        toggleColorPickerVisibility={() => {
          setShowColorPicker(!showColorPicker);
        }}
      />
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        className="w-screen h-[94vh]"
      ></canvas>
    </div>
  );
}
