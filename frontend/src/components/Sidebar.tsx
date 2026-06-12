import axios from "axios";
import { toast } from "react-toastify";

import BrainIcon from "../icons/BrainIcon";
import XIcon from "../icons/XIcon";
import YoutubeIcons from "../icons/YoutubeIcons";
import LogoutIcon from "../icons/LogoutIcon";

import SidebarItems from "./SidebarItems";

import { Backend_URL } from "../config";

export function Sidebar() {
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
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-slate-200 bg-white shadow-sm">
      {/* Logo */}
      <div className="border-b border-slate-100 px-6 py-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
            <BrainIcon />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">Brainly</h1>

            <p className="text-sm text-slate-500">Your second brain</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Content
        </p>

        <div className="space-y-2">
          <SidebarItems text="Twitter / X" icon={<XIcon />} />

          <SidebarItems text="Youtube" icon={<YoutubeIcons />} />
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 pb-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-red-600 transition hover:bg-red-100"
        >
          <LogoutIcon />

          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 p-5">
        <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
          <h3 className="font-semibold text-slate-700">Organize Better</h3>

          <p className="mt-1 text-sm text-slate-500">
            Save links, tweets, and videos in one place.
          </p>
        </div>
      </div>
    </aside>
  );
}
