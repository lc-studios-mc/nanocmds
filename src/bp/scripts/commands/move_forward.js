import * as mc from "@minecraft/server";
import { defineCommandCallback } from "../utils/define_command.js";
import { prefixCommandDescription } from "../utils/misc.js";
import { Vec3 } from "../utils/vec3.js";

/**
 * @param {mc.Player} player
 * @param {mc.Vector3} location
 */
const teleport = (player, location) => {
	player.teleport(location);
	player.onScreenDisplay.setActionBar("Moved forward");
	mc.system.runTimeout(() => {
		player.playSound("mob.shulker.teleport", { location: player.location });
	}, 1);
};

const callback = defineCommandCallback((origin) => {
	const player = origin.sourceEntity;
	if (!(player instanceof mc.Player)) {
		return {
			status: mc.CustomCommandStatus.Failure,
			message: "Only a player can run this command.",
		};
	}

	mc.system.run(() => {
		const maxDistance = 100;

		const raycastHit = player.getBlockFromViewDirection();

		if (
			!raycastHit ||
			Vec3.distance(raycastHit.block.center(), player.getHeadLocation()) > 100
		) {
			const tpLocation = new Vec3(Vec3.forward)
				.scale(maxDistance)
				.changeDir(player.getViewDirection())
				.add(player.getHeadLocation()).vec;

			teleport(player, tpLocation);
			return;
		}

		let tpLocation = new Vec3(player.getHeadLocation())
			.sub(raycastHit.block.center())
			.normalize()
			.add(raycastHit.block.center()).vec;

		if (raycastHit.face === mc.Direction.Down) {
			tpLocation = Vec3.sub(tpLocation, { x: 0, y: 1.5, z: 0 });
		}

		teleport(player, tpLocation);
	});
});

mc.system.beforeEvents.startup.subscribe(({ customCommandRegistry }) => {
	customCommandRegistry.registerCommand(
		{
			name: "n:f",
			description: prefixCommandDescription(
				"Moves forward 100 blocks. Stops when the ray hits a block.",
			),
			permissionLevel: mc.CommandPermissionLevel.Admin,
			cheatsRequired: true,
		},
		callback,
	);
});
