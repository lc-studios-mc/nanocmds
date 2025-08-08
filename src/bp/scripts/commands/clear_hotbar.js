import * as mc from "@minecraft/server";
import { defineCommandCallback } from "../define-command.js";
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
		const container = player.getComponent("inventory")?.container;
		if (!container)
			throw new Error("Failed to get the player's inventory container object.");

		for (let i = 0; i < 9; i++) {
			container.setItem(i, undefined);
		}

		player.playSound("fire.ignite", { location: player.location });
		player.onScreenDisplay.setActionBar("Cleared your hotbar.");
	});
});

mc.system.beforeEvents.startup.subscribe(({ customCommandRegistry }) => {
	customCommandRegistry.registerCommand(
		{
			name: "n:c",
			description: prefixCommandDescription("Clears items from your hotbar."),
			permissionLevel: mc.CommandPermissionLevel.Admin,
			cheatsRequired: true,
		},
		callback,
	);
});
