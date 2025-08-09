import fs from "node:fs";

await fs.promises.rm("dist", { force: true, recursive: true });

console.log("Removed dist directory");
