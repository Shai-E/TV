import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number): string => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;

// export const useDebounceCB = (cb: Function, delay: number): void => {
//     useEffect(() => {
//         const handler = setTimeout(() => {
//             cb();
//         }, delay);

//         return () => {
//             clearTimeout(handler);
//         };
//     }, [cb, delay]);

//     return;
// }

