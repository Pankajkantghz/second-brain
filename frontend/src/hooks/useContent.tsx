import { useCallback, useEffect, useState } from "react";

import axios from "axios";

import { Backend_URL } from "../config";
import type { ContentItem } from "../types/content";

export default function useContent() {
  const [contents, setContents] = useState<ContentItem[]>([]);

  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(`${Backend_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const content: unknown = response.data?.data;
      setContents(Array.isArray(content) ? content as ContentItem[] : []);
    } catch (error) {
      console.error("Failed to fetch content:", error);

      setContents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    contents,
    loading,
    refresh,
  };
}
