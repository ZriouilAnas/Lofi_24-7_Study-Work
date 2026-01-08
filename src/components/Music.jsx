// Music.jsx
import { useRef, useEffect, useState } from "react";
import { useRadio } from "../hooks/useRadio";
import "./Music.css";
import { Pause, Play, SkipForward, Shuffle } from "lucide-react";

// Modern Volume Slider Component
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

  const getVolumeIcon = () => {
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

  return (
    <div className="volume-control">
      <div className="volume-icon">{getVolumeIcon()}</div>

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

// Main Music Component
export default function Music({ videoId }) {
  const playerRef = useRef(null);

  const {
    onPlayerReady,
    isPlaying,
    volume,
    setVolume,
    currentStation,
    togglePlay,
    nextStation,
    toggleShuffle,
    isShuffling,
  } = useRadio(videoId);

  useEffect(() => {
    const createPlayer = () => {
      if (window.YT && window.YT.Player) {
        new window.YT.Player(playerRef.current, {
          videoId: currentStation?.id || videoId,
          width: 1,
          height: 1,
          playerVars: {
            autoplay: 1,
            controls: 0,
            mute: 1, // Start muted for autoplay
            playsinline: 1,
          },
          events: {
            onReady: onPlayerReady,
          },
        });
      } else {
        setTimeout(createPlayer, 100);
      }
    };

    createPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        ref={playerRef}
        style={{
          width: 1,
          height: 1,
          overflow: "hidden",
          position: "absolute",
        }}
      />
      <div className="player">
        <div className="controls">
          {isPlaying ? (
            <button className="control-btn pause-btn" onClick={togglePlay}>
              <Pause size={50} strokeWidth={2} />
            </button>
          ) : (
            <button className="control-btn play-btn" onClick={togglePlay}>
              <Play size={50} strokeWidth={2} />
            </button>
          )}

          <button className="control-btn skip-btn" onClick={nextStation}>
            <SkipForward size={50} strokeWidth={2} />
          </button>

          <button
            className={`control-btn shuffle-btn ${isShuffling ? "active" : ""}`}
            onClick={toggleShuffle}
          >
            <Shuffle size={50} strokeWidth={1.5} />
          </button>

          <VolumeSlider volume={volume} onVolumeChange={setVolume} />
        </div>
        <div className="station-info">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.youtube.com/watch?v=${
              currentStation?.id || videoId
            }`}
          >
            ♫⋆｡♪ ₊˚♬ ﾟ. {currentStation?.name || "Loading..."}
          </a>
        </div>
      </div>
    </>
  );
}
