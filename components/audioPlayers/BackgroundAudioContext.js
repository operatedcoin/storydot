import React, { createContext, useState, useContext, useEffect } from 'react';
import { Audio } from 'expo-av';

const BackgroundAudioContext = createContext();

export const useBackgroundAudio = () => useContext(BackgroundAudioContext);

export const BackgroundAudioProvider = ({ children }) => {
    const [sound, setSound] = useState(null);
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        return sound ? () => {
            sound.unloadAsync();
        } : undefined;
    }, [sound]);

    const loadAudio = async (audioFile) => {
        const { sound: newSound } = await Audio.Sound.createAsync(audioFile);
        await newSound.setIsLoopingAsync(true);
        setSound(newSound);
        return newSound.playAsync();
    };

    const playAudio = () => {
        sound?.playAsync();
    };

    const stopAudio = () => {
        sound?.stopAsync();
    };

    const fadeOutAudio = async (duration = 5000) => {
        if (!sound) return;

        let steps = duration / 100; // Update volume every 100 ms
        let decrementAmount = volume / (duration / 100);
        let currentVolume = volume;

        for (let i = 0; i < steps; i++) {
            currentVolume -= decrementAmount;
            await sound.setVolumeAsync(Math.max(0, currentVolume));
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        stopAudio(); // Optional: Stop the audio after fade out
    };

    const value = {
        loadAudio,
        playAudio,
        stopAudio,
        fadeOutAudio,
        setVolume, // Directly set volume if needed
    };

    return (
        <BackgroundAudioContext.Provider value={value}>
            {children}
        </BackgroundAudioContext.Provider>
    );
};
