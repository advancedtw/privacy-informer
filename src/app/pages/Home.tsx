import { RequestInfo } from "@redwoodjs/sdk/worker";

export default function Home({ ctx }: RequestInfo) {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
