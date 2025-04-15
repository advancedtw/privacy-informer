"use server";

import { requestInfo } from "@redwoodjs/sdk/worker";
import {
  convertToCoreMessages,
  CoreMessage,
  streamText,
  generateText,
} from "ai";
import { google } from "@ai-sdk/google";

export async function getMessageFromAi(payload: Request) {
  // get requets body if any
  const { messages } = await payload.json();

  const result = streamText({
    model: google("gemini-2.0-flash-lite-001"),
    messages: convertToCoreMessages(messages),
    system: "You are a helpful assistant.",
    maxSteps: 3,
  });

  return result.toDataStreamResponse();
}
