import path from "node:path";
import { homedir } from "node:os";

/** @returns {{ behaviorPacks: string, resourcePacks: string }} */
export function getDevPackDirs() {
	const comMojang = path.join(
		homedir(),
		"AppData/Local/Packages",
		"Microsoft.MinecraftUWP_8wekyb3d8bbwe",
		"LocalState/games/com.mojang",
	);

	const devBehaviorPacks = path.join(comMojang, "development_behavior_packs");
	const devResourcePacks = path.join(comMojang, "development_resource_packs");

	const behaviorPacks = path.join(devBehaviorPacks, "nanocmds_bp");
	const resourcePacks = path.join(devResourcePacks, "nanocmds_rp");

	return {
		behaviorPacks,
		resourcePacks,
	};
}
