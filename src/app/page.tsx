import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/search" className="p-4 bg-blue-500 text-white rounded">
        Go to Search Page
      </Link>
    </main>
  );
}
