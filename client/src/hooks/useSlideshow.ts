import { useState, useCallback, useEffect } from 'react';

export default function useSlideshow(totalSlides: number) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      // Set direction based on index relative to current slide
      if (index > currentSlide || (currentSlide === totalSlides - 1 && index === 0)) {
        setSlideDirection('right');
      } else {
        setSlideDirection('left');
      }
      setCurrentSlide(index);
    }
  }, [totalSlides, currentSlide]);

  const nextSlide = useCallback(() => {
    setSlideDirection('right');
    const nextIndex = (currentSlide + 1) % totalSlides;
    setCurrentSlide(nextIndex);
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    setSlideDirection('left');
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    setCurrentSlide(prevIndex);
  }, [currentSlide, totalSlides]);

  const toggleAudio = useCallback(() => {
    setAudioEnabled(prev => !prev);
  }, []);

  // Touch handlers for mobile swipe
  const touchStartHandler = useCallback((e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  }, []);

  const touchMoveHandler = useCallback((e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  }, []);

  const touchEndHandler = useCallback(() => {
    const diffX = touchStartX - touchEndX;
    
    // If the swipe is significant enough (more than 50px)
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swipe left, go to next slide
        nextSlide();
      } else {
        // Swipe right, go to previous slide
        prevSlide();
      }
    }
    
    // Reset touch positions
    setTouchStartX(0);
    setTouchEndX(0);
  }, [touchStartX, touchEndX, nextSlide, prevSlide]);

  return {
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
  };
}
