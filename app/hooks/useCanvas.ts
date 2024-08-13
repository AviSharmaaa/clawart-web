import { useEffect, useRef, useState } from "react"


export const useCanvas = (onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void) => {
    const [mouseDown, setMouseDown] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const prevPoint = useRef<null | Point>(null);

    const onMouseDown = () => {
        setMouseDown(true)
    };

    const clearCanvas = () => {
        const ctx = canvasRef.current?.getContext('2d');
        ctx!.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    }

    useEffect(() => {
        canvasRef.current!.height = canvasRef.current!.clientHeight;
        canvasRef.current!.width = canvasRef.current!.clientWidth;
    }, [])

    useEffect(() => {
        const mouseUpHandler = () => {
            setMouseDown(false);
            prevPoint.current = null;
        }

        const handler = (e: MouseEvent) => {

            if (!mouseDown) return;

            const currentPoint = computePointInCanvas(e);

            const ctx = canvasRef.current?.getContext('2d');

            if (!ctx || !currentPoint) return;
            onDraw({ ctx, currentPoint, prevPoint: prevPoint.current! })
            prevPoint.current = currentPoint;

        }

        const computePointInCanvas = (e: MouseEvent) => {
            const canvas = canvasRef.current
            if (!canvas) return

            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            return { x, y }
        }

        canvasRef.current?.addEventListener('mousemove', handler)
        window.addEventListener('mouseup', mouseUpHandler)

        return () => {
            canvasRef.current?.removeEventListener('mousemove', handler)
            window.removeEventListener('mouseup', mouseUpHandler)
        }
    }, [onDraw]);

    return { canvasRef, onMouseDown, clearCanvas };
}