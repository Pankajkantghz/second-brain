import { motion } from "framer-motion";

import { Button } from "../Button";
import PlusIcon from "../../icons/PlusIcon";
import ShareIcon from "../../icons/ShareIcon";
import BrainIcon from "../../icons/BrainIcon";

import { fadeUp } from "../../animations";

interface DashboardHeaderProps {
  onAdd: () => void;
  onShare: () => void;
}

export default function DashboardHeader({
  onAdd,
  onShare,
}: DashboardHeaderProps) {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="
        relative
        mb-9
        flex flex-col gap-5
        lg:flex-row
        lg:items-end
        lg:justify-between
      "
    >
      {/* Mobile Header */}
      <motion.div
        variants={fadeUp}
        className="
          flex items-center justify-between
          rounded-2xl border border-slate-200/80 bg-white/75 px-3 py-2 shadow-sm shadow-slate-900/[0.02] backdrop-blur
          md:hidden
        "
      >
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2"
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="
              flex h-10 w-10
              items-center justify-center
            "
          >
            <BrainIcon />
          </motion.div>

          <span
            className="
              text-xl
              font-bold
              tracking-tight
              text-slate-800
              dark:text-white
            "
          >
            SecondBrain
          </span>
        </motion.div>

        {/* Add */}
        <motion.button
          type="button"
          onClick={onAdd}
          aria-label="Add content"
          whileHover={{
            scale: 1.05,
            y: -1,
          }}
          whileTap={{
            scale: 0.94,
          }}
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            bg-indigo-600
            text-white
            shadow-sm
            shadow-indigo-500/20
            transition-colors

            hover:bg-indigo-500
          "
        >
          <PlusIcon />
        </motion.button>
      </motion.div>

      {/* Heading */}
      <motion.div variants={fadeUp}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">Your personal library</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          Your Second Brain
        </h1>

        <p
          className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base dark:text-slate-400"
        >
          Organize videos, tweets, websites, and resources in one place.
        </p>
      </motion.div>

      {/* Desktop Actions */}
      <motion.div
        variants={fadeUp}
        className="flex flex-wrap items-center gap-3 max-md:hidden"
      >
        <motion.div
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

        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            onClick={onShare}
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          />
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
