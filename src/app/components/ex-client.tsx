import { getMessageFromAi } from "@/fn/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function ChatInterface() {
  const r = await getMessageFromAi("some message");

  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{r}</ReactMarkdown>
}
