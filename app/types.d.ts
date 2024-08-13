type Draw = {
    ctx: CanvasRenderingContext2D
    currentPoint: Point
    prevPoint: Point
}

type Point = {
    x: number;
    y: number;
}

type StrokeType = 'pen' | 'pencil' | 'brush' | 'eraser';

type StrokeConfig = {
    type: StrokeType;
    width: number;
};