import { motion } from "framer-motion";
import { FiGlobe, FiLayers, FiYoutube } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

import {
  cardFadeUp,
  staggerContainer,
} from "../../animations";

interface DashboardStatsProps {
  total: number;
  youtubeCount: number;
  twitterCount: number;
  websiteCount: number;
  onSelect: (type: string) => void;
}

interface Stat {
  title: string;
  value: number;
  icon: React.ReactNode;
  type: string;
}

export default function DashboardStats({
  total,
  youtubeCount,
  twitterCount,
  websiteCount,
  onSelect,
}: DashboardStatsProps) {
  const stats: Stat[] = [
    {
      title: "Total Content",
      value: total,
      icon: <FiLayers />,
      type: "All",
    },
    {
      title: "YouTube",
      value: youtubeCount,
      icon: <FiYoutube />,
      type: "Youtube",
    },
    {
      title: "Twitter / X",
      value: twitterCount,
      icon: <FaXTwitter />,
      type: "Twitter",
    },
    {
      title: "Websites",
      value: websiteCount,
      icon: <FiGlobe />,
      type: "Website",
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
    >
      {stats.map((stat) => (
        <motion.button
          key={stat.type}
          type="button"
          variants={cardFadeUp}
          onClick={() => onSelect(stat.type)}
          whileHover={{
            y: -4,
            transition: {
              duration: 0.2,
              ease: "easeOut",
            },
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            text-left
            shadow-sm
            outline-none
            transition-colors
            duration-300

            hover:border-indigo-300
            hover:shadow-lg
            hover:shadow-indigo-500/10

            focus-visible:ring-2
            focus-visible:ring-indigo-500
            focus-visible:ring-offset-2

            dark:border-slate-700
            dark:bg-slate-800
            dark:hover:border-indigo-500/50
            dark:focus-visible:ring-offset-slate-900

            md:rounded-3xl
            md:p-5
          "
        >
          {/* Background glow */}
          <div
            className="
              pointer-events-none
              absolute
              -right-10
              -top-10
              h-28
              w-28
              rounded-full
              bg-indigo-500/5
              blur-3xl
              transition-all
              duration-500
              group-hover:bg-indigo-500/10
            "
          />

          {/* Content */}
          <div className="relative flex items-center justify-between gap-3">
            {/* Text */}
            <div className="min-w-0">
              <p
                className="
                  hidden
                  truncate
                  text-sm
                  font-medium
                  text-slate-500
                  dark:text-slate-400
                  md:block
                "
              >
                {stat.title}
              </p>

              <p
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-slate-900
                  dark:text-white
                  md:mt-2
                  md:text-4xl
                "
              >
                {stat.value}
              </p>
            </div>

            {/* Icon */}
            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 2,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-slate-100
                text-lg
                text-slate-600
                transition-colors
                duration-300

                group-hover:border-indigo-200
                group-hover:bg-indigo-50
                group-hover:text-indigo-600

                dark:border-slate-600
                dark:bg-slate-700
                dark:text-slate-300

                dark:group-hover:border-indigo-500/40
                dark:group-hover:bg-indigo-500/10
                dark:group-hover:text-indigo-400

                md:h-12
                md:w-12
                md:rounded-2xl
                md:text-xl
              "
            >
              {stat.icon}
            </motion.div>
          </div>

          {/* Bottom indicator */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            style={{ originX: 0 }}
            className="
              absolute
              bottom-0
              left-0
              h-[2px]
              w-full
              bg-indigo-500
            "
          />
        </motion.button>
      ))}
    </motion.div>
  );
}