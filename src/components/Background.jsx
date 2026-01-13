
import React from 'react';
import '../App.css'; // Reusing App.css for now as it contains crt and bg styles

const Background = ({ bgImage, children, handleBackgroundChange }) => {
    return (
        <div className="crt">
            <div className="crt-content">
                <div
                    className="app-container"
                    style={{ backgroundImage: `url(./pixled/bg${bgImage}.png)` }}
                >
                    {children}

                    <button className="bg-button" onClick={handleBackgroundChange}>
                        Change Background
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Background;
