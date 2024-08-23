"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CodeBracketIcon } from "@heroicons/react/24/solid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface Issue {
  id: number;
  title: string;
  state: string;
  html_url: string;
  pull_request?: object;
}

export default function Results() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams();

  const repo = searchParams.get("repo");
  const tab = searchParams.get("tab") || "open";

  const [activeTab, setActiveTab] = useState(tab);
  const [issues, setIssues] = useState<Issue[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    if (searchParams.get("tab") !== activeTab) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('tab', activeTab);

      router.push(pathname + "?" + params.toString());
    }
  }, [activeTab, pathname, router, searchParams]);

  useEffect(() => {
    const fetchIssues = async () => {
      if (!repo) return;

    try {
      setLoading(true);

      const response = activeTab === 'pulls' 
        ? await fetch(`https://api.github.com/repos/${repo}/pulls?page=${page}&per_page=30&sort=created&direction=desc&state=all`) 
        : await fetch(`https://api.github.com/search/issues?page=${page}&per_page=30&sort=created&direction=desc&q=is:issue+is:${activeTab}+repo:${repo}`)

      if (!response.ok) throw new Error("Failed to fetch issues");
      const data = await response.json();

      setIssues((prevIssues) => ([...prevIssues, ...(activeTab === 'pulls' ? data : data.items)]));

      const linkHeader = response.headers.get("Link");
      if (linkHeader) {
        const hasNext = linkHeader.includes('rel="next"');
        setHasNextPage(hasNext);
      } else {
        setHasNextPage(false);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    }

    fetchIssues();
  }, [activeTab, page, repo]);

  const renderIssues = (issues: Issue[]) => {
    return (
      <ul className="flex flex-col gap-2">
        {error && <li className="text-red-500">{error}</li>}

        {!loading && issues.length === 0 && <li>No issues found.</li>}

        {issues.map((issue) => (
          <li key={issue.id} className="border rounded bg-white">
            <a href={issue.html_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-4">
              {activeTab === 'pulls' ? (
                <CodeBracketIcon className={`h-5 w-5 ${issue.state === 'open' ? 'text-green-500' : 'text-purple-600'}`} />
              ) : (
                issue.state === "open" ? (
                  <InformationCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <CheckCircleIcon className="h-5 w-5 text-purple-500 mr-2" />
                )
              )}

              {issue.title}
            </a>
          </li>
        ))}

        {loading && Array.from({ length: 10 }).map((_, i) => (
          <li key={i} className='h-14 animate-pulse bg-gray-400 rounded'></li>
        ))}
      </ul>
    );
  };

  const loadMore = () => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-100">
      <div className="w-full">
        <Tabs value={activeTab} onValueChange={(value) => { setActiveTab(value); setPage(1); setIssues([]); }}>
          <TabsList className="flex justify-around mb-4 bg-white">
            <TabsTrigger value="open" className={`flex-1 p-2 ${activeTab === 'open' ? '!text-blue-500' : '!text-black'} rounded`}>
              <InformationCircleIcon className="h-5 w-5 mr-2" />
              Open Issues
            </TabsTrigger>
            <TabsTrigger value="closed" className={`flex-1 p-2 ${activeTab === 'closed' ? '!text-blue-500' : '!text-black'} rounded`}>
              <Check className="h-5 w-5 mr-2" />
              Closed Issues
            </TabsTrigger>
            <TabsTrigger value="pulls" className={`flex-1 p-2 ${activeTab === 'pulls' ? '!text-blue-500' : '!text-black'} rounded`}>
              <CodeBracketIcon className="h-5 w-5 mr-2" />
              Pull Requests
            </TabsTrigger>
          </TabsList>
          <TabsContent value="open">{renderIssues(issues)}</TabsContent>
          <TabsContent value="closed">{renderIssues(issues)}</TabsContent>
          <TabsContent value="pulls">{renderIssues(issues)}</TabsContent>
        </Tabs>
        {hasNextPage && !loading && (
          <button onClick={loadMore} className="w-full text-center mt-4 p-2 bg-blue-500 text-white rounded">
            Load More
          </button>
        )}
      </div>
    </main>
  );
}
