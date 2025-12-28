import { useEffect, useRef } from 'react';

const AnimatedCounter = ({ value, duration = 2000 }) => {
  const countRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!countRef.current || hasAnimated.current) return;
    
    hasAnimated.current = true;
    const element = countRef.current;
    const start = 0;
    const end = parseInt(value.toString().replace(/,/g, ''));
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);
      
      // Format with commas
      element.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = end.toLocaleString();
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span ref={countRef}>0</span>;
};

export default AnimatedCounter;
