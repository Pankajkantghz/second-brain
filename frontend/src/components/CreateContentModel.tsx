import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import { Backend_URL } from "../config";

import { Button } from "./Button";
import Input from "./Input";

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
  refresh?: () => void;
}

export default function CreateContentModel({
  open,
  onClose,
  refresh,
}: CreateContentModelProps) {
  const titleRef = useRef<HTMLInputElement>(null);

  const linkRef = useRef<HTMLInputElement>(null);

  const [tags, setTags] = useState("");

  const [loading, setLoading] = useState(false);

  /* Escape Close */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!open) return null;

  /* URL Validation */
  const isValidUrl = (url: string) => {
    try {
      new URL(url);

      return true;
    } catch {
      return false;
    }
  };

  /* Submit */
  const handleAddContent = async () => {
    const title = titleRef.current?.value.trim() || "";

    const link = linkRef.current?.value.trim() || "";

    /* Validation */
    if (!title) {
      toast.error("Title is required");

      return;
    }

    if (title.length < 3) {
      toast.error("Title must be at least 3 characters");

      return;
    }

    if (!link) {
      toast.error("Link is required");

      return;
    }

    if (!isValidUrl(link)) {
      toast.error("Please enter a valid URL");

      return;
    }

    try {
      setLoading(true);

      const formattedTags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

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

      /* Clear Form */
      if (titleRef.current) {
        titleRef.current.value = "";
      }

      if (linkRef.current) {
        linkRef.current.value = "";
      }

      setTags("");

      /* Refresh Dashboard */
      refresh?.();

      onClose();
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to add content";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_rgba(0,0,0,0.2)] transition-colors dark:border-slate-700 dark:bg-slate-800">
        {/* Header */}
        <div className="mb-7">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
            Add Content
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-300">
            Save videos, tweets, and websites in your second brain.
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Title
            </label>

            <Input ref={titleRef} placeholder="React roadmap" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Link
            </label>

            <Input ref={linkRef} placeholder="https://youtube.com/..." />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
              Tags
            </label>

            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="react, frontend, hooks"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400"
            />

            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
              Separate tags using commas
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <Button onClick={onClose} variant="secondary" text="Cancel" />

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
