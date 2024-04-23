import { useCallback, useState } from "react";
import axios from "axios";

const ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish";

export function useIndexing() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const start = useCallback(async (key: object, links: string[]) => {
    await axios.post(
      ENDPOINT,
      {
        url: links[0],
        type: "URL_UPDATED",
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      }
    );
  }, []);
  return { start, loading, error, success };
}
