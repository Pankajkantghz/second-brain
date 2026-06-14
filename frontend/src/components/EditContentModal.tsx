import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import { Backend_URL } from "../config";

import { Button } from "./Button";
import Input from "./Input";

interface EditContentModalProps {
  open: boolean;

  onClose: () => void;

  contentId: string;

  currentTitle: string;

  refresh?: () => void;
}

export default function EditContentModal({
  open,
  onClose,
  contentId,
  currentTitle,
  refresh,
}: EditContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);

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

  /* Set current title */
  useEffect(() => {
    if (open && titleRef.current) {
      titleRef.current.value = currentTitle;
    }
  }, [open, currentTitle]);

  if (!open) return null;

  const handleUpdate = async () => {
    const title = titleRef.current?.value.trim() || "";

    /* Validation */
    if (!title) {
      toast.error("Title is required");

      return;
    }

    if (title.length < 3) {
      toast.error("Title must be at least 3 characters");

      return;
    }

    try {
      setLoading(true);

      await axios.put(
        `${Backend_URL}/api/v1/content`,
        {
          contentId,
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success("Content updated");

      refresh?.();

      onClose();
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to update content";

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
            Edit Content
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-300">
            Update the title of your saved content.
          </p>
        </div>

        {/* Input */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
            Title
          </label>

          <Input ref={titleRef} placeholder="Enter new title" />
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <Button onClick={onClose} variant="secondary" text="Cancel" />

          <Button
            onClick={handleUpdate}
            variant="primary"
            text={loading ? "Updating..." : "Save Changes"}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
