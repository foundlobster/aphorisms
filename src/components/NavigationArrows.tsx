import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationArrowsProps {
  onPrev: () => void;
  onNext: () => void;
}

const NavigationArrows = ({ onPrev, onNext }: NavigationArrowsProps) => {
  return (
    <>
      <button 
        onClick={onPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-10 focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button 
        onClick={onNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-10 focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </>
  );
};

export default NavigationArrows;
