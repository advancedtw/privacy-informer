import { defineApp } from "@redwoodjs/sdk/worker";
import { index, render, route } from "@redwoodjs/sdk/router";

import { Document } from "@/Document";
import Home from "@/pages/Home";
import About from "@/pages/About";
import { setCommonHeaders } from "@/headers";
import { getMessageFromAi } from "@/fn/chat";

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },
  route("/api/chat", ({ request, params, ctx }) => getMessageFromAi(request)),
  render(Document, [index([Home]), route("/about", About)]),
]);
