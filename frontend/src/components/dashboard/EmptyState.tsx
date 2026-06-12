import { Button } from "../Button";

import PlusIcon from "../../icons/PlusIcon";

interface EmptyStateProps {
  onAdd: () => void;
}

export default function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-14 text-center shadow-sm">
      <div className="mb-4 text-6xl">📂</div>

      <h3 className="text-2xl font-semibold text-slate-700">No content yet</h3>

      <p className="mt-2 max-w-md text-slate-500">
        Add videos, tweets and links to start building your second brain.
      </p>

      <div className="mt-6">
        <Button
          onClick={onAdd}
          variant="primary"
          text="Add Content"
          startIcon={<PlusIcon />}
        />
      </div>
    </div>
  );
}
