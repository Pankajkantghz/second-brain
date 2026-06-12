import { ReactElement } from "react";

interface SidebarItemsProps {
  text: string;
  icon: ReactElement;
}

export default function SidebarItems({ text, icon }: SidebarItemsProps) {
  return (
    <button className="group flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-slate-700 transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 hover:shadow-sm">
      {/* Icon */}
      <div className="text-slate-500 transition-colors duration-200 group-hover:text-indigo-600">
        {icon}
      </div>

      {/* Text */}
      <span className="font-medium text-base">{text}</span>
    </button>
  );
}
