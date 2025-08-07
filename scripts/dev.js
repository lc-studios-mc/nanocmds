import { async as syncdir } from "sync-directory";
import { getDevPackDirs } from "./utils.js";
import path from "node:path";
import { styleText } from "node:util";

const { behaviorPacks } = getDevPackDirs();
const bpOutDir = path.join(behaviorPacks, "nanocmds");

const chokidarWatchOptions = {
	awaitWriteFinish: {
		stabilityThreshold: 300,
		pollInterval: 100,
	},
	atomic: 100,
};

const afterEachSync = (info) => {
	const entryPath = path.relative(".", info.srcPath);
	console.log(
		styleText("gray", `${info.eventType} ${info.nodeType}`),
		entryPath,
	);
};

console.clear();

console.log(styleText("cyanBright", "Press Ctrl+c to stop watching."));

console.log("Output directory:", styleText("underline", `${bpOutDir}`));

await syncdir("src/bp", bpOutDir, {
	watch: true,
	deleteOrphaned: true,
	chokidarWatchOptions,
	afterEachSync,
});

process.once("SIGINT", () => {
	console.log(styleText("magentaBright", "Stopped watching!"));
	process.exit(0);
});
