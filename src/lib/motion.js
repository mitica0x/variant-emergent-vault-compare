// Centralized animation constants — keeps motion props stable across renders.

export const EASE_SOFT = [0.22, 1, 0.36, 1];
export const EASE_SNAP = [0.16, 1, 0.3, 1];
export const EASE_SPRING = [0.34, 1.56, 0.64, 1];

export const FADE_IN_UP = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

export const FADE_IN_UP_BIG = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

export const FADE_IN = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const FADE_SWAP = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const softTransition = (delay = 0, duration = 0.7) => ({
  duration,
  delay,
  ease: EASE_SOFT,
});

export const snapTransition = (duration = 0.35) => ({
  duration,
  ease: EASE_SOFT,
});
