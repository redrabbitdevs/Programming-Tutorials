type Result = Error | Response | string;

function describe(result: Result): string {
  if (result instanceof Error) {
    return `error: ${result.message}`;
  }
  if (result instanceof Response) {
    return `response: ${result.status}`;
  }
  return `text: ${result}`;
}

console.log(describe(new Error("boom")));
console.log(describe(new Response("ok", { status: 201 })));
console.log(describe("plain"));
