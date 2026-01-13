// Music.jsx
import { useRadio } from "../hooks/useRadio";
import "./Music.css";
import Player from "./Player";
import PlayerControls from "./PlayerControls";
import StationInfo from "./StationInfo";

// Main Music Component
export default function Music({ videoId }) {
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

  return (
    <>
      <Player currentStation={currentStation || { id: videoId }} onPlayerReady={onPlayerReady} />

      <div className="player">
        <StationInfo
          currentStation={currentStation}
          videoId={videoId}
        />

        <PlayerControls
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          nextStation={nextStation}
          toggleShuffle={toggleShuffle}
          isShuffling={isShuffling}
          volume={volume}
          setVolume={setVolume}
        />
      </div>
    </>
  );
}
