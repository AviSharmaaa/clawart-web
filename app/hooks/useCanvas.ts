import { useEffect, useRef, useState } from "react"


export const useCanvas = (handleMouseUp: () => void, handleMouseMove: (ctx: CanvasRenderingContext2D, point: Point) => void) => {
    const [mouseDown, setMouseDown] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const onMouseDown = () => {
        setMouseDown(true)
    };

    const clearCanvas = () => {
        const ctx = canvasRef.current?.getContext('2d');
        ctx!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        }
    }, [])

    useEffect(() => {
        const mouseUpHandler = () => setMouseDown(false);

        const mouseUpHandlerOnCanvas = () => {
            setMouseDown(false);
            handleMouseUp();
        }

        const handleMouseMoveEvent = (e: MouseEvent) => {
            if (!mouseDown) return;

            const currentPoint = computePointInCanvas(e);
            const ctx = canvasRef.current?.getContext('2d');

            if (!ctx || !currentPoint) return;
            handleMouseMove(ctx, currentPoint);

        }

        const computePointInCanvas = (e: MouseEvent) => {
            const canvas = canvasRef.current
            if (!canvas) return

            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            return { x, y }
        }

        const canvas = canvasRef.current;
        canvas?.addEventListener('mousemove', handleMouseMoveEvent)
        canvas?.addEventListener('mouseup', mouseUpHandlerOnCanvas)
        window.addEventListener('mouseup', mouseUpHandler)

        return () => {
            canvas?.removeEventListener('mousemove', handleMouseMoveEvent)
            canvas?.removeEventListener('mouseup', mouseUpHandlerOnCanvas)
            window.removeEventListener('mouseup', mouseUpHandler)
        }
    }, [mouseDown, handleMouseMove, handleMouseUp]);

    return { canvasRef, onMouseDown, clearCanvas };
}