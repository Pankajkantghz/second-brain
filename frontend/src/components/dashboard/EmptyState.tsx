import { motion } from "framer-motion";

import { Button } from "../Button";
import PlusIcon from "../../icons/PlusIcon";
import BrainIcon from "../../icons/BrainIcon";

import {
  fadeUp,
  scaleFade,
  staggerContainer,
} from "../../animations";

interface EmptyStateProps {
  onAdd: () => void;
}

export default function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <motion.section
      variants={scaleFade}
      initial="hidden"
      animate="visible"
      className="
        flex
        w-full
        items-center
        justify-center
        py-8
        sm:py-12
        lg:py-16
      "
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="
          relative
          w-full
          max-w-2xl
          overflow-hidden
          rounded-3xl
          border
          border-dashed
          border-slate-300
          bg-white
          px-5
          py-10
          text-center
          shadow-sm

          sm:rounded-[32px]
          sm:px-8
          sm:py-14

          dark:border-slate-700
          dark:bg-slate-800/70
        "
      >
        {/* Background glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-40
            w-40
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-indigo-500/10
            blur-3xl
          "
        />

        {/* Brain icon */}
        <motion.div
          variants={fadeUp}
          whileHover={{
            y: -4,
            scale: 1.04,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          className="
            relative
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-[24px]
            bg-gradient-to-br
            from-indigo-600
            to-purple-600
            shadow-lg
            shadow-indigo-500/20

            sm:h-24
            sm:w-24
            sm:rounded-[28px]
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-white/10
              backdrop-blur-sm

              sm:h-16
              sm:w-16
            "
          >
            <BrainIcon />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          variants={fadeUp}
          className="relative mt-6 sm:mt-7"
        >
          <h2
            className="
              text-2xl
              font-bold
              tracking-tight
              text-slate-800
              sm:text-3xl
              dark:text-white
            "
          >
            Your brain is empty
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-md
              text-sm
              leading-6
              text-slate-500
              sm:text-base
              dark:text-slate-300
            "
          >
            Start saving videos, tweets, websites, and resources
            to build your second brain.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          className="
            relative
            mt-7
            flex
            justify-center
            sm:mt-8
          "
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            onClick={onAdd}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
          />
        </motion.div>

        {/* Hint */}
        <motion.p
          variants={fadeUp}
          className="
            relative
            mt-4
            text-xs
            text-slate-400
            dark:text-slate-500
          "
        >
          Save something useful for later.
        </motion.p>
      </motion.div>
    </motion.section>
  );
}