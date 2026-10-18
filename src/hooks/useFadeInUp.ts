import { useRef } from 'react';
import { useInView, Variants } from 'motion/react';

export interface UseFadeInUpOptions {
  /**
   * Threshold fraction of the element that needs to be in view (0 to 1),
   * or 'some' / 'all'. Default is 0.15.
   */
  amount?: number | 'some' | 'all';
  /**
   * Only trigger once when scrolled into view. Default is true.
   */
  once?: boolean;
  /**
   * Distance in pixels to travel upwards. Default is 36px.
   */
  distance?: number;
  /**
   * Duration of each item animation in seconds. Default is 0.75s.
   */
  duration?: number;
  /**
   * Stagger delay between sibling items. Default is 0.12s.
   */
  staggerChildren?: number;
  /**
   * Initial delay before animation sequence starts. Default is 0.1s.
   */
  delayChildren?: number;
}

export function useFadeInUp<T extends HTMLElement = HTMLElement>(
  options: UseFadeInUpOptions = {}
) {
  const {
    amount = 0.15,
    once = true,
    distance = 36,
    duration = 0.75,
    staggerChildren = 0.12,
    delayChildren = 0.1
  } = options;

  const ref = useRef<T>(null);
  const isInView = useInView(ref, { amount, once });

  // Container variants with orchestrating stagger
  const containerVariants: Variants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren
      }
    }
  };

  // Item variants for each card/header element with smooth luxury easing
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: distance,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return {
    ref,
    isInView,
    containerVariants,
    itemVariants
  };
}
