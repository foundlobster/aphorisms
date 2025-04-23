import { useEffect, useState, useRef } from "react";
import ReactHowler from "react-howler";

interface AudioControllerProps {
  slides: Array<{
    id: number;
    audioSrc: string;
  }>;
  currentSlide: number;
  audioEnabled: boolean;
}

const AudioController = ({ slides, currentSlide, audioEnabled }: AudioControllerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const playerRef = useRef<ReactHowler | null>(null);

  useEffect(() => {
    // Reset loading state when slide changes
    setIsLoading(true);
  }, [currentSlide]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="hidden">
      {slides.map((slide, index) => (
        currentSlide === index && (
          <ReactHowler
            key={slide.id}
            src={slide.audioSrc}
            playing={audioEnabled && !isLoading}
            loop={true}
            ref={playerRef}
            onLoad={handleLoad}
            preload={true}
          />
        )
      ))}
    </div>
  );
};

export default AudioController;
