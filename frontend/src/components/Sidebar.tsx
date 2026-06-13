import axios from "axios";
import { toast } from "react-toastify";

import BrainIcon from "../icons/BrainIcon";
import XIcon from "../icons/XIcon";
import YoutubeIcons from "../icons/YoutubeIcons";
import LogoutIcon from "../icons/LogoutIcon";

import SidebarItems from "./SidebarItems";
import { Backend_URL } from "../config";

interface SidebarProps {
  tags: string[];
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedTag: string;
  onTagChange: (tag: string) => void;
  collapsed: boolean;               // Controlled from parent layout
  onToggleCollapse: () => void;     // Triggered here, handled by parent
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
  const handleLogout = async () => {
    try {
      await axios.post(`${Backend_URL}/api/v1/logout`);
      localStorage.removeItem("token");
      toast.success("Logged out");
      window.location.href = "/signin";
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-white shadow-sm transition-all duration-300 ${
        collapsed ? "w-24" : "w-72"
      }`}
    >
      {/* Header */}
      <div className="border-b border-slate-100 p-5">
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-100">
              <BrainIcon />
            </div>

            {!collapsed && (
              <div className="animate-fadeIn transition-opacity duration-200 whitespace-nowrap">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                  Brainly
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Your second brain
                </p>
              </div>
            )}
          </div>

          <button
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`rounded-xl p-2.5 text-slate-400 border border-slate-100 bg-slate-50/50 transition-all hover:bg-slate-100 hover:text-slate-700 ${
              collapsed
                ? "absolute -right-3 top-8 z-50 rounded-full bg-white shadow-md border-slate-200 p-1.5"
                : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className={`h-4 w-4 transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Nav Options */}
      <div className="flex-1 overflow-y-auto px-3 py-6">
        {!collapsed && (
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Content
          </p>
        )}

        <div className="space-y-1">
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

        {/* Tags Section */}
        {!collapsed && tags.length > 0 && (
          <div className="mt-8">
            <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Tags
            </p>
            <div className="flex flex-wrap gap-2 px-2">
              <button
                onClick={() => onTagChange("")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  selectedTag === "" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagChange(tag)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedTag === tag ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
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
          className={`flex items-center justify-center gap-2 rounded-2xl bg-red-500 text-white transition-all hover:bg-red-600 ${
            collapsed ? "w-14 h-14 p-0 mx-auto rounded-xl" : "w-full px-4 py-3"
          }`}
        >
          <LogoutIcon />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}