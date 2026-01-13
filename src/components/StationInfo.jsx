
const StationInfo = ({ currentStation, videoId }) => {
    return (
        <div className="station-info">
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.youtube.com/watch?v=${currentStation?.id || videoId
                    }`}
            >
                ♫⋆｡♪ ₊˚♬ ﾟ. {currentStation?.name || "Loading..."}
            </a>
        </div>
    );
};

export default StationInfo;
