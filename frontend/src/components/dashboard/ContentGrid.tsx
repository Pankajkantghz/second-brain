import Card from "../Card";

interface ContentGridProps {
  contents: any[];
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export default function ContentGrid({
  contents,
  onDelete,
  onEdit,
}: ContentGridProps) {
  return (
    /* 
      Responsive Grid Blueprint:
      - grid-cols-1: Mobile views default to a single stack
      - md:grid-cols-2: Tablets snap to 2 columns
      - lg:grid-cols-3: Smaller desktops snap to 3 columns
      - xl:grid-cols-4: Standard monitors expand seamlessly to 4 columns
    */
    <div className="relative z-0 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-all duration-300">
      {contents.map(({ _id, title, link, type, tags }) => (
        <Card
          key={_id}
          title={title}
          link={link}
          type={type}
          tags={tags}
          onDelete={() => onDelete(_id)}
          onEdit={() => onEdit(_id, title)}
        />
      ))}
    </div>
  );
}