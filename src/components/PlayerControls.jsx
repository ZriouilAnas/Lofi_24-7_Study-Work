
import { Pause, Play, SkipForward, Shuffle } from "lucide-react";
import VolumeSlider from "./VolumeSlider";

const PlayerControls = ({
    isPlaying,
    togglePlay,
    nextStation,
    toggleShuffle,
    isShuffling,
    volume,
    setVolume,
}) => {
    return (
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
    );
};

export default PlayerControls;
