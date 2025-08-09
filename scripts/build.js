import path from "node:path";
import { parseArgs, styleText } from "node:util";
import fs from "node:fs";
import { async as syncdir } from "sync-directory";
import rawManifest from "../src/bp/manifest.json" with { type: "json" };
import { zipDirectory } from "./utils.js";

const args = parseArgs({
	args: process.argv.slice(2),
	options: {
		version: {
			short: "v",
			type: "string",
		},
	},
});

const version = args.values.version;

if (version === undefined) {
	throw new Error("--version is undefined");
}

if (!/^\d+\.\d+\.\d+$/.test(version)) {
	throw new Error("Invalid version string pattern");
}

const versionArray = version.split(".").map((v) => Number(v));

const bpOutDir = path.join("dist", `nanocmds-${args.values.version}`);
const mcpackFile = path.join("dist", `nanocmds-${args.values.version}.mcpack`);

if (fs.existsSync(bpOutDir)) {
	await fs.promises.rm(bpOutDir, { recursive: true });
	console.log("Removed previous build directory");
}

if (fs.existsSync(mcpackFile)) {
	await fs.promises.rm(mcpackFile, { recursive: true });
	console.log("Removed previous build file");
}

await syncdir("src/bp", bpOutDir, {
	watch: false,
	deleteOrphaned: false,
	chokidarWatchOptions: {
		awaitWriteFinish: {
			stabilityThreshold: 300,
			pollInterval: 100,
		},
		atomic: 100,
	},
	exclude: /\.tsx?$/,
});

console.log("Synced directory");

const manifestToWrite = JSON.parse(JSON.stringify(rawManifest));

manifestToWrite.header.name = manifestToWrite.header.name.replace(
	"DEV",
	`v${version}`,
);
manifestToWrite.header.version = versionArray;

await fs.promises.writeFile(
	path.join(bpOutDir, "manifest.json"),
	JSON.stringify(manifestToWrite, null, 2),
	{ encoding: "utf8" },
);

console.log("Generated manifest.json");

await zipDirectory(bpOutDir, mcpackFile);

console.log("Generated mcpack file");

console.log(styleText("magentaBright", "Build finished!"));

process.exit(0);
