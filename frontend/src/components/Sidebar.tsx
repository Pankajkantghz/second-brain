import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  FiChevronLeft,
  FiGlobe,
  FiLayers,
  FiLogIn,
  FiLogOut,
  FiMenu,
  FiTag,
  FiX,
  FiYoutube,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

import BrainIcon from "../icons/BrainIcon";

import SidebarItems from "./SidebarItems";
import ThemeToggle from "./ThemeToggle";

interface SidebarProps {
  tags: string[];

  selectedType: string;
  onTypeChange: (type: string) => void;

  selectedTag: string;
  onTagChange: (tag: string) => void;

  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  tags,
  selectedType,
  onTypeChange,
  selectedTag,
  onTagChange,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  /* -------------------------------------------------------
     LOGOUT
  ------------------------------------------------------- */

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged out");

    setMobileOpen(false);

    navigate("/signin");
  };

  /* -------------------------------------------------------
     LOGIN
  ------------------------------------------------------- */

  const handleLogin = () => {
    setMobileOpen(false);

    navigate("/signin");
  };

  /* -------------------------------------------------------
     SELECT TYPE
  ------------------------------------------------------- */

  const handleTypeChange = (type: string) => {
    onTypeChange(type);
    setMobileOpen(false);
  };

  /* -------------------------------------------------------
     SELECT TAG
  ------------------------------------------------------- */

  const handleTagChange = (tag: string) => {
    onTagChange(tag);
    setMobileOpen(false);
  };

  return (
    <>
      {/* =====================================================
          MOBILE HAMBURGER
      ====================================================== */}

      <AnimatePresence>
        {!mobileOpen && (
          <motion.button
            type="button"
            aria-label="Open sidebar"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileOpen(true)}
            className="
              fixed
              left-4
              top-4
              z-[60]
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-700
              shadow-lg
              shadow-slate-900/5

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-200

              md:hidden
            "
          >
            <FiMenu className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="
              fixed
              inset-0
              z-40
              bg-black/30
              backdrop-blur-[2px]

              md:hidden
            "
          />
        )}
      </AnimatePresence>

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <motion.aside
        initial={false}
        animate={{
          width: collapsed ? 88 : 288,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          flex-col

          border-r
          border-slate-200
          bg-white

          shadow-[4px_0_24px_rgba(0,0,0,0.04)]

          dark:border-slate-800
          dark:bg-slate-950

          /* Mobile */
          w-[min(86vw,320px)]
          -translate-x-full

          ${
            mobileOpen
              ? "translate-x-0"
              : ""
          }

          /* Desktop */
          md:translate-x-0
        `}
      >
        {/* ===================================================
            HEADER
        ==================================================== */}

        <div
          className="
            relative
            shrink-0
            border-b
            border-slate-100
            px-4
            py-4

            dark:border-slate-800
          "
        >
          <div
            className={`
              flex
              items-center

              ${
                collapsed
                  ? "justify-center"
                  : "gap-3"
              }
            `}
          >
            {/* Logo */}

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-slate-900
                text-white
                shadow-sm

                dark:bg-white
                dark:text-slate-900
              "
            >
              <BrainIcon />
            </motion.div>

            {/* Brand */}

            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div
                  initial={{
                    opacity: 0,
                    width: 0,
                    x: -8,
                  }}
                  animate={{
                    opacity: 1,
                    width: "auto",
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    width: 0,
                    x: -8,
                  }}
                  transition={{ duration: 0.2 }}
                  className="min-w-0 overflow-hidden"
                >
                  <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                    SecondBrain
                  </h1>

                  <p className="truncate text-[11px] text-slate-400 dark:text-slate-500">
                    Your second brain
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Close */}

            <motion.button
              type="button"
              aria-label="Close sidebar"
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(false)}
              className="
                ml-auto
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-slate-500
                hover:bg-slate-100
                hover:text-slate-900

                dark:text-slate-400
                dark:hover:bg-slate-800
                dark:hover:text-white

                md:hidden
              "
            >
              <FiX className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Desktop Collapse */}

          <motion.button
            type="button"
            aria-label={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            whileTap={{ scale: 0.9 }}
            onClick={onToggleCollapse}
            className="
              absolute
              -right-3
              top-1/2
              hidden
              h-7
              w-7
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-slate-500
              shadow-sm
              transition-colors

              hover:bg-slate-50
              hover:text-slate-900

              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-400
              dark:hover:bg-slate-800
              dark:hover:text-white

              md:flex
            "
          >
            <motion.div
              animate={{
                rotate: collapsed ? 180 : 0,
              }}
              transition={{ duration: 0.25 }}
            >
              <FiChevronLeft className="h-4 w-4" />
            </motion.div>
          </motion.button>
        </div>

        {/* ===================================================
            CONTENT
        ==================================================== */}

        <div className="flex-1 overflow-y-auto px-3 py-5">
          {/* Section title */}

          {!collapsed && (
            <div className="mb-3 flex items-center gap-2 px-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-600">
                Content
              </span>

              <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
            </div>
          )}

          {/* Content navigation */}

          <div className="space-y-1">
            <SidebarItems
              text="All"
              icon={<FiLayers />}
              collapsed={collapsed}
              active={selectedType === "All"}
              onClick={() => handleTypeChange("All")}
            />

            <SidebarItems
              text="Twitter / X"
              icon={<FaXTwitter />}
              collapsed={collapsed}
              active={selectedType === "Twitter"}
              onClick={() => handleTypeChange("Twitter")}
            />

            <SidebarItems
              text="YouTube"
              icon={<FiYoutube />}
              collapsed={collapsed}
              active={selectedType === "Youtube"}
              onClick={() => handleTypeChange("Youtube")}
            />

            <SidebarItems
              text="Website"
              icon={<FiGlobe />}
              collapsed={collapsed}
              active={selectedType === "Website"}
              onClick={() => handleTypeChange("Website")}
            />
          </div>

          {/* =================================================
              TAGS
          ================================================== */}

          {tags.length > 0 && (
            <div className="mt-7">
              {!collapsed && (
                <div className="mb-3 flex items-center gap-2 px-3">
                  <FiTag className="h-3 w-3 text-slate-400" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-600">
                    Tags
                  </span>

                  <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                </div>
              )}

              {/* All */}

              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => handleTagChange("")}
                title={collapsed ? "All tags" : undefined}
                className={`
                  mb-2
                  flex
                  items-center
                  justify-center
                  rounded-lg
                  text-xs
                  font-medium
                  transition-colors

                  ${
                    collapsed
                      ? "mx-auto h-9 w-9"
                      : "w-full px-3 py-2"
                  }

                  ${
                    selectedTag === ""
                      ? `
                        bg-slate-900
                        text-white

                        dark:bg-white
                        dark:text-slate-900
                      `
                      : `
                        bg-slate-100
                        text-slate-600
                        hover:bg-slate-200

                        dark:bg-slate-800
                        dark:text-slate-300
                        dark:hover:bg-slate-700
                      `
                  }
                `}
              >
                {collapsed ? (
                  <FiTag className="h-4 w-4" />
                ) : (
                  "All Tags"
                )}
              </motion.button>

              {!collapsed && (
                <div className="flex flex-wrap gap-1.5 px-1">
                  {tags.map((tag) => (
                    <motion.button
                      key={tag}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTagChange(tag)}
                      className={`
                        rounded-lg
                        px-2.5
                        py-1.5
                        text-[11px]
                        font-medium
                        transition-colors

                        ${
                          selectedTag === tag
                            ? `
                              bg-slate-900
                              text-white

                              dark:bg-white
                              dark:text-slate-900
                            `
                            : `
                              bg-slate-100
                              text-slate-500
                              hover:bg-slate-200
                              hover:text-slate-800

                              dark:bg-slate-800
                              dark:text-slate-400
                              dark:hover:bg-slate-700
                              dark:hover:text-slate-200
                            `
                        }
                      `}
                    >
                      #{tag}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ===================================================
            FOOTER
        ==================================================== */}

        <div
          className="
            shrink-0
            border-t
            border-slate-100
            p-3

            dark:border-slate-800
          "
        >
          {/* Appearance */}

          <div
            className={`
              mb-2
              flex
              items-center

              ${
                collapsed
                  ? "justify-center"
                  : "justify-between px-2"
              }
            `}
            title="Appearance"
          >
            {!collapsed && (
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                Appearance
              </span>
            )}

            <ThemeToggle />
          </div>

          {/* Login / Logout */}

          {isLoggedIn ? (
            <motion.button
              type="button"
              whileHover={{
                y: -1,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={handleLogout}
              title={collapsed ? "Logout" : undefined}
              className={`
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-slate-900
                text-white
                transition-colors

                hover:bg-slate-800

                dark:bg-white
                dark:text-slate-900
                dark:hover:bg-slate-200

                ${
                  collapsed
                    ? "mx-auto h-11 w-11"
                    : "w-full px-4 py-2.5"
                }
              `}
            >
              <FiLogOut className="h-4 w-4" />

              {!collapsed && (
                <span className="text-sm font-medium">
                  Logout
                </span>
              )}
            </motion.button>
          ) : (
            <motion.button
              type="button"
              whileHover={{
                y: -1,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={handleLogin}
              title={collapsed ? "Login" : undefined}
              className={`
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-slate-900
                text-white
                transition-colors

                hover:bg-slate-800

                dark:bg-white
                dark:text-slate-900
                dark:hover:bg-slate-200

                ${
                  collapsed
                    ? "mx-auto h-11 w-11"
                    : "w-full px-4 py-2.5"
                }
              `}
            >
              <FiLogIn className="h-4 w-4" />

              {!collapsed && (
                <span className="text-sm font-medium">
                  Login
                </span>
              )}
            </motion.button>
          )}
        </div>
      </motion.aside>
    </>
  );
}