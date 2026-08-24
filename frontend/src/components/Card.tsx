import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

import {
  FiGlobe,
  FiExternalLink,
  FiShare2,
  FiEdit2,
  FiTrash2,
  FiMoreVertical,
  FiTag,
} from "react-icons/fi";

import { FaXTwitter } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";

import { fadeUp } from "../animations";

interface CardProps {
  title: string;
  link: string;
  type: "Twitter" | "Youtube" | "Website" | string;
  tags?: string[];
  onDelete?: () => void;
  onEdit?: () => void;
}

export default function Card({
  title,
  link,
  type,
  tags = [],
  onDelete,
  onEdit,
}: CardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const normalizedType = type?.toLowerCase();

  /* --------------------------------
     Close menu when clicking outside
  -------------------------------- */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* --------------------------------
     Escape menu
  -------------------------------- */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* --------------------------------
     Twitter script
  -------------------------------- */
  useEffect(() => {
    if (normalizedType !== "twitter") return;

    const existingScript = document.querySelector(
      'script[src="https://platform.twitter.com/widgets.js"]',
    );

    if (!existingScript) {
      const script = document.createElement("script");

      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;

      document.body.appendChild(script);
    } else if ((window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
  }, [normalizedType, link]);

  /* --------------------------------
     YouTube URL
  -------------------------------- */
  const getYoutubeEmbedUrl = (url: string) => {
    try {
      const parsed = new URL(url);

      let videoId = "";

      if (parsed.hostname === "youtu.be") {
        videoId = parsed.pathname.slice(1);
      }

      if (
        parsed.hostname.includes("youtube.com") &&
        parsed.searchParams.get("v")
      ) {
        videoId = parsed.searchParams.get("v") || "";
      }

      if (parsed.pathname.includes("/shorts/")) {
        videoId = parsed.pathname.split("/shorts/")[1];
      }

      if (parsed.pathname.includes("/embed/")) {
        videoId = parsed.pathname.split("/embed/")[1];
      }

      return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : "";
    } catch {
      return "";
    }
  };

  const embedUrl =
    normalizedType === "youtube"
      ? getYoutubeEmbedUrl(link)
      : "";

  /* --------------------------------
     Share
  -------------------------------- */
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url: link,
        });
      } else {
        await navigator.clipboard.writeText(link);

        toast.success("Link copied");
      }
    } catch (error: any) {
      if (error?.name !== "AbortError") {
        try {
          await navigator.clipboard.writeText(link);

          toast.success("Link copied");
        } catch {
          toast.error("Failed to share");
        }
      }
    }

    setMenuOpen(false);
  };

  /* --------------------------------
     Type icon
  -------------------------------- */
  const getTypeIcon = () => {
    switch (normalizedType) {
      case "youtube":
        return <FiYoutube />;

      case "twitter":
        return <FaXTwitter />;

      case "website":
        return <FiGlobe />;

      default:
        return <FiGlobe />;
    }
  };

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -5,
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      }}
      className={`
        group
        relative
        overflow-visible
        rounded-[26px]

        border
        border-slate-200
        bg-white
        shadow-sm

        transition-shadow
        duration-300

        hover:border-indigo-300
        hover:shadow-xl
        hover:shadow-indigo-500/10

        dark:border-slate-700
        dark:bg-slate-800
        dark:hover:border-indigo-500/50

        ${menuOpen ? "z-50" : "z-10"}
      `}
    >
      {/* =====================================
          PREVIEW
      ===================================== */}

      {/* YouTube */}
      {normalizedType === "youtube" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="
            relative
            overflow-hidden
            rounded-t-[26px]
            bg-black
          "
        >
          {embedUrl ? (
            <iframe
              className="
                aspect-video
                w-full
                border-0
              "
              src={embedUrl}
              title={title}
              allow="
                accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture;
                web-share
              "
              allowFullScreen
              style={{
                pointerEvents: menuOpen ? "none" : "auto",
              }}
            />
          ) : (
            <PreviewFallback
              icon={<FiYoutube />}
              label="YouTube"
            />
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>
      )}

      {/* Twitter */}
      {normalizedType === "twitter" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="
            h-[260px]
            overflow-hidden
            rounded-t-[26px]
            bg-slate-100

            dark:bg-slate-900
          "
        >
          <div className="h-full overflow-y-auto px-4 py-4">
            <blockquote className="twitter-tweet !m-0">
              <a href={link.replace("x.com", "twitter.com")} />
            </blockquote>
          </div>
        </motion.div>
      )}

      {/* Website */}
      {normalizedType === "website" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className="
            relative
            flex
            h-[230px]
            flex-col
            justify-between
            overflow-hidden
            rounded-t-[26px]
            bg-slate-50
            p-6

            dark:bg-gradient-to-br
            dark:from-slate-700
            dark:via-slate-800
            dark:to-slate-900
          "
        >
          {/* Glow */}
          <div
            className="
              pointer-events-none
              absolute
              -right-10
              -top-10
              h-32
              w-32
              rounded-full
              bg-indigo-500/10
              blur-3xl
            "
          />

          <div className="relative">
            {/* Icon */}
            <motion.div
              whileHover={{
                scale: 1.06,
                rotate: 2,
              }}
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-slate-200
                bg-white
                text-2xl
                text-indigo-600
                shadow-sm

                dark:border-slate-600
                dark:bg-slate-700/80
                dark:text-indigo-400
              "
            >
              <FiGlobe />
            </motion.div>

            <h3
              className="
                mt-5
                line-clamp-1
                text-lg
                font-semibold
                text-slate-800

                dark:text-white
              "
            >
              {title}
            </h3>

            <p
              className="
                mt-2
                line-clamp-2
                break-all
                text-sm
                leading-relaxed
                text-slate-500

                dark:text-slate-400
              "
            >
              {link}
            </p>
          </div>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              relative
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-xl
              bg-indigo-600
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
              transition

              hover:bg-indigo-500
            "
          >
            Open Website
            <FiExternalLink size={15} />
          </a>
        </motion.div>
      )}

      {/* Unknown */}
      {!["youtube", "twitter", "website"].includes(
        normalizedType,
      ) && (
        <PreviewFallback
          icon={getTypeIcon()}
          label={type}
        />
      )}

      {/* =====================================
          CONTENT
      ===================================== */}

      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          {/* Main */}
          <div className="min-w-0 flex-1">
            {/* Type */}
            <motion.div
              variants={fadeUp}
              className="mb-2 flex items-center gap-2"
            >
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-slate-200
                  bg-slate-100
                  px-2.5
                  py-1
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-wide
                  text-slate-500

                  dark:border-slate-700
                  dark:bg-slate-900/70
                  dark:text-slate-400
                "
              >
                {getTypeIcon()}
                {type}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={fadeUp}
              className="
                line-clamp-2
                text-lg
                font-semibold
                leading-snug
                text-slate-800
                transition-colors

                group-hover:text-indigo-600

                dark:text-white
                dark:group-hover:text-indigo-300
              "
            >
              {title}
            </motion.h2>

            {/* Tags */}
            {tags.length > 0 && (
              <motion.div
                variants={fadeUp}
                className="mt-4 flex flex-wrap gap-1.5"
              >
                {tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="
                      inline-flex
                      items-center
                      gap-1
                      rounded-lg
                      bg-indigo-50
                      px-2.5
                      py-1
                      text-xs
                      font-medium
                      text-indigo-600

                      dark:bg-indigo-500/10
                      dark:text-indigo-300
                    "
                  >
                    <FiTag size={11} />
                    {tag}
                  </span>
                ))}

                {tags.length > 4 && (
                  <span
                    className="
                      rounded-lg
                      bg-slate-100
                      px-2.5
                      py-1
                      text-xs
                      font-medium
                      text-slate-500

                      dark:bg-slate-700
                      dark:text-slate-400
                    "
                  >
                    +{tags.length - 4}
                  </span>
                )}
              </motion.div>
            )}
          </div>

          {/* =====================================
              MENU
          ===================================== */}

          <div
            ref={menuRef}
            className="relative shrink-0"
          >
            <motion.button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Content options"
              aria-expanded={menuOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-transparent
                text-slate-400
                transition-colors

                hover:border-slate-200
                hover:bg-slate-100
                hover:text-slate-700

                dark:hover:border-slate-700
                dark:hover:bg-slate-700
                dark:hover:text-white

                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500/40
              "
            >
              <FiMoreVertical size={20} />
            </motion.button>

            {/* Dropdown */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                    y: -6,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    y: -6,
                  }}
                  transition={{
                    duration: 0.15,
                    ease: "easeOut",
                  }}
                  className="
                    absolute
                    right-0
                    top-12
                    z-[100]
                    w-52
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-1.5
                    shadow-xl
                    shadow-slate-900/10

                    dark:border-slate-700
                    dark:bg-slate-800
                    dark:shadow-black/40
                  "
                >
                  {/* Share */}
                  <MenuButton
                    icon={<FiShare2 size={15} />}
                    text="Share Link"
                    onClick={handleShare}
                  />

                  {/* Edit */}
                  <MenuButton
                    icon={<FiEdit2 size={15} />}
                    text="Edit Content"
                    onClick={() => {
                      onEdit?.();
                      setMenuOpen(false);
                    }}
                  />

                  <div className="my-1.5 h-px bg-slate-200 dark:bg-slate-700" />

                  {/* Delete */}
                  <MenuButton
                    danger
                    icon={<FiTrash2 size={15} />}
                    text="Delete Content"
                    onClick={() => {
                      onDelete?.();
                      setMenuOpen(false);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="
          absolute
          bottom-0
          left-6
          right-6
          h-px
          origin-left
          bg-gradient-to-r
          from-indigo-500
          via-purple-500
          to-transparent
        "
      />
    </motion.article>
  );
}

