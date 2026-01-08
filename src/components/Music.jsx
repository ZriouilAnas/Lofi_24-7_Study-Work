import { useRef, useEffect } from "react";
import { useRadio } from "../hooks/useRadio";
import "./Music.css";

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
    // Wait for API to be ready
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
  }, []); // Run once on mount

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
        <div className="station-info">
          <a
            target="_blank"
            href={`https://www.youtube.com/watch?v=${
              currentStation?.id || videoId
            }`}
          >
            {currentStation?.name || "Loading..."}
          </a>
        </div>
        <div className="controls">
          <button onClick={togglePlay}>
            {isPlaying ? "⏸ Pause" : "▶ Start"}
          </button>
          <button onClick={nextStation}>⏭ Next</button>
          <button
            onClick={toggleShuffle}
            style={{
              fontWeight: isShuffling ? "bold" : "normal",
              color: isShuffling ? "#4CAF50" : "inherit",
            }}
          >
            {isShuffling ? "🔀 On" : "➡️ Off"}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />

          <span>{Math.round(volume)}%</span>
        </div>
      </div>
    </>
  );
}
