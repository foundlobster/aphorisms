import { motion } from "framer-motion";

interface IndicatorDotsProps {
  totalSlides: number;
  currentSlide: number;
  onDotClick: (index: number) => void;
}

const IndicatorDots = ({ totalSlides, currentSlide, onDotClick }: IndicatorDotsProps) => {
  return (
    <div className="indicator-dots absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-10">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button 
          key={index}
          onClick={() => onDotClick(index)}
          className={`dot w-3 h-3 rounded-full bg-white ${
            currentSlide === index ? 'bg-opacity-100 scale-110' : 'bg-opacity-50'
          } hover:bg-opacity-100 transition-all focus:outline-none`}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={currentSlide === index ? 'true' : 'false'}
        >
          {currentSlide === index && (
            <motion.div
              layoutId="activeDot"
              className="w-full h-full rounded-full bg-white"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default IndicatorDots;
