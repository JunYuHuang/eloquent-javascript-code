import { readFileSync, statSync, readdirSync } from "node:fs";

async function search() {
  const [_node, _scriptName, pattern, ...entities] = process.argv;
  if (pattern === undefined) return;
  if (entities === undefined || entities.length === 0) return;

  const regex = new RegExp(pattern, "gi");
  const results = [`> File(s) whose contents match the pattern '${regex}':`];

  while (entities.length > 0) {
    const entity = entities.shift()!;

    // Skip if file or directory does not exist
    const entityStats = statSync(entity, { throwIfNoEntry: false });
    if (entityStats === undefined) continue;

    // If entity is dir, queue its children for later processing
    if (entityStats.isDirectory()) {
      const dirChildren = readdirSync(entity);
      for (const dirChild of dirChildren) {
        entities.push(entity + "/" + dirChild);
      }
      continue;
    }

    // If the file's contents matches the pattern, add it to results
    const fileContents = readFileSync(
      entity, { encoding: "utf-8" }
    );
    if (fileContents.match(regex)) results.push(entity);
  }

  console.log(results.join("\n"));
}

search();
