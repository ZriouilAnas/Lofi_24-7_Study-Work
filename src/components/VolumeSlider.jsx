
import { useState, useRef } from "react";
import "./Music.css"; // We might want to separate CSS later, but for now reuse

const getVolumeIcon = (volume) => {
    if (volume === 0) {
        return "🔇";
    } else if (volume < 30) {
        return "🔈";
    } else if (volume < 70) {
        return "🔉";
    } else {
        return "🔊";
    }
};

const VolumeSlider = ({ volume, onVolumeChange }) => {
    const [isHovered, setIsHovered] = useState(false);
    const sliderRef = useRef(null);
    const [isChanging, setIsChanging] = useState(false);

    const handleClick = (e) => {
        if (sliderRef.current) {
            const rect = sliderRef.current.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const percentage = (offsetX / rect.width) * 100;
            const newVolume = Math.min(100, Math.max(0, Math.round(percentage)));
            onVolumeChange(newVolume);
        }
    };

    return (
        <div className="volume-control">
            <div className="volume-icon">{getVolumeIcon(volume)}</div>

            <div
                className="slider-wrapper"
                ref={sliderRef}
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseDown={() => setIsChanging(true)}
                onMouseUp={() => setIsChanging(false)}
            >
                <div className="slider-track">
                    <div className="slider-progress" style={{ width: `${volume}%` }}>
                        <div className="progress-glow"></div>
                    </div>
                    <div
                        className={`slider-thumb ${isChanging ? "active" : ""}`}
                        style={{ left: `${volume}%` }}
                    />
                </div>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => onVolumeChange(Number(e.target.value))}
                    className="volume-slider-input"
                    aria-label="Volume control"
                />

                {isHovered && (
                    <div className="volume-display" style={{ left: `${volume}%` }}>
                        {volume}%
                    </div>
                )}
            </div>

            <div className="volume-percentage">{Math.round(volume)}%</div>
        </div>
    );
};

export default VolumeSlider;
