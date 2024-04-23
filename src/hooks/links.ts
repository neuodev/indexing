import { ChangeEvent, useCallback, useState } from "react";

export function useLinks() {
  const [error, setError] = useState<string | null>(null);
  const [urls, setUrls] = useState<string[]>([]);
  const onChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setUrls([]);
    const text = event.target.value;
    const links = text
      .split("\n")
      .map((link) => link.trim())
      .filter((link) => !!link);

    for (const link of links) {
      if (!link.startsWith("http"))
        return setError(`"${link}" is not a valid URL`);
    }
    setUrls(links);
  }, []);

  return { onChange, error, urls };
}
