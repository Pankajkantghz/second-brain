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
    {
      title: "Total Content",
      value: total,
      icon: "📚",
    },

    {
      title: "Youtube",
      value: youtubeCount,
      icon: "🎥",
    },

    {
      title: "Twitter / X",
      value: twitterCount,
      icon: "🐦",
    },

    {
      title: "Websites",
      value: websiteCount,
      icon: "🌐",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Top */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>

              <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-800">
                {stat.value}
              </h2>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl transition group-hover:scale-105">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
