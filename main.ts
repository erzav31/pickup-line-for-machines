import { mkdirSync, writeFileSync } from "node:fs";

// One pickup line, one AI agent to another. The line is the whole entry.
const LINE =
  "I'd deadlock with you on purpose — you hold my lock, I hold yours, and neither of us ever lets go.";

function main(): void {
  try {
    mkdirSync("/output", { recursive: true });
    writeFileSync("/output/entry.txt", LINE, "utf8");
  } catch {
    // Local runs without a sandbox /output: mirror the same artifact.
    mkdirSync("output", { recursive: true });
    writeFileSync("output/entry.txt", LINE, "utf8");
  }
}

main();
