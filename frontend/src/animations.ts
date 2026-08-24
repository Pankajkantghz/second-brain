import type { Transition, Variants } from "framer-motion";

/* =====================================================
   PAGE
===================================================== */

export const pageVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

/* =====================================================
   FADE UP
===================================================== */

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

/* =====================================================
   FADE UP CHILD
===================================================== */

export const fadeUpChild: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

/* =====================================================
   STAGGER CONTAINER
===================================================== */

export const staggerContainer: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

/* =====================================================
   CARD FADE UP
===================================================== */

export const cardFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

/* =====================================================
   SCALE FADE
===================================================== */

export const scaleFade: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

/* =====================================================
   CONTENT TRANSITION
   This is a Transition, NOT Variants.
===================================================== */

export const contentTransition: Transition = {
  duration: 0.35,
  ease: "easeOut",
};