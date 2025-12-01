import * as builder from "@mcbe-toolbox-lc/builder";
import packageConfig from "../package.json" with { type: "json" };
import path from "node:path";

// Important environment variables

const isDev = Boolean(builder.getEnv("DEV"));

const version = builder.getEnvWithFallback("VERSION", "0.0.1");
const versionArray = builder.parseVersionString(version); // e.g., [0, 0, 1]
const versionLabel = "v" + versionArray.join("."); // e.g., "v0.0.1"

const shouldWatch = Boolean(builder.getEnv("WATCH")); // Whether to watch for file changes and rebuild

// Manifest is defined similarly to the traditional method:
// https://learn.microsoft.com/en-us/minecraft/creator/reference/content/addonsreference/packmanifest?view=minecraft-bedrock-stable
//
// Except that we have the power of scripting here!
// These manifest objects are later stringified to JSON.

const addonNameLabel = "NanoCmds"; // Human-readable name
const addonNameSlug = "nanocmds"; // Directory name slug
const minEngineVersion = [1, 21, 110];
const minecraftPackageVersions = builder.getMinecraftPackageVersions(packageConfig);

// https://www.uuidgenerator.net/version4
const uuids = {
	bpHeader: "996fccab-67f8-4ca6-a384-9f1bd58194b6",
	bpDataModule: "cfe8a222-2757-40c1-83f8-44c3ba7c1d3c",
	bpScriptsModule: "f4700334-afc1-4fc5-ae42-d35dcdd11a3d", // Should match the "targetModuleUuid" field in .vscode/launch.json
} as const;

const bpManifest = {
	format_version: 2,
	header: {
		name: `${addonNameLabel} ${isDev ? "DEV" : versionLabel}`,
		description: "Simple, small, and powerful commands with minimal keystrokes!",
		uuid: uuids.bpHeader,
		version: versionArray,
		min_engine_version: minEngineVersion,
	},
	modules: [
		{
			type: "data",
			uuid: uuids.bpDataModule,
			version: versionArray,
		},
		{
			language: "javascript",
			type: "script",
			uuid: uuids.bpScriptsModule,
			version: versionArray,
			entry: "scripts/index.js",
		},
	],
	dependencies: [
		{
			module_name: "@minecraft/server",
			version: minecraftPackageVersions["@minecraft/server"].replace("^", ""),
		},
		{
			module_name: "@minecraft/server-ui",
			version: minecraftPackageVersions["@minecraft/server-ui"].replace("^", ""),
		},
	],
};

// Define build target paths

const bpTargetDirs: string[] = [];
const archiveOptions: builder.ArchiveOptions[] = [];

if (isDev) {
	const devBehaviorPacksDir = builder.getEnvRequired("DEV_BEHAVIOR_PACKS_DIR");

	bpTargetDirs.push("build/dev/bp");
	bpTargetDirs.push(path.join(devBehaviorPacksDir!, `${addonNameSlug}-bp-dev`));
} else {
	const targetPathPrefix = `build/${versionLabel}`;

	bpTargetDirs.push(`${targetPathPrefix}/bp`);

	const archivePath = path.join(targetPathPrefix, `${addonNameSlug}-${versionLabel}`);
	archiveOptions.push({ outFile: `${archivePath}.mcpack` });
	archiveOptions.push({ outFile: `${archivePath}.zip` });
}

// Create a configuration object that will be passed to the build system

const config: builder.ConfigInput = {
	behaviorPack: {
		srcDir: "src/bp",
		targetDir: bpTargetDirs,
		manifest: bpManifest,
		scripts: {
			entry: "src/bp/scripts/index.ts",
			bundle: true,
			sourceMap: isDev,
		},
	},
	watch: shouldWatch,
	archive: archiveOptions,
	// logLevel: "debug",
};

// Build!

await builder.build(config);
