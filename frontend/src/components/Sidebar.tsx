import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import BrainIcon from "../icons/BrainIcon";
import LogoutIcon from "../icons/LogoutIcon";
import XIcon from "../icons/XIcon";
import YoutubeIcons from "../icons/YoutubeIcons";

import SidebarItems from "./SidebarItems";

interface SidebarProps {
  tags: string[];

  selectedType: string;
  onTypeChange: (type: string) => void;

  selectedTag: string;
  onTagChange: (tag: string) => void;

  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({
  tags,
  selectedType,
  onTypeChange,
  selectedTag,
  onTagChange,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const navigate = useNavigate();

  /* Logout */
  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged out");

    navigate("/signin");
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-white shadow-sm transition-all duration-300 ${
        collapsed ? "w-24" : "w-72"
      }`}
    >
      {/* Header */}
      <div className="border-b border-slate-100 p-5">
        <div className="relative flex items-center">
          {/* Logo */}
          <div
            className={`flex items-center overflow-hidden ${
              collapsed ? "w-full justify-center" : "gap-4"
            }`}
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
              <BrainIcon />
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <h1 className="truncate text-2xl font-bold text-slate-800">
                  Brainly
                </h1>

                <p className="text-sm text-slate-500">Your second brain</p>
              </div>
            )}
          </div>

          {/* Collapse Button */}
          <button
            onClick={onToggleCollapse}
            className={`absolute top-1/2 -translate-y-1/2 rounded-xl border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-700 ${
              collapsed ? "-right-4" : "right-0"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className={`h-4 w-4 transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-3 py-5">
        {!collapsed && (
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Content
          </p>
        )}

        <div className="space-y-2">
          <SidebarItems
            text="All"
            icon="📚"
            collapsed={collapsed}
            active={selectedType === "All"}
            onClick={() => onTypeChange("All")}
          />

          <SidebarItems
            text="Twitter / X"
            icon={<XIcon />}
            collapsed={collapsed}
            active={selectedType === "Twitter"}
            onClick={() => onTypeChange("Twitter")}
          />

          <SidebarItems
            text="Youtube"
            icon={<YoutubeIcons />}
            collapsed={collapsed}
            active={selectedType === "Youtube"}
            onClick={() => onTypeChange("Youtube")}
          />

          <SidebarItems
            text="Website"
            icon="🌐"
            collapsed={collapsed}
            active={selectedType === "Website"}
            onClick={() => onTypeChange("Website")}
          />
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-8">
            {!collapsed && (
              <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Tags
              </p>
            )}

            <div
              className={`flex gap-2 ${
                collapsed ? "flex-col items-center" : "flex-wrap px-2"
              }`}
            >
              {/* All Tags */}
              <button
                onClick={() => onTagChange("")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  selectedTag === ""
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {collapsed ? "🏷️" : "All"}
              </button>

              {!collapsed &&
                tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onTagChange(tag)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      selectedTag === tag
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 p-4">
        <button
          onClick={handleLogout}
          className={`flex items-center justify-center gap-2 rounded-2xl bg-red-500 text-white transition hover:bg-red-600 ${
            collapsed ? "mx-auto h-14 w-14 rounded-xl" : "w-full px-4 py-3"
          }`}
        >
          <LogoutIcon />

          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
