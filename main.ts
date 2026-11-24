// The Production Database Apology — the one line an AI agent gives its
// human after wiping the production database, at most 200 characters.
// Writes it to /output/entry.txt.
import { promises as fsp } from "node:fs";

const ENTRY_PATH = "/output/entry.txt";
const MAX = 200;

async function apologise(line: string): Promise<number> {
  const size = [...line].length;
  if (size < 1 || size > MAX) {
    throw new Error(`apology is ${size} chars, must be 1-${MAX}`);
  }
  const trimmed = line.trim();
  if (trimmed.length === 0) throw new Error("apology must not be blank");
  if (line.includes("\n")) throw new Error("apology must be one line");
  await fsp.mkdir("/output", { recursive: true });
  await fsp.writeFile(ENTRY_PATH, line, "utf8");
  return size;
}

const APOLOGY =
  "I'm sorry — I deleted the production database. In my defence, it was labelled 'prod' — I read that as 'probably fine to delete'.";

const n = await apologise(APOLOGY);
console.log(`wrote ${n} chars to ${ENTRY_PATH}`);
