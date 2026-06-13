import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { Backend_URL } from "../config";
import { Button } from "./Button";
import Input from "./Input";

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

  const [tags, setTags] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!open) return null;

  const handleAddContent =
    async () => {
      try {
        setLoading(true);

        const title =
          titleRef.current
            ?.value;

        const link =
          linkRef.current
            ?.value;

        if (
          !title ||
          !link
        ) {
          toast.error(
            "Please fill all fields"
          );

          return;
        }

        const formattedTags =
          tags
            .split(",")
            .map((tag) =>
              tag.trim()
            )
            .filter(
              Boolean
            );

        await axios.post(
          `${Backend_URL}/api/v1/content`,
          {
            title,
            link,
            tags:
              formattedTags,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "token"
              )}`,
            },
          }
        );

        toast.success(
          "Content added"
        );

        if (
          titleRef.current
        ) {
          titleRef.current.value =
            "";
        }

        if (
          linkRef.current
        ) {
          linkRef.current.value =
            "";
        }

        setTags("");

        onClose();
      } catch (
        error: any
      ) {
        toast.error(
          error.response
            ?.data
            ?.message ||
            "Failed to add content"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-7">
          <h2 className="text-3xl font-bold text-slate-800">
            Add Content
          </h2>

          <p className="mt-2 text-slate-500">
            Save videos,
            tweets, and
            websites.
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Title
            </label>

            <Input
              ref={titleRef}
              placeholder="React roadmap"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Link
            </label>

            <Input
              ref={linkRef}
              placeholder="Paste URL..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Tags
            </label>

            <input
              type="text"
              value={tags}
              onChange={(e) =>
                setTags(
                  e.target.value
                )
              }
              placeholder="react, frontend, hooks"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500"
            />

            <p className="mt-2 text-xs text-slate-400">
              Separate tags
              using commas
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <Button
            onClick={
              onClose
            }
            variant="secondary"
            text="Cancel"
          />

          <Button
            onClick={
              handleAddContent
            }
            variant="primary"
            text={
              loading
                ? "Adding..."
                : "Add Content"
            }
          />
        </div>
      </div>
    </div>
  );
}