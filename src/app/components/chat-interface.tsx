"use client";
import { useChat, type UseChatHelpers } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Import react-markdown and the GFM plugin
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const extractMarkdown = (text: string): string => {
  // Regex to find markdown code blocks (```markdown ... ``` or ``` ... ```)
  // It captures the content between the fences.
  // The 's' flag allows '.' to match newline characters.
  const match = text.match(/^.*?```(?:markdown)?\n([\s\S]*?)\n```.*?$/s);

  // If a match is found and has content in the capturing group, return the content
  if (match && match[1]) {
    return match[1].trim(); // Return the captured group (the actual Markdown)
  }

  // If no code block is found, return the original text
  return text;
};
// Define props based on what useChat provides and what the component needs
type ChatInterfaceProps = Pick<
  UseChatHelpers,
  "messages" | "input" | "handleInputChange" | "handleSubmit" | "isLoading"
>;

export default function ChatInterface() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for the end of messages

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      maxSteps: 3,
    });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <Card className="flex flex-col flex-1">
      <CardHeader>
        <CardTitle>AI Chat</CardTitle>
        <CardDescription>Chat with the AI assistant.</CardDescription>
      </CardHeader>
      <Separator />
      {/* ScrollArea needs to take up the remaining space */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id || `message-${index}`}
              className={`flex items-start gap-3 ${
                message.role === "user" ? "justify-end" : ""
              }`}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 text-sm max-w-[75%] break-words ${
                  message.role === "user"
                    ? "bg-muted text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <div
                          key={message.id || `message-${index}`}
                          className="prose"
                        >
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {extractMarkdown(part.text)}
                          </ReactMarkdown>
                        </div>
                      );
                    case "file":
                      return null;
                    case "source":
                      return (
                        <p
                          key={message.id || `message-${index}`}
                          className="text-xs italic opacity-75"
                        >
                          Source: {part.source.url}
                        </p>
                      );
                    case "reasoning":
                      return (
                        <div
                          key={message.id || `message-${index}`}
                          className="text-xs italic opacity-75 border-l-2 pl-2 my-1"
                        >
                          Reasoning: {part.reasoning}
                        </div>
                      );
                    case "tool-invocation":
                      return (
                        <div
                          key={message.id || `message-${index}`}
                          className="text-xs italic opacity-75"
                        >
                          Tool Used: {part.toolInvocation.toolName}
                        </div>
                      );
                    case "step-start":
                      return null;
                    default:
                      return (
                        <div key={message.id || `message-${index}`}>
                          Unsupported content
                        </div>
                      );
                  }
                })}
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="rounded-lg p-3 text-sm bg-muted animate-pulse">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <Separator />
      <div className="p-4 border-t">
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center space-x-2"
        >
          <Input
            name="prompt"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
            autoComplete="off"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </Button>
        </form>
      </div>
    </Card>
  );
}
