
import { useState } from "react";

export function useBackground(initialBg = 1) {
    const [bgImage, setBgImage] = useState(initialBg);
    const [filters, setFilters] = useState({}); // Future extensibility

    const handleBackgroundChange = () => {
        const newBg = bgImage + 1 > 15 ? 1 : bgImage + 1;

        setBgImage(newBg);
    };

    const setBackgroundDirectly = (index) => {
        setBgImage(index);
    }

    return {
        bgImage,
        handleBackgroundChange,
        setBackgroundDirectly,
        filters
    };
}
