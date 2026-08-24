import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiLink, FiTag, FiType, FiX } from "react-icons/fi";

import { Backend_URL } from "../config";
import { Button } from "./Button";
import Input from "./Input";

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
  refresh?: () => void;
}

const isValidUrl = (url: string) => {
  try {
    const parsed = new URL(url);

    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};

export default function CreateContentModel({
  open,
  onClose,
  refresh,
}: CreateContentModelProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  /* --------------------------------
     Escape key
  -------------------------------- */
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, loading, onClose]);

  /* --------------------------------
     Reset form
  -------------------------------- */
  const resetForm = () => {
    if (titleRef.current) {
      titleRef.current.value = "";
    }

    if (linkRef.current) {
      linkRef.current.value = "";
    }

    setTags("");
  };

  /* --------------------------------
     Close modal
  -------------------------------- */
  const handleClose = () => {
    if (loading) return;

    resetForm();
    onClose();
  };

  /* --------------------------------
     Submit
  -------------------------------- */
  const handleAddContent = async () => {
    const title = titleRef.current?.value.trim() || "";
    const link = linkRef.current?.value.trim() || "";

    /* Validation */
    if (!title) {
      toast.error("Please enter a title");
      titleRef.current?.focus();
      return;
    }

    if (title.length < 3) {
      toast.error("Title must be at least 3 characters");
      titleRef.current?.focus();
      return;
    }

    if (!link) {
      toast.error("Please enter a link");
      linkRef.current?.focus();
      return;
    }

    if (!isValidUrl(link)) {
      toast.error("Please enter a valid URL");
      linkRef.current?.focus();
      return;
    }

    const formattedTags = [
      ...new Set(
        tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      ),
    ];

    try {
      setLoading(true);

      await axios.post(
        `${Backend_URL}/api/v1/content`,
        {
          title,
          link,
          tags: formattedTags,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Content added successfully");

      resetForm();

      refresh?.();
      onClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to add content";

        toast.error(message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-slate-950/70
        p-4
        backdrop-blur-md
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-content-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        disabled={loading}
        onClick={handleClose}
        className="absolute inset-0 cursor-default"
      />

      {/* Modal */}
      <div
        className="
          relative z-10
          w-full max-w-xl
          overflow-hidden
          rounded-[28px]
          border border-slate-200/80
          bg-white
          shadow-[0_30px_100px_rgba(0,0,0,0.35)]

          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        {/* --------------------------------
            Header
        -------------------------------- */}
        <div
          className="
            flex items-start justify-between
            border-b border-slate-200
            px-5 py-5
            sm:px-7 sm:py-6

            dark:border-slate-800
          "
        >
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div
              className="
                flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-indigo-500
                to-purple-600
                text-white
                shadow-lg
                shadow-indigo-500/20
              "
            >
              <FiLink size={21} />
            </div>

            <div>
              <h2
                id="create-content-title"
                className="
                  text-xl font-bold tracking-tight
                  text-slate-900
                  sm:text-2xl
                  dark:text-white
                "
              >
                Add Content
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Save something useful to your second brain.
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            aria-label="Close"
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-xl
              text-slate-400
              transition

              hover:bg-slate-100
              hover:text-slate-700

              disabled:cursor-not-allowed
              disabled:opacity-40

              dark:hover:bg-slate-800
              dark:hover:text-white
            "
          >
            <FiX size={20} />
          </button>
        </div>

        {/* --------------------------------
            Form
        -------------------------------- */}
        <div className="space-y-5 px-5 py-6 sm:px-7 sm:py-7">
          {/* Title */}
          <div>
            <label
              htmlFor="content-title"
              className="
                mb-2 flex items-center gap-2
                text-sm font-semibold
                text-slate-700
                dark:text-slate-200
              "
            >
              <FiType size={15} />
              Title
            </label>

            <Input
              ref={titleRef}
              placeholder="e.g. React performance optimization"
            />
          </div>

          {/* Link */}
          <div>
            <label
              htmlFor="content-link"
              className="
                mb-2 flex items-center gap-2
                text-sm font-semibold
                text-slate-700
                dark:text-slate-200
              "
            >
              <FiLink size={15} />
              Link
            </label>

            <Input
              ref={linkRef}
              placeholder="https://youtube.com/watch?v=..."
            />

            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
              Paste a YouTube, X/Twitter, or website URL.
            </p>
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="content-tags"
              className="
                mb-2 flex items-center gap-2
                text-sm font-semibold
                text-slate-700
                dark:text-slate-200
              "
            >
              <FiTag size={15} />
              Tags
              <span className="font-normal text-slate-400">
                (optional)
              </span>
            </label>

            <input
              id="content-tags"
              type="text"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="react, frontend, hooks"
              disabled={loading}
              className="
                w-full
                rounded-2xl
                border border-slate-200
                bg-slate-50
                px-4 py-3
                text-sm
                text-slate-900
                outline-none
                transition

                placeholder:text-slate-400

                hover:border-slate-300
                focus:border-indigo-500
                focus:bg-white
                focus:ring-4
                focus:ring-indigo-500/10

                disabled:cursor-not-allowed
                disabled:opacity-60

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
                dark:placeholder:text-slate-500
                dark:hover:border-slate-600
                dark:focus:border-indigo-500
                dark:focus:bg-slate-800
              "
            />

            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
              Separate multiple tags with commas.
            </p>
          </div>
        </div>

        {/* --------------------------------
            Footer
        -------------------------------- */}
        <div
          className="
            flex flex-col-reverse gap-3
            border-t border-slate-200
            bg-slate-50/70
            px-5 py-4

            sm:flex-row sm:justify-end
            sm:px-7

            dark:border-slate-800
            dark:bg-slate-900/70
          "
        >
          <Button
            onClick={handleClose}
            variant="secondary"
            text="Cancel"
          />

          <Button
            onClick={handleAddContent}
            variant="primary"
            text={loading ? "Adding..." : "Add Content"}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}