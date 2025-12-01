import * as mc from "@minecraft/server";
import { defineCommandCallback } from "../utils/define_command.js";
import { prefixCommandDescription } from "../utils/misc.js";

const callback = defineCommandCallback((origin) => {
	const player = origin.sourceEntity;
	if (!(player instanceof mc.Player)) {
		return {
			status: mc.CustomCommandStatus.Failure,
			message: "Only a player can run this command.",
		};
	}

	mc.system.run(() => {
		const result = player.runCommand("kill @e[type=item]");

		player.onScreenDisplay.setActionBar(`Killed ${result.successCount} item entities.`);

		player.playSound("random.burp", {
			location: player.location,
			pitch: 1.2,
		});
	});
});

mc.system.beforeEvents.startup.subscribe(({ customCommandRegistry }) => {
	customCommandRegistry.registerCommand(
		{
			name: "n:x",
			description: prefixCommandDescription(
				"Kill all floating items in the world. Alias for /kill @e[type=item]",
			),
			permissionLevel: mc.CommandPermissionLevel.Admin,
			cheatsRequired: true,
		},
		callback,
	);
});
