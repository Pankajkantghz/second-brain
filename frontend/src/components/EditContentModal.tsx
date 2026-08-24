import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiLink, FiPlus, FiTag, FiType, FiX } from "react-icons/fi";

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
  const tagRef = useRef<HTMLInputElement>(null);

  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  /*
   * Escape key
   */
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

  /*
   * Reset form
   */
  const resetForm = () => {
    if (titleRef.current) {
      titleRef.current.value = "";
    }

    if (linkRef.current) {
      linkRef.current.value = "";
    }

    if (tagRef.current) {
      tagRef.current.value = "";
    }

    setTags([]);
  };

  /*
   * Close
   */
  const handleClose = () => {
    if (loading) return;

    resetForm();
    onClose();
  };

  /*
   * Add tag
   */
  const handleAddTag = () => {
    const value = tagRef.current?.value.trim() || "";

    if (!value) return;

    /*
     * Remove # if user types it
     */
    const cleanTag = value.replace(/^#/, "").trim();

    if (!cleanTag) return;

    /*
     * Case-insensitive duplicate check
     */
    const exists = tags.some(
      (tag) => tag.toLowerCase() === cleanTag.toLowerCase(),
    );

    if (exists) {
      toast.error("Tag already exists");

      tagRef.current?.focus();

      return;
    }

    setTags((prev) => [...prev, cleanTag]);

    if (tagRef.current) {
      tagRef.current.value = "";
      tagRef.current.focus();
    }
  };

  /*
   * Remove tag
   */
  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) =>
      prev.filter((tag) => tag !== tagToRemove),
    );
  };

  /*
   * Edit tag
   */
  const handleEditTag = (tag: string) => {
    if (!tagRef.current) return;

    tagRef.current.value = tag;

    setTags((prev) =>
      prev.filter((currentTag) => currentTag !== tag),
    );

    tagRef.current.focus();
  };

  /*
   * Enter key
   */
  const handleTagKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      handleAddTag();
    }
  };

  /*
   * Submit
   */
  const handleAddContent = async () => {
    const title = titleRef.current?.value.trim() || "";
    const link = linkRef.current?.value.trim() || "";

    /*
     * Validation
     */
    if (!title) {
      toast.error("Title is required");
      titleRef.current?.focus();

      return;
    }

    if (title.length < 3) {
      toast.error("Title must be at least 3 characters");
      titleRef.current?.focus();

      return;
    }

    if (!link) {
      toast.error("Link is required");
      linkRef.current?.focus();

      return;
    }

    if (!isValidUrl(link)) {
      toast.error("Please enter a valid URL");
      linkRef.current?.focus();

      return;
    }

    /*
     * If user typed a tag but didn't press Add,
     * automatically add it.
     */
    const pendingTag = tagRef.current?.value.trim() || "";

    let finalTags = [...tags];

    if (pendingTag) {
      const cleanTag = pendingTag.replace(/^#/, "").trim();

      if (cleanTag) {
        const exists = finalTags.some(
          (tag) =>
            tag.toLowerCase() === cleanTag.toLowerCase(),
        );

        if (!exists) {
          finalTags.push(cleanTag);
        }
      }
    }

    try {
      setLoading(true);

      await axios.post(
        `${Backend_URL}/api/v1/content`,
        {
          title,
          link,
          tags: finalTags,
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
          error.response?.data?.message ||
          "Failed to add content";

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
        p-3
        backdrop-blur-md
        sm:p-4
      "
      role="dialog"
      aria-modal="true"
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
          flex max-h-[92vh]
          w-full max-w-xl
          flex-col
          overflow-hidden
          rounded-[26px]
          border border-slate-200
          bg-white
          shadow-[0_30px_100px_rgba(0,0,0,0.35)]

          dark:border-slate-700
          dark:bg-slate-900

          sm:rounded-[30px]
        "
      >
        {/* ================= HEADER ================= */}
        <div
          className="
            flex shrink-0
            items-center justify-between
            border-b border-slate-200
            px-5 py-4
            sm:px-7 sm:py-5

            dark:border-slate-800
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            {/* Logo */}
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

            <div className="min-w-0">
              <h2
                className="
                  truncate
                  text-xl
                  font-bold
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                Add Content
              </h2>

              <p className="mt-0.5 truncate text-xs text-slate-500 sm:text-sm dark:text-slate-400">
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

        {/* ================= BODY ================= */}
        <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label
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
                YouTube, X/Twitter, or any website URL.
              </p>
            </div>

            {/* ================= TAGS ================= */}
            <div>
              <label
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
                  optional
                </span>
              </label>

              {/* Tag input */}
              <div className="flex gap-2">
                <div className="min-w-0 flex-1">
                  <input
                    ref={tagRef}
                    type="text"
                    placeholder="e.g. react"
                    disabled={loading}
                    onKeyDown={handleTagKeyDown}
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
                      dark:focus:border-indigo-500
                    "
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddTag}
                  disabled={loading}
                  className="
                    flex shrink-0
                    items-center justify-center
                    gap-1.5
                    rounded-2xl
                    bg-slate-900
                    px-4
                    text-sm
                    font-semibold
                    text-white
                    transition

                    hover:bg-indigo-600
                    active:scale-95

                    disabled:cursor-not-allowed
                    disabled:opacity-50

                    dark:bg-white
                    dark:text-slate-900
                    dark:hover:bg-slate-200
                  "
                >
                  <FiPlus size={16} />
                  <span>Add</span>
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                Press Enter or click Add to create a tag.
              </p>

              {/* ================= TAG CHIPS ================= */}
              {tags.length > 0 && (
                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    gap-2
                    rounded-2xl
                    border border-slate-200
                    bg-slate-50
                    p-3

                    dark:border-slate-700
                    dark:bg-slate-800/60
                  "
                >
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="
                        group/tag
                        flex max-w-full
                        items-center gap-1
                        rounded-full
                        border border-indigo-100
                        bg-indigo-50
                        pl-3 pr-1.5 py-1.5
                        text-sm
                        font-medium
                        text-indigo-700
                        transition

                        hover:border-indigo-200
                        hover:bg-indigo-100

                        dark:border-indigo-900/50
                        dark:bg-indigo-900/30
                        dark:text-indigo-300
                        dark:hover:bg-indigo-900/50
                      "
                    >
                      {/* Edit tag */}
                      <button
                        type="button"
                        onClick={() => handleEditTag(tag)}
                        disabled={loading}
                        className="
                          max-w-[180px]
                          truncate
                          text-left
                          outline-none
                          hover:underline
                          disabled:cursor-not-allowed
                        "
                        title="Edit tag"
                      >
                        #{tag}
                      </button>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveTag(tag)
                        }
                        disabled={loading}
                        aria-label={`Remove ${tag}`}
                        className="
                          flex h-5 w-5
                          shrink-0
                          items-center justify-center
                          rounded-full
                          text-indigo-400
                          transition

                          hover:bg-indigo-200
                          hover:text-red-500

                          dark:hover:bg-indigo-800
                        "
                      >
                        <FiX size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div
          className="
            flex shrink-0
            flex-col-reverse gap-3
            border-t border-slate-200
            bg-slate-50/70
            px-5 py-4

            sm:flex-row
            sm:justify-end
            sm:px-7

            dark:border-slate-800
            dark:bg-slate-900
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