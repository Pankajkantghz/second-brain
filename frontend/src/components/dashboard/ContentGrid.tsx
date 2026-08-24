import type { ContentItem } from "../../types/content";
import Card from "../Card";

interface ContentGridProps {
  contents: ContentItem[];
  onDelete: (contentId: string) => void;
  onEdit: (content: ContentItem) => void;
}

export default function ContentGrid({
  contents,
  onDelete,
  onEdit,
}: ContentGridProps) {
  if (contents.length === 0) {
    return null;
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        sm:gap-5
        lg:grid-cols-3
        lg:gap-6
        2xl:grid-cols-4
      "
    >
      {contents.map((item) => (
        <Card
          key={item._id}
          title={item.title}
          link={item.link}
          type={item.type ?? "Website"}
          tags={item.tags ?? []}
          onDelete={() => onDelete(item._id)}
          onEdit={() => onEdit(item)}
        />
      ))}
    </div>
  );
}