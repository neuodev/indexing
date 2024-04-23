import { useIndexing } from "@/hooks/indexing";
import { useAccountKey } from "@/hooks/key";
import { useLinks } from "@/hooks/links";
import { read } from "@/lib/file";
import { ChangeEvent, useCallback } from "react";

export default function Indexing() {
  const account = useAccountKey();
  const links = useLinks();
  const indexing = useIndexing();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="mb-2 font-bold">Account Key</h2>
        <input type="file" onChange={account.load} />
        <p className="mt-1 font-light text-sm italic">
          {account.loading
            ? "Loading"
            : account.error
            ? `Error: ${account.error}`
            : account.key
            ? "Successfully uploaded account key"
            : ""}
        </p>
      </div>

      <div>
        <h2 className="mb-2 font-bold">Site URLs</h2>
        <textarea
          placeholder={[
            "https:site.com/page-1",
            "https:site.com/page-2",
            "https:site.com/page-3",
            "...",
          ].join("\n")}
          className="w-full bg-gray-100 rounded-md focus:ring-2 ring-gray-300 focus:outline-none p-2 font-mono"
          name="Site URLs"
          id="urls"
          cols={30}
          rows={10}
          onChange={links.onChange}
        />

        <p className="mt-1 font-light text-sm italic">
          {links.error ? `Error: ${links.error}` : ""}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <button
          onClick={() => {
            indexing.start();
          }}
          className="bg-indigo-100 hover:bg-indigo-200 text-indigo-500 px-10 py-3 rounded-md font-bold min-w-9"
        >
          Start
        </button>
        <p className="mt-2 font-light text-sm italic">
          {indexing.loading
            ? "Loading"
              ? indexing.error
              : `Error: ${indexing.error}`
            : indexing.success
            ? `Successfully indexed ${links.urls.length} URL(s)`
            : ""}
        </p>
      </div>
    </div>
  );
}
