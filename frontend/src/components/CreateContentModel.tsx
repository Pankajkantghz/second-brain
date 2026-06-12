import { useRef, useState } from "react";
import axios from "axios";

import CrossIcon from "../icons/CrossIcon";
import Input from "./Input";
import { Button } from "./Button";
import { Backend_URL } from "../config";

enum ContentType {
  Youtube = "Youtube",
  Twitter = "Twitter",
}

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateContentModel({
  open,
  onClose,
}: CreateContentModelProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const [type, setType] = useState(ContentType.Youtube);

  const [loading, setLoading] = useState(false);

  async function addContent() {
    try {
      setLoading(true);

      const title = titleRef.current?.value;
      const link = linkRef.current?.value;

      await axios.post(
        `${Backend_URL}/api/v1/content`,
        {
          title,
          link,
          type,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to add content");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-[2rem] bg-white shadow-2xl border border-slate-200 p-7 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Add Content</h2>

            <p className="text-slate-500 mt-1 text-sm">
              Save a YouTube video or Twitter post
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 transition"
          >
            <CrossIcon />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Title
            </label>

            <Input ref={titleRef} placeholder="Enter title" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Link
            </label>

            <Input ref={linkRef} placeholder="Paste URL" />
          </div>
        </div>

        {/* Type */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-slate-600 mb-3">
            Content Type
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setType(ContentType.Youtube)}
              className={`rounded-2xl py-3 font-medium transition-all
                ${
                  type === ContentType.Youtube
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
            >
              📺 Youtube
            </button>

            <button
              onClick={() => setType(ContentType.Twitter)}
              className={`rounded-2xl py-3 font-medium transition-all
                ${
                  type === ContentType.Twitter
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
            >
              🐦 Twitter
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-7">
          <Button
            onClick={addContent}
            variant="primary"
            text="Save Content"
            fullWidth={true}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
