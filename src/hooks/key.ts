import { read } from "@/lib/file";
import { ChangeEvent, useCallback, useState } from "react";

export function useAccountKey() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accountKey, setAccountKey] = useState<object | null>(null);

  const load = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setError(null);
    setAccountKey(null);

    try {
      const file = event.target.files?.item(0);
      if (!file) throw new Error("File not found!");
      const content = await read(file);
      const key = JSON.parse(content);
      setAccountKey(key);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unexpected Error");
    }

    setLoading(false);
  }, []);

  return {
    load,
    loading,
    error,
    key: accountKey,
  };
}
