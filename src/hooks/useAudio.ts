import { useState, useEffect, useRef } from 'react';

interface UseAudioProps {
  audioSrc: string;
  isPlaying: boolean;
  loop?: boolean;
}

export function useAudio({ audioSrc, isPlaying, loop = true }: UseAudioProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.loop = loop;
    audioRef.current = audio;

    // Clean up when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [loop]);

  // Handle audio source changes
  useEffect(() => {
    if (!audioRef.current) return;

    // Reset state
    setIsLoaded(false);
    setError(null);
    
    // Set up new audio source
    audioRef.current.src = audioSrc;
    
    // Set up event handlers
    const handleCanPlayThrough = () => {
      setIsLoaded(true);
    };
    
    const handleError = (e: ErrorEvent) => {
      setError(`Failed to load audio: ${e.message}`);
      console.error("Audio loading error:", e);
    };
    
    audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
    audioRef.current.addEventListener('error', handleError as EventListener);
    
    // Preload audio
    audioRef.current.load();
    
    // Clean up event listeners when source changes
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
        audioRef.current.removeEventListener('error', handleError as EventListener);
      }
    };
  }, [audioSrc]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying && isLoaded) {
      // Use Promise to handle play() rejections
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Auto-play was prevented
          console.warn("Audio playback was prevented:", error);
          setError("Audio playback was prevented by the browser. Click anywhere to enable audio.");
        });
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
      
      // Reset to beginning if we're moving to a new slide
      if (!isPlaying) {
        audioRef.current.currentTime = 0;
      }
    }
  }, [isPlaying, isLoaded]);

  const play = () => {
    if (audioRef.current && isLoaded) {
      audioRef.current.play()
        .catch(error => {
          console.warn("Audio playback was prevented:", error);
        });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        play();
      } else {
        pause();
      }
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  return {
    isLoaded,
    error,
    play,
    pause,
    stop,
    togglePlayback,
    seekTo,
    audioElement: audioRef.current
  };
}

export default useAudio;
