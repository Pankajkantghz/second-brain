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
    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">Your Second Brain</h1>

        <p className="mt-2 text-slate-500">
          Organize ideas, videos, tweets and useful resources.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
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
