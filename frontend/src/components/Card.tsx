import { useState } from "react";
import { toast } from "react-toastify";
import MoreVerticalIcon from "../icons/MoreVerticalIcon";

interface CardProps {
  title: string;
  link: string;
  type: "Twitter" | "Youtube";
  onDelete?: () => void;
  onEdit?: () => void;
}

export default function Card({
  title,
  link,
  type,
  onDelete,
  onEdit,
}: CardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const getYoutubeEmbedUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);

      // youtu.be format
      if (parsedUrl.hostname === "youtu.be") {
        const videoId = parsedUrl.pathname.slice(1);

        return `https://www.youtube.com/embed/${videoId}`;
      }

      // youtube.com/watch?v=
      const videoId = parsedUrl.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      return url;
    } catch {
      return url;
    }
  };

  const embedUrl = type === "Youtube" ? getYoutubeEmbedUrl(link) : "";

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
    <div className="group relative w-full max-w-[420px] overflow-visible rounded-[32px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Youtube */}
      {type === "Youtube" && (
        <div className="overflow-hidden rounded-t-[32px] bg-black">
          <iframe
            className="h-[250px] w-full"
            src={embedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}

      {/* Twitter */}
      {type === "Twitter" && (
        <div className="overflow-hidden rounded-t-[32px] bg-slate-50 p-5">
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")} />
          </blockquote>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-start justify-between px-6 py-5">
        {/* Content */}
        <div className="min-w-0">
          <h2 className="truncate text-xl font-semibold text-slate-800">
            {title}
          </h2>

          <div className="mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-500">
            {type}
          </div>
        </div>

        {/* Menu */}
        <div className="relative shrink-0">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-2xl p-3 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <MoreVerticalIcon />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 top-14 z-[9999] min-w-[190px] overflow-hidden rounded-3xl border border-slate-200 bg-white py-2 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
              <button
                onClick={handleShare}
                className="w-full px-5 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Share Link
              </button>

              <button
                onClick={() => {
                  onEdit?.();
                  setMenuOpen(false);
                }}
                className="w-full px-5 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Edit Content
              </button>

              <button
                onClick={() => {
                  onDelete?.();
                  setMenuOpen(false);
                }}
                className="w-full px-5 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
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
