import { useCallback, useEffect, useState } from 'react';

export default function useLongPress(callback = () => {}, ms = 300) {
    const [startLongPress, setStartLongPress] = useState(false);
    
    useEffect(() => {
        let timeoutId: null | ReturnType<typeof setTimeout> = null;
        if (startLongPress) {
            timeoutId = setTimeout(callback, ms);
        } else {
            if (timeoutId !== undefined && timeoutId !== null) {
                clearTimeout(timeoutId);
            }
        }

        return () => {
            if (timeoutId !== undefined && timeoutId !== null) {
                clearTimeout(timeoutId);
            }
        };
    }, [callback, ms, startLongPress]);
    
    const start = useCallback(() => {
        setStartLongPress(true);
    }, []);

    const stop = useCallback(() => {
        setStartLongPress(false);
    }, []);
    
    return {
        onMouseDown: start,
        onMouseUp: stop,
        onMouseLeave: stop,
        onTouchStart: start,
        onTouchEnd: stop,
    };
}
