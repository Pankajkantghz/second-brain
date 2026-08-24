import { motion } from "framer-motion";

import { Button } from "../Button";
import PlusIcon from "../../icons/PlusIcon";
import ShareIcon from "../../icons/ShareIcon";
import BrainIcon from "../../icons/BrainIcon";

import { fadeUp } from "../../animations";

interface DashboardHeaderProps {
  onAdd: () => void;
  onShare: () => void;
  onMenu: () => void;
}

export default function DashboardHeader({
  onAdd,
  onShare,
  onMenu,
}: DashboardHeaderProps) {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="
        mb-8
        flex flex-col gap-5
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* Mobile Header */}
      <motion.div
        variants={fadeUp}
        className="
          flex items-center justify-between
          border-b border-slate-200
          pb-3
          dark:border-slate-800
          md:hidden
        "
      >
        {/* Menu */}
        <motion.button
          type="button"
          onClick={onMenu}
          aria-label="Open sidebar"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            border border-slate-200
            bg-white
            text-slate-600
            shadow-sm
            transition-colors

            hover:border-indigo-200
            hover:bg-indigo-50
            hover:text-indigo-600

            dark:border-slate-700
            dark:bg-slate-800
            dark:text-slate-300

            dark:hover:border-indigo-500/40
            dark:hover:bg-indigo-500/10
            dark:hover:text-indigo-400
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </motion.button>

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
        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
            text-slate-800
            sm:text-4xl
            dark:text-white
          "
        >
          Your Second Brain
        </h1>

        <p
          className="
            mt-2
            max-w-2xl
            text-slate-500
            dark:text-slate-300
          "
        >
          Organize videos, tweets, websites, and resources in one place.
        </p>
      </motion.div>

      {/* Desktop Actions */}
      <motion.div
        variants={fadeUp}
        className="flex flex-wrap items-center gap-3"
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