interface SidebarItemsProps {
  text: string;
  icon: React.ReactNode;
  active?: boolean;
  collapsed: boolean;
  onClick?: () => void;
}

export default function SidebarItems({
  text,
  icon,
  active = false,
  collapsed,
  onClick,
}: SidebarItemsProps) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? text : ""}
      className={`group relative flex w-full items-center rounded-2xl transition-all duration-300 ${
        collapsed ? "justify-center px-2 py-3" : "justify-start gap-4 px-4 py-3"
      } ${
        active
          ? "bg-indigo-50 text-indigo-700 shadow-sm dark:bg-indigo-900/30 dark:text-indigo-300"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
      }`}
    >
      {/* Active Indicator */}
      {active && (
        <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-indigo-600" />
      )}

      {/* Icon */}
      <div
        className={`flex shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
          collapsed ? "h-12 w-12" : "h-10 w-10"
        } ${
          active
            ? "bg-indigo-100 dark:bg-indigo-900/40"
            : "group-hover:bg-slate-100 dark:group-hover:bg-slate-700"
        }`}
      >
        <span className="text-lg">{icon}</span>
      </div>

      {/* Text */}
      {!collapsed && <span className="truncate font-medium">{text}</span>}
    </button>
  );
}
