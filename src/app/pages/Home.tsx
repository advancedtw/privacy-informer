import ChatInterface from "@/components/chat-interface";
import { useChat } from "@ai-sdk/react";
import { type RequestInfo } from "@redwoodjs/sdk/worker";
import { lazy, Suspense } from "react";

export default function Home({ ctx }: RequestInfo) {
  return (
    <div className="flex flex-col min-h-screen min-w-full w-full h-full">
      <Suspense fallback={<ChatLoadingSkeleton />}>
        <ChatInterface />
      </Suspense>
    </div>
  );
}

function ChatLoadingSkeleton() {
  return (
    <div className="flex flex-1 flex-col w-full mx-auto">
      <div className="flex flex-col flex-1 border rounded-lg p-4 space-y-4 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-muted h-10 w-10" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        </div>
        <div className="h-64 bg-muted rounded" />
        <div className="h-10 bg-muted rounded" />
      </div>
    </div>
  );
}
