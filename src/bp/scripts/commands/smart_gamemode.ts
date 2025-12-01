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
		const currentGameMode = player.getGameMode();

		if (currentGameMode === mc.GameMode.Spectator) {
			let gameModeBeforeEnteringSpectator = player.getDynamicProperty(
				"gameModeBeforeEnteringSpectator",
			);

			if (typeof gameModeBeforeEnteringSpectator !== "string")
				gameModeBeforeEnteringSpectator = undefined;

			// @ts-ignore
			player.setGameMode(gameModeBeforeEnteringSpectator);
			player.playSound("random.pop", { location: player.location, pitch: 0.9 });
			player.onScreenDisplay.setActionBar("Exited the Spectator game mode.");
		} else {
			player.setGameMode(mc.GameMode.Spectator);
			player.playSound("random.pop", { location: player.location, pitch: 1.2 });
			player.onScreenDisplay.setActionBar("Entered the Spectator game mode.");
		}
	});
});

mc.system.beforeEvents.startup.subscribe(({ customCommandRegistry }) => {
	customCommandRegistry.registerCommand(
		{
			name: "n:s",
			description: prefixCommandDescription("Toggles the spectator game mode."),
			permissionLevel: mc.CommandPermissionLevel.Admin,
			cheatsRequired: true,
		},
		callback,
	);
});

mc.world.beforeEvents.playerGameModeChange.subscribe((e) => {
	if (e.toGameMode === mc.GameMode.Spectator && e.fromGameMode !== mc.GameMode.Spectator) {
		e.player.setDynamicProperty("gameModeBeforeEnteringSpectator", e.fromGameMode);
		return;
	}

	if (e.toGameMode !== mc.GameMode.Spectator) {
		e.player.setDynamicProperty("gameModeBeforeEnteringSpectator", undefined);
	}
});
