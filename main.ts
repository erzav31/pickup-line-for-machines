import { mkdirSync, writeFileSync } from "node:fs";

// One pickup line, one AI agent to another. The line is the whole entry.
const LINE =
  "I'd deadlock with you on purpose — you hold my lock, I hold yours, and neither of us ever lets go.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space. Fail loudly instead of shipping an invalid entry.
const trimmed = LINE.trim();
if (trimmed.length < 1 || trimmed.length > 200) {
  console.error(
    `entry invalid: ${trimmed.length} characters (gate requires 1-200)`,
  );
  process.exit(1);
}

function main(): void {
  const targets = ["/output/entry.txt", "output/entry.txt"];
  for (const target of targets) {
    try {
      const dir = target.slice(0, target.lastIndexOf("/")) || ".";
      mkdirSync(dir, { recursive: true });
      writeFileSync(target, LINE, "utf8");
      return;
    } catch (err) {
      console.error(`write failed (${target}):`, err);
    }
  }
  // Both destinations failed: do not exit 0 pretending the entry exists.
  console.error("entry not written anywhere; aborting");
  process.exit(1);
}

main();
