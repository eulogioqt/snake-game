import React from "react";

import { useIsLarge } from "../../../hooks/useIsLarge";

const LoadingScreen = () => {
    const isLarge = useIsLarge();

    return (
        <>
            <div className='d-flex align-items-center justify-content-center position-fixed w-100 h-100'
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 200 }}>
                <div className="spinner-border" style={{ width: "100px", height: "100px" }} role="status">
                    <span className="visually-hidden mb-5 text-center" style={{ fontSize: isLarge ? "5rem" : "3rem" }}>
                        Cargando Snake Game...
                    </span>
                </div>
            </div>
        </>
    );
}

export default LoadingScreen;
