"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SWRTest() {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/todos/1",
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <h2>Todo from SWR</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
