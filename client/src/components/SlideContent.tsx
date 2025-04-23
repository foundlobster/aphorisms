import { useState, useEffect } from "react";

interface SlideContentProps {
  title: string;
  subtitle: string;
  slideIndex: number;
}

const SlideContent = ({ title, subtitle, slideIndex }: SlideContentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [slideIndex]);
  
  // Empty component - no patterns or content as requested
  return (
    <div className={`max-w-4xl w-full mx-auto text-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Intentionally empty - no content as per requirements */}
    </div>
  );
};

export default SlideContent;