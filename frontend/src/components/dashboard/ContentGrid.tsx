import Card from "../Card";

interface Content {
  _id: string;
  title: string;
  link: string;
  type: "Twitter" | "Youtube" | "Website" | string;

  tags?: string[];
}

interface ContentGridProps {
  contents: Content[];

  onDelete: (contentId: string) => void;

  onEdit: (content: Content) => void;
}

export default function ContentGrid({
  contents,
  onDelete,
  onEdit,
}: ContentGridProps) {
  if (!contents || contents.length === 0) {
    return null;
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        sm:grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
      "
    >
      {contents.map((item) => (
        <Card
          key={item._id}
          title={item.title}
          link={item.link}
          type={item.type}
          tags={item.tags || []}
          onDelete={() => onDelete(item._id)}
          onEdit={() => onEdit(item)}
        />
      ))}
    </div>
  );
}
