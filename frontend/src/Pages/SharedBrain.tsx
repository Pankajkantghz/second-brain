import axios from "axios";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Card from "../components/Card";

import { Backend_URL } from "../config";

interface SharedContent {
  _id: string;
  title: string;
  link: string;
  type: "Youtube" | "Twitter" | "Website" | string;

  tags?: string[];
}

interface SharedBrainData {
  username?: string;
  name?: string;

  content: SharedContent[];
}

export default function SharedBrain() {
  const { shareLink } = useParams();

  const [data, setData] = useState<SharedBrainData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrain = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${Backend_URL}/api/v1/brain/${shareLink}`,
        );

        console.log(response.data);

        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (shareLink) {
      fetchBrain();
    }
  }, [shareLink]);

  /* Loading State */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-3xl bg-white px-8 py-6 shadow-sm">
          <p className="text-lg font-medium text-slate-600">Loading brain...</p>
        </div>
      </div>
    );
  }

  /* Invalid Link */
  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="max-w-md rounded-[32px] bg-white p-10 text-center shadow-sm">
          <div className="text-6xl">🧠</div>

          <h2 className="mt-5 text-2xl font-bold text-slate-800">
            Brain not found
          </h2>

          <p className="mt-2 text-slate-500">
            This shared link may be invalid or removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800">
          {data.username || data.name || "Shared User"}
          's Brain
        </h1>

        <p className="mt-2 text-slate-500">
          Shared links, knowledge, and resources.
        </p>
      </div>

      {/* Content */}
      {data.content?.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {data.content.map((item) => (
            <Card
              key={item._id}
              title={item.title}
              link={item.link}
              type={item.type}
              tags={item.tags || []}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[32px] bg-white p-12 text-center shadow-sm">
          <div className="text-6xl">📭</div>

          <h2 className="mt-5 text-2xl font-bold text-slate-800">
            No shared content
          </h2>

          <p className="mt-2 text-slate-500">
            This brain does not contain any content yet.
          </p>
        </div>
      )}
    </div>
  );
}
