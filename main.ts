import { mkdirSync, writeFileSync } from "node:fs";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// One original excuse, in the robot vacuum's own voice: the missed crumb
// is not a failure, it is a landmark the vacuum navigates by.
const line =
  "That crumb isn't missed, it's a landmark — without it, I'd have no idea where I've already been. You're welcome.";

function gate(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.trim() !== text || text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single unpadded line");
  }
}

gate(line);
writeFileSync(`${outDir}/entry.txt`, line, "utf8");
console.log(`wrote ${[...line].length}-character entry to ${outDir}/entry.txt`);
