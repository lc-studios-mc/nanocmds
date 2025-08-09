import path from "node:path";
import { homedir } from "node:os";
import fs from "node:fs";
import archiver from "archiver";

/** @returns {{ behaviorPacks: string, resourcePacks: string }} */
export function getDevPackDirs() {
	const comMojang = path.join(
		homedir(),
		"AppData/Local/Packages",
		"Microsoft.MinecraftUWP_8wekyb3d8bbwe",
		"LocalState/games/com.mojang",
	);

	const behaviorPacks = path.join(comMojang, "development_behavior_packs");
	const resourcePacks = path.join(comMojang, "development_resource_packs");

	return {
		behaviorPacks,
		resourcePacks,
	};
}

/**
 * @param {string} sourceDir
 * @param {string} outputPath
 * @returns {Promise<void>}
 */
export const zipDirectory = (sourceDir, outputPath) => {
	return new Promise((resolve, reject) => {
		const output = fs.createWriteStream(outputPath);
		const archive = archiver("zip");

		output.on("close", resolve);
		archive.on("error", reject);

		archive.pipe(output);
		archive.directory(sourceDir, false);
		archive.finalize();
	});
};
