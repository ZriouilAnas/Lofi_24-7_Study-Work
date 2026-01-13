import { useEffect, useRef } from "react";

const Player = ({ currentStation, onPlayerReady }) => {
    const playerRef = useRef(null);

    useEffect(() => {
        const createPlayer = () => {
            if (window.YT && window.YT.Player) {
                new window.YT.Player(playerRef.current, {
                    videoId: currentStation?.id,
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
        <div
            ref={playerRef}
            style={{
                width: 1,
                height: 1,
                overflow: "hidden",
                position: "absolute",
            }}
        />
    );
};

export default Player;
