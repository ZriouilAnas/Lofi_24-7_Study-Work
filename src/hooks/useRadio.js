import { useState, useEffect, useRef } from "react";
import { stations } from "../data/stations";

export function useRadio(initialVideoId) {
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolumeState] = useState(() => {
        const saved = localStorage.getItem("radio_volume");
        return saved !== null ? Number(saved) : 50;
    });
    const [currentStationIndex, setCurrentStationIndex] = useState(() => {
        const idx = stations.findIndex(s => s.id === initialVideoId);
        return idx !== -1 ? idx : 0;
    });
    const [isShuffling, setIsShuffling] = useState(false);
    const fadeIntervalRef = useRef(null);

    useEffect(() => {
        window.onYouTubeIframeAPIReady = () => {
            // If player already exists (re-mount), don't create new one?
            // Actually the iframe API logic usually needs a clean target.
            // We rely on the component providing a ref to an element.
        };
    }, []);

    const onPlayerReady = (event) => {
        const p = event.target;
        setPlayer(p);
        // Browser policy: Autoplay must be muted. We start muted (in component) and then:
        p.mute(); // Ensure muted for play attempt
        p.playVideo();

        // Attempt to unmute and set volume
        // Note: This might struggle if no user interaction effectively occurred, but it's best effort.
        // We set isPlaying true immediately assuming it works or will work.
        setIsPlaying(true);

        // Small delay to ensure play started before unmuting?
        setTimeout(() => {
            p.unMute();
            p.setVolume(volume);
        }, 500);
    };

    const fadeTo = (targetVolume, duration = 1000) => {
        if (!player) return;

        // Clear any existing fade
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

        const startVolume = player.getVolume();
        const range = targetVolume - startVolume;
        const steps = 20; // updates
        const stepTime = duration / steps;
        const volumeStep = range / steps;

        let currentStep = 0;

        fadeIntervalRef.current = setInterval(() => {
            currentStep++;
            const newVol = startVolume + (volumeStep * currentStep);
            player.setVolume(newVol);

            if (currentStep >= steps) {
                clearInterval(fadeIntervalRef.current);
                player.setVolume(targetVolume);
                fadeIntervalRef.current = null;

                // If we faded out to 0 (pause case), actually pause now
                if (targetVolume === 0) {
                    player.pauseVideo();
                }
            }
        }, stepTime);
    };

    const togglePlay = () => {
        if (!player) return;

        if (isPlaying) {
            // Fade out then pause
            setIsPlaying(false);
            fadeTo(0, 800);
        } else {
            // Set volume to 0, start playing, then fade up
            player.setVolume(0);
            player.unMute(); // Ensure unmuted
            player.playVideo();
            setIsPlaying(true);
            fadeTo(volume, 800);
        }
    };

    const setVolume = (newVolume) => {
        setVolumeState(newVolume);
        localStorage.setItem("radio_volume", newVolume);
        if (player && !fadeIntervalRef.current) {
            // Only update 'instant' volume if not fading
            player.setVolume(newVolume);
        }
        // If we are currently fading, the fade loop target might need logic, 
        // but complexity increases. For now, simple interaction:
        // If user changes volume while validly playing, update immediately.
    };

    const pickNextStation = () => {
        let nextIndex;
        if (isShuffling) {
            do {
                nextIndex = Math.floor(Math.random() * stations.length);
            } while (nextIndex === currentStationIndex && stations.length > 1);
        } else {
            nextIndex = (currentStationIndex + 1) % stations.length;
        }
        setCurrentStationIndex(nextIndex);
    };

    const pickPrevStation = () => {
        let nextIndex;
        if (isShuffling) {
            do {
                nextIndex = Math.floor(Math.random() * stations.length);
            } while (nextIndex === currentStationIndex && stations.length > 1);
        } else {
            nextIndex = (currentStationIndex - 1 + stations.length) % stations.length;
        }
        setCurrentStationIndex(nextIndex);
    };

    // Sync station change
    useEffect(() => {
        if (player) {
            const station = stations[currentStationIndex];
            player.loadVideoById(station.id);
            // When changing station, if we were playing, we stay playing.
            // LoadVideoById automatically plays.
            // If we were paused, it might auto-play depending on player state, 
            // usually loadVideoById starts playback.
            // We might want to enforce isPlaying state.
            if (!isPlaying) {
                setTimeout(() => player.pauseVideo(), 500); // Hacky ensure, or use cueVideoById
                // Better: use cueVideoById if not playing? 
                // But usually radio feels like "switch channel -> start hearing it"
                // Let's assume switching channel auto-plays and sets isPlaying true.
                setIsPlaying(true);
                player.setVolume(volume); // Ensure volume is reset
            } else {
                player.setVolume(volume);
            }
        }
    }, [currentStationIndex, player]); // Warning: changing isPlaying in effect might loop if not careful, but safely guarded.

    const toggleShuffle = () => setIsShuffling(p => !p);

    return {
        player,
        setPlayer, // Pass this to the ref creator or onReady handler
        onPlayerReady,
        isPlaying,
        volume,
        setVolume,
        currentStation: stations[currentStationIndex],
        togglePlay,
        nextStation: pickNextStation,
        prevStation: pickPrevStation, // Extra goodies
        toggleShuffle,
        isShuffling
    };
}
