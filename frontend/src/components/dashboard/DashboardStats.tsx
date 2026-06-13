interface DashboardStatsProps {
  total: number;
  youtubeCount: number;
  twitterCount: number;
  websiteCount: number;
}

export default function DashboardStats({
  total,
  youtubeCount,
  twitterCount,
  websiteCount,
}: DashboardStatsProps) {
  const stats = [
    { title: "Total Content", value: total, color: "text-slate-800" },
    { title: "Youtube Videos", value: youtubeCount, color: "text-red-500" },
    { title: "Twitter Posts", value: twitterCount, color: "text-sky-500" },
    { title: "Websites", value: websiteCount, color: "text-emerald-600" },
  ];

  return (
    <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <h3 className="text-sm text-slate-500">{item.title}</h3>
          <p className={`mt-3 text-4xl font-bold ${item.color}`}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
