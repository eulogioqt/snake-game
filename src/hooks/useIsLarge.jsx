import React from "react";

import { useWindowSize } from "./useWindowSize";

export const useIsLarge = () => {
    const { width } = useWindowSize();

    return width > 768;
};
