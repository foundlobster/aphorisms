import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlideContent from "@/components/SlideContent";
import NavigationArrows from "@/components/NavigationArrows";
import IndicatorDots from "@/components/IndicatorDots";
import AudioController from "@/components/AudioController";
import useSlideshow from "@/hooks/useSlideshow";
import { Volume2, VolumeX } from "lucide-react";

// Define the slide data
const slides = [
  {
    id: 1,
    color: "bg-brand-pink",
    audioSrc: "/api/audio/aphorism_1_major.wav",
    title: "",
    subtitle: ""
  },
  {
    id: 2,
    color: "bg-brand-yellow",
    audioSrc: "/api/audio/aphorism_2_minor.wav",
    title: "",
    subtitle: ""
  },
  {
    id: 3,
    color: "bg-brand-peach",
    audioSrc: "/api/audio/aphorism_3_dorian.wav",
    title: "",
    subtitle: ""
  },
  {
    id: 4,
    color: "bg-brand-teal",
    audioSrc: "/api/audio/aphorism_4_phrygian.wav",
    title: "",
    subtitle: ""
  },
  {
    id: 5,
    color: "bg-brand-pink",
    audioSrc: "/api/audio/aphorism_5_lydian.wav",
    title: "",
    subtitle: ""
  },
  {
    id: 6,
    color: "bg-brand-yellow",
    audioSrc: "/api/audio/aphorism_6_mixolydian.wav",
    title: "",
    subtitle: ""
  },
  {
    id: 7,
    color: "bg-brand-peach",
    audioSrc: "/api/audio/aphorism_7_minor.wav",
    title: "",
    subtitle: ""
  },
  {
    id: 8,
    color: "bg-brand-teal",
    audioSrc: "/api/audio/aphorism_8_phrygian.wav",
    title: "",
    subtitle: ""
  },
  {
    id: 9,
    color: "bg-brand-pink",
    audioSrc: "/api/audio/aphorism_9_dorian.wav",
    title: "",
    subtitle: ""
  },
  {
    id: 10,
    color: "bg-brand-yellow",
    audioSrc: "/api/audio/aphorism_10_major.wav",
    title: "",
    subtitle: ""
  }
];

const Slideshow = () => {
  const { 
    currentSlide, 
    goToSlide, 
    nextSlide, 
    prevSlide, 
    audioEnabled, 
    toggleAudio,
    touchStartHandler,
    touchMoveHandler,
    touchEndHandler,
    slideDirection
  } = useSlideshow(slides.length);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded after a short delay to ensure smooth initial animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`h-screen w-screen flex flex-col relative overflow-hidden font-sans text-gray-800 ${slides[currentSlide].color}`}
      onTouchStart={touchStartHandler}
      onTouchMove={touchMoveHandler}
      onTouchEnd={touchEndHandler}
    >
      {/* Audio Controller for handling all audio */}
      <AudioController 
        slides={slides} 
        currentSlide={currentSlide} 
        audioEnabled={audioEnabled} 
      />

      {/* Header Bar */}
      <header className="absolute top-0 w-full z-10 px-6 py-4 flex justify-end items-center bg-transparent">
        <div className="controls">
          <button 
            onClick={toggleAudio}
            className="text-white hover:text-gray-200 focus:outline-none p-2"
            aria-label="Toggle audio"
          >
            {audioEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
        </div>
      </header>

      {/* Slideshow Content */}
      <div className="w-full h-full relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSlide}
            className={`slide ${slides[currentSlide].color} absolute top-0 left-0 w-full h-full`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.3
            }}
          >
            <SlideContent 
              title={slides[currentSlide].title}
              subtitle={slides[currentSlide].subtitle}
              slideIndex={currentSlide}
            />
          </motion.div>
        </AnimatePresence>

        {isLoaded && (
          <>
            {/* Navigation Arrows */}
            <NavigationArrows onPrev={prevSlide} onNext={nextSlide} />
            
            {/* Indicator Dots */}
            <IndicatorDots 
              totalSlides={slides.length} 
              currentSlide={currentSlide} 
              onDotClick={goToSlide} 
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Slideshow;
