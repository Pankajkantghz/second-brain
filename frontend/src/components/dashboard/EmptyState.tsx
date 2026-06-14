import { Button } from "../Button";

import PlusIcon from "../../icons/PlusIcon";

interface EmptyStateProps {
  onAdd: () => void;
}

export default function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <div className="flex min-h-[420px] items-center justify-center">
      <div className="w-full max-w-2xl rounded-[36px] border border-dashed border-slate-300 bg-white px-8 py-16 text-center shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800">
        {/* Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-indigo-100 to-purple-100 text-5xl shadow-sm dark:from-slate-700 dark:to-slate-600">
          🧠
        </div>

        {/* Heading */}
        <h2 className="mt-8 text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
          Your brain is empty
        </h2>

        <p className="mx-auto mt-3 max-w-md text-slate-500 dark:text-slate-300">
          Start saving videos, tweets, websites, and resources to build your
          second brain.
        </p>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={onAdd}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
          />
        </div>
      </div>
    </div>
  );
}
