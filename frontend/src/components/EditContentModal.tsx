import { useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import CrossIcon from "../icons/CrossIcon";
import Input from "./Input";
import { Button } from "./Button";

import { Backend_URL } from "../config";

interface EditContentModalProps {
  open: boolean;
  onClose: () => void;
  contentId: string;
  currentTitle: string;
  refresh: () => void;
}

export default function EditContentModal({
  open,
  onClose,
  contentId,
  currentTitle,
  refresh,
}: EditContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.value = currentTitle;
    }
  }, [currentTitle]);

  const updateContent = async () => {
    try {
      const title = titleRef.current?.value;

      if (!title) {
        toast.error("Title required");
        return;
      }

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

      refresh();
      onClose();
    } catch {
      toast.error("Update failed");
    }
  };

  if (!open) return null;

  return (
    <div>
      {/* Backdrop */}
      <div className="fixed left-0 top-0 z-40 h-screen w-screen bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center">
        <div className="w-[420px] rounded-3xl bg-white p-6 shadow-2xl">
          {/* Header */}
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">
              Edit Content
            </h2>

            <button
              onClick={onClose}
              className="rounded-xl p-2 hover:bg-slate-100"
            >
              <CrossIcon />
            </button>
          </div>

          {/* Input */}
          <div className="mb-5">
            <Input ref={titleRef} placeholder="Enter title" />
          </div>

          {/* Button */}
          <Button
            onClick={updateContent}
            variant="primary"
            text="Save Changes"
          />
        </div>
      </div>
    </div>
  );
}