/* =====================================
   MENU BUTTON
===================================== */

interface MenuButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  danger?: boolean;
}

function MenuButton({
  icon,
  text,
  onClick,
  danger = false,
}: MenuButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-3.5
        py-3
        text-left
        text-sm
        font-medium
        transition-colors

        ${
          danger
            ? `
              text-red-500
              hover:bg-red-50
              hover:text-red-600
              dark:text-red-400
              dark:hover:bg-red-500/10
              dark:hover:text-red-300
            `
            : `
              text-slate-600
              hover:bg-slate-100
              hover:text-slate-900
              dark:text-slate-300
              dark:hover:bg-slate-700
              dark:hover:text-white
            `
        }
      `}
    >
      <span
        className={`
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-lg

          ${
            danger
              ? "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400"
              : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300"
          }
        `}
      >
        {icon}
      </span>

      {text}
    </motion.button>
  );
}

/* =====================================
   PREVIEW FALLBACK
===================================== */

interface PreviewFallbackProps {
  icon: React.ReactNode;
  label: string;
}

function PreviewFallback({
  icon,
  label,
}: PreviewFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        flex
        h-[230px]
        flex-col
        items-center
        justify-center
        gap-4
        rounded-t-[26px]
        bg-slate-100

        dark:bg-gradient-to-br
        dark:from-slate-700
        dark:to-slate-900
      "
    >
      <motion.div
        whileHover={{
          scale: 1.08,
          rotate: 3,
        }}
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-white
          text-3xl
          text-slate-500
          shadow-sm

          dark:bg-slate-700
          dark:text-slate-300
        "
      >
        {icon}
      </motion.div>

      <span
        className="
          text-sm
          font-medium
          text-slate-500

          dark:text-slate-400
        "
      >
        {label}
      </span>
    </motion.div>
  );
}