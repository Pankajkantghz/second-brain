import Card from "../Card";

interface ContentGridProps {
  contents: any[];

  onDelete: (contentId: string) => void;

  onEdit: (id: string, title: string) => void;
}

export default function ContentGrid({
  contents,
  onDelete,
  onEdit,
}: ContentGridProps) {
  return (
    <div className="flex flex-wrap gap-6">
      {contents.map(({ _id, title, link, type }) => (
        <Card
          key={_id}
          title={title}
          link={link}
          type={type}
          onDelete={() => onDelete(_id)}
          onEdit={() => onEdit(_id, title)}
        />
      ))}
    </div>
  );
}
