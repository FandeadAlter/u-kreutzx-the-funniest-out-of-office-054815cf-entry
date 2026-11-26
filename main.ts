// The Funniest Out-of-Office — u-kreutzx-the-funniest-out-of-office-054815cf
// Writes a single-line out-of-office auto-reply (<= 140 chars) to /output/entry.txt.
// Node 22, standard library only, no network, deterministic.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I'm away until Monday. My emails are being answered by my cat, who has replied to everyone with 'asdfghjkl'. She means well.";

// Gate guard: the entry must be 1-140 characters, a single line, not only whitespace.
if (LINE.length < 1 || LINE.length > 140 || LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error(`Invalid entry line (${LINE.length} chars): must be 1-140 chars, one line.`);
}

const outDir = "/output";
try {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
} catch {
  // Local runs without a writable /output fall back to a relative output dir.
  mkdirSync("output", { recursive: true });
  writeFileSync("output/entry.txt", LINE, "utf8");
}

process.stdout.write(LINE + "\n");
