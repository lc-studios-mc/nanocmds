import * as mc from "@minecraft/server";
import { defineCommandCallback } from "../utils/define_command.js";
import { prefixCommandDescription } from "../utils/misc.js";

const callback = defineCommandCallback((origin, gamemodeArg) => {
	const player = origin.sourceEntity;
	if (!(player instanceof mc.Player)) {
		return {
			status: mc.CustomCommandStatus.Failure,
			message: "Only a player can run this command.",
		};
	}

	gamemodeArg = gamemodeArg as string | undefined;

	// TODO: Respect gamemode arg

	mc.system.run(() => {
		const lastGameMode = player.getDynamicProperty("lastGameMode") as mc.GameMode | undefined;
		const nextGameMode: mc.GameMode = lastGameMode ? lastGameMode : mc.GameMode.Spectator;

		player.setGameMode(nextGameMode);
		player.playSound("random.pop", { location: player.location, pitch: 0.9 });
		player.onScreenDisplay.setActionBar("Exited the Spectator game mode.");
	});
});

mc.system.beforeEvents.startup.subscribe(({ customCommandRegistry }) => {
	customCommandRegistry.registerEnum("n:gamemode", [
		"0",
		"1",
		"2",
		"3",
		"survival",
		"creative",
		"adventure",
		"spectator",
	]);

	customCommandRegistry.registerCommand(
		{
			name: "n:s",
			description: prefixCommandDescription("Smarter alternative to /gamemode"),
			permissionLevel: mc.CommandPermissionLevel.Admin,
			cheatsRequired: true,
			optionalParameters: [
				{
					name: "n:gamemode",
					type: mc.CustomCommandParamType.Enum,
				},
			],
		},
		callback,
	);
});

mc.world.beforeEvents.playerGameModeChange.subscribe((e) => {
	e.player.setDynamicProperty("lastGameMode", e.fromGameMode);
});
