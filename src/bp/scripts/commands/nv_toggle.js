import * as mc from "@minecraft/server";
import { defineCommandCallback } from "../shared.js";
import { prefixCommandDescription } from "../utils.js";

const callback = defineCommandCallback((origin) => {
	const player = origin.sourceEntity;
	if (!(player instanceof mc.Player)) {
		return {
			status: mc.CustomCommandStatus.Failure,
			message: "Only a player can run this command.",
		};
	}

	mc.system.run(() => {
		const alreadyHasEffect = player.getEffect("night_vision") !== undefined;

		if (alreadyHasEffect) {
			player.removeEffect("night_vision");
			player.onScreenDisplay.setActionBar("Removed the night vision effect.");
			return;
		}

		player.addEffect("night_vision", 20000000, {
			amplifier: 0,
			showParticles: false,
		});

		player.onScreenDisplay.setActionBar("Added the night vision effect.");
	});
});

mc.system.beforeEvents.startup.subscribe(({ customCommandRegistry }) => {
	customCommandRegistry.registerCommand(
		{
			name: "n:v",
			description: prefixCommandDescription("Toggles the night vision effect."),
			permissionLevel: mc.CommandPermissionLevel.Admin,
			cheatsRequired: true,
		},
		callback,
	);
});
