import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { elementRef, isVisible };
};

// Animation type definitions
export type AnimationType = 
  | 'fade-in-up'
  | 'fade-in-left'
  | 'fade-in-right'
  | 'scale-in'
  | 'slide-in-up';

// Hook for staggered animations in grids
export const useStaggeredAnimation = <T extends HTMLElement = HTMLElement>(
  itemCount: number,
  options: UseScrollAnimationOptions = {}
) => {
  const { elementRef, isVisible } = useScrollAnimation<T>(options);
  
  const getStaggerClass = (index: number) => {
    if (!isVisible) return 'animate-on-scroll';
    return `animate-on-scroll animate-fade-in-up stagger-${Math.min(index + 1, 6)}`;
  };

  return { elementRef, isVisible, getStaggerClass };
}; 