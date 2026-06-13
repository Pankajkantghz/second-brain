import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import MoreVerticalIcon from "../icons/MoreVerticalIcon";

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

  /* Close menu outside click */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* Twitter Script */
  useEffect(() => {
    if (type?.toLowerCase() === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [type, link]);

  /* Youtube Embed */
  const getYoutubeEmbedUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname === "youtu.be") {
        const videoId = parsed.pathname.slice(1);
        return `https://www.youtube.com/embed/${videoId}`;
      }
      const videoId = parsed.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } catch {
      return "";
    }
  };

  const embedUrl =
    type?.toLowerCase() === "youtube" ? getYoutubeEmbedUrl(link) : "";

  /* Share */
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied");
    } catch {
      toast.error("Failed to copy");
    }
    setMenuOpen(false);
  };

  return (
    /* FIX: Added dynamic z-index (`menuOpen ? "z-40" : "z-10"`) to the card root. 
      When the menu is open, this specific card jumps above all other elements and cards on the page.
    */
    <div 
      className={`group relative overflow-visible rounded-[32px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        menuOpen ? "z-40" : "z-10"
      }`}
    >
      {/* Youtube */}
      {type?.toLowerCase() === "youtube" && (
        <div className="overflow-hidden rounded-t-[32px] bg-black">
          <iframe
            className="h-[230px] w-full"
            src={embedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              pointerEvents: menuOpen ? "none" : "auto",
            }}
          />
        </div>
      )}

      {/* Twitter */}
      {type?.toLowerCase() === "twitter" && (
        <div className="overflow-hidden rounded-t-[32px] bg-slate-50 p-5">
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")} />
          </blockquote>
        </div>
      )}

      {/* Website */}
      {type?.toLowerCase() === "website" && (
        <div className="flex h-[230px] flex-col justify-between rounded-t-[32px] bg-gradient-to-br from-slate-50 to-slate-100 p-6">
          <div>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-2xl text-white">
              🌐
            </div>
            <h3 className="line-clamp-1 text-lg font-semibold text-slate-800">
              {title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-slate-500">{link}</p>
          </div>
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Open Website →
          </a>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-start justify-between px-6 py-5">
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg font-semibold text-slate-800">
            {title}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {type}
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div ref={menuRef} className="relative shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-2xl p-3 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <MoreVerticalIcon />
          </button>

          {menuOpen && (
            /* FIX: Increased z-index to `z-[100]` to explicitly layer above everything */
            <div className="absolute right-0 top-14 z-[100] min-w-[220px] overflow-hidden rounded-2xl border border-slate-200 bg-white py-2 shadow-[0_25px_60px_rgba(0,0,0,0.25)]">
              <button
                onClick={handleShare}
                className="w-full px-5 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Share Link
              </button>

              <button
                onClick={() => {
                  onEdit?.();
                  setMenuOpen(false);
                }}
                className="w-full px-5 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Edit Content
              </button>

              <button
                onClick={() => {
                  onDelete?.();
                  setMenuOpen(false);
                }}
                className="w-full px-5 py-3 text-left text-sm font-medium text-red-500 hover:bg-red-50"
              >
                Delete Content
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}