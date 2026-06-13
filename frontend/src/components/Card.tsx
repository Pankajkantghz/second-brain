import { useState } from "react";
import { toast } from "react-toastify";
import MoreVerticalIcon from "../icons/MoreVerticalIcon";

interface CardProps {
  title: string;
  link: string;
  type: "Twitter" | "Youtube" | "Website";
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

  const getYoutubeEmbedUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname === "youtu.be") {
        const videoId = parsedUrl.pathname.slice(1);
        return `https://www.youtube.com/embed/${videoId}`;
      }
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
      toast.error("Failed to copy link");
    }
    setMenuOpen(false);
  };

  return (
    // Note: Increased hover z-index to 30 so the active card always stays on top of adjacent cards
    <div className="group relative z-10 w-full rounded-[32px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:z-30">
      {/* Youtube */}
      {type === "Youtube" && (
        <div className="overflow-hidden rounded-t-[32px] bg-black">
          <iframe
            className="h-[250px] w-full"
            src={embedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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

      {/* Website */}
      {type === "Website" && (
        <div className="flex h-[250px] flex-col justify-between bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-t-[32px]">
          <div>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-2xl text-white">
              🌐
            </div>
            <h3 className="line-clamp-1 text-xl font-semibold text-slate-800">
              {title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-slate-500">{link}</p>
          </div>
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Open Website →
          </a>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-start justify-between px-6 py-5">
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xl font-semibold text-slate-800">
            {title}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-500">
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

        {/* Menu Wrapper Container */}
        <div className="relative shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-2xl p-3 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <MoreVerticalIcon />
          </button>

          {menuOpen && (
            <>
              {/* Invisible full-screen backdrop to handle closing menu when clicking outside */}
              <div 
                className="fixed inset-0 z-[9999]" 
                onClick={() => setMenuOpen(false)} 
              />
              
              {/* Actual Dropdown Overlay Menu */}
              <div
                className="absolute right-0 mt-2 z-[10000] min-w-[220px] origin-top-right rounded-2xl border border-slate-200 bg-white py-2 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
              >
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}