import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

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
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, loading]);

  /* Set current title */
  useEffect(() => {
    if (open && titleRef.current) {
      titleRef.current.value = currentTitle;

      // Focus input when modal opens
      requestAnimationFrame(() => {
        titleRef.current?.focus();
        titleRef.current?.select();
      });
    }
  }, [open, currentTitle]);

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
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Failed to update content";

        toast.error(message);
      } else {
        toast.error("Failed to update content");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/50
            p-4
            backdrop-blur-sm
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close modal"
            onClick={() => {
              if (!loading) onClose();
            }}
            className="absolute inset-0 cursor-default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-content-title"
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 12,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 8,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="
              relative
              z-10
              w-full
              max-w-lg
              overflow-hidden
              rounded-[28px]
              border
              border-slate-200
              bg-white
              p-6
              shadow-[0_30px_80px_rgba(0,0,0,0.2)]
              dark:border-slate-700
              dark:bg-slate-900

              sm:rounded-[32px]
              sm:p-8
            "
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: 0.05,
                ease: "easeOut",
              }}
              className="mb-7"
            >
              <h2
                id="edit-content-title"
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-slate-800
                  dark:text-white
                  sm:text-3xl
                "
              >
                Edit Content
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-500
                  dark:text-slate-300
                "
              >
                Update the title of your saved content.
              </p>
            </motion.div>

            {/* Input */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: 0.1,
                ease: "easeOut",
              }}
            >
              <label
                htmlFor="edit-content-title-input"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-600
                  dark:text-slate-300
                "
              >
                Title
              </label>

              <Input
                ref={titleRef}
                placeholder="Enter new title"
                id="edit-content-title-input"
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !loading) {
                    handleUpdate();
                  }
                }}
              />
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.25,
                delay: 0.15,
                ease: "easeOut",
              }}
              className="
                mt-8
                flex
                flex-col-reverse
                gap-3

                sm:flex-row
                sm:justify-end
              "
            >
              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
                <Button onClick={onClose} variant="secondary" text="Cancel" />
              </motion.div>

              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={handleUpdate}
                  variant="primary"
                  text={loading ? "Updating..." : "Save Changes"}
                  loading={loading}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
