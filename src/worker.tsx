import { defineApp } from "@redwoodjs/sdk/worker";
import { index, render, route } from "@redwoodjs/sdk/router";

import { Document } from "@/Document";
import Home from "@/pages/Home";
import About from "@/pages/About";
import { setCommonHeaders } from "@/headers";

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },
  render(Document, [index([Home]), route("/about", About)]),
]);
