import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Card from "../components/Card";
import { Backend_URL } from "../config";

export default function SharedBrain() {
  const { shareLink } = useParams();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchBrain() {
      try {
        const response = await axios.get(
          `${Backend_URL}/api/v1/brain/${shareLink}`,
        );

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchBrain();
  }, [shareLink]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-8">{data.username}'s Brain</h1>

      <div className="flex flex-wrap gap-6">
        {data.content.map(({ link, type, title }: any, index: number) => (
          <Card key={index} link={link} type={type} title={title} />
        ))}
      </div>
    </div>
  );
}
