import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface SidebarItemsProps {
  text: string;
  icon: ReactNode;
  active?: boolean;
  collapsed: boolean;
  onClick?: () => void;
}

export default function SidebarItems({
  text,
  icon,
  active = false,
  collapsed,
  onClick,
}: SidebarItemsProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      title={collapsed ? text : undefined}
      aria-current={active ? "page" : undefined}
      whileHover={{ x: collapsed ? 0 : 2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`
        group
        relative
        flex
        w-full
        items-center
        rounded-xl
        outline-none
        transition-colors
        duration-200

        ${
          collapsed
            ? "justify-center px-2 py-2.5"
            : "justify-start gap-3 px-3 py-2.5"
        }

        ${
          active
            ? `
              bg-slate-100
              text-slate-900

              dark:bg-slate-800
              dark:text-white
            `
            : `
              text-slate-500
              hover:bg-slate-50
              hover:text-slate-900

              dark:text-slate-400
              dark:hover:bg-slate-800/60
              dark:hover:text-slate-100
            `
        }

        focus-visible:ring-2
        focus-visible:ring-slate-400/40
      `}
    >
      {/* Active indicator */}

      {active && (
        <motion.span
          layoutId="sidebar-active"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 35,
          }}
          className="
            absolute
            left-0
            top-1/2
            h-5
            w-[3px]
            -translate-y-1/2
            rounded-r-full
            bg-slate-900

            dark:bg-white
          "
        />
      )}

      {/* Icon */}

      <motion.span
        animate={{
          scale: active ? 1 : 0.98,
        }}
        whileHover={{
          scale: 1.06,
        }}
        transition={{
          duration: 0.15,
        }}
        className={`
          flex
          shrink-0
          items-center
          justify-center
          rounded-lg

          ${
            collapsed
              ? "h-10 w-10"
              : "h-9 w-9"
          }

          ${
            active
              ? `
                bg-white
                text-slate-900
                shadow-sm

                dark:bg-slate-700
                dark:text-white
              `
              : `
                text-slate-500

                group-hover:bg-slate-100
                group-hover:text-slate-800

                dark:text-slate-400
                dark:group-hover:bg-slate-700
                dark:group-hover:text-slate-100
              `
          }
        `}
      >
        <span className="text-[17px]">
          {icon}
        </span>
      </motion.span>

      {/* Text */}

      {!collapsed && (
        <motion.span
          initial={{
            opacity: 0,
            x: -4,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.15,
          }}
          className="
            min-w-0
            truncate
            text-sm
            font-medium
          "
        >
          {text}
        </motion.span>
      )}
    </motion.button>
  );
}