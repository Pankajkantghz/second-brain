interface SidebarItemsProps {
  text: string;
  icon: React.ReactNode;
  active?: boolean;
  collapsed: boolean; // Tells item whether to drop string labels
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
      className={`flex w-full items-center rounded-2xl px-4 py-3 transition-all duration-200 ${
        collapsed ? "justify-center gap-0" : "justify-start gap-4"
      } ${
        active
          ? "bg-indigo-50 text-indigo-700 font-semibold"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      <span className="text-xl flex shrink-0 items-center justify-center w-6 h-6">
        {icon}
      </span>

      {!collapsed && (
        <span className="font-medium whitespace-nowrap transition-opacity duration-200">
          {text}
        </span>
      )}
    </button>
  );
}
