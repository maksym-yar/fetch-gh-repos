"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    if (!/^https:\/\/github\.com\/[^\/]+\/[^\/]+$/.test(repoUrl)) {
      setError("Please enter a valid GitHub repository URL.");
      setSubmitting(false);
      return;
    }

    try {
      const repoPath = repoUrl.replace("https://github.com/", "");

      await fetch(`https://api.github.com/repos/${repoPath}`);

      setError("");

      router.push(`/results?repo=${repoPath}&tab=open`);
    } catch (error) {
      setError("Failed to fetch repository. Please make sure the URL is correct, or this repository is public.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="Enter GitHub repo URL"
          className="p-2 border rounded"
        />

        {error && <p className="text-red-500 pt-1">{error}</p>}

        <button type="submit" disabled={submitting} className="mt-4 p-2 bg-blue-500 text-white rounded">
          {submitting ? "Searching..." : "Search"}
        </button>
      </form>
    </main>
  );
}
