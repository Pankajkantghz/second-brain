import { Button } from "../Button";

import PlusIcon from "../../icons/PlusIcon";
import ShareIcon from "../../icons/ShareIcon";

interface DashboardHeaderProps {
  onAdd: () => void;
  onShare: () => void;
}

export default function DashboardHeader({
  onAdd,
  onShare,
}: DashboardHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-white">
          Your Second Brain
        </h1>

        <p className="mt-2 max-w-2xl text-slate-500 dark:text-slate-300">
          Organize videos, tweets, websites, and resources in one place.
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={onAdd}
          variant="primary"
          text="Add Content"
          startIcon={<PlusIcon />}
        />

        <Button
          onClick={onShare}
          variant="secondary"
          text="Share Brain"
          startIcon={<ShareIcon />}
        />
      </div>
    </div>
  );
}
