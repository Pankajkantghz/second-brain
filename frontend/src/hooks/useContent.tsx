import { useCallback, useEffect, useState } from "react";

import axios from "axios";

import { Backend_URL } from "../config";

export default function useContent() {
  const [contents, setContents] = useState<any[]>([]);

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

      console.log("Dashboard API:", response.data);

      /* Handle every possible response shape */
      const data = response.data;

      const content =
        data?.content || data?.contents || data?.data || data || [];

      setContents(Array.isArray(content) ? content : []);
    } catch (error) {
      console.log(error);

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
