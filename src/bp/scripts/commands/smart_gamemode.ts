import * as mc from "@minecraft/server";
import { defineCommandCallback } from "../utils/define_command.js";
import { prefixCommandDescription } from "../utils/misc.js";

type GameModeAlias = keyof typeof gameModeAliasToGameMode;

const gameModeAliasToGameMode: Readonly<Record<string, mc.GameMode>> = {
	0: mc.GameMode.Survival,
	survival: mc.GameMode.Survival,
	s: mc.GameMode.Survival,

	1: mc.GameMode.Creative,
	creative: mc.GameMode.Creative,
	c: mc.GameMode.Creative,

	2: mc.GameMode.Adventure,
	adventure: mc.GameMode.Adventure,
	a: mc.GameMode.Adventure,

	3: mc.GameMode.Spectator,
	spectator: mc.GameMode.Spectator,
	sp: mc.GameMode.Spectator,
};

const isGameModeAlias = (value: unknown): value is GameModeAlias => {
	if (value == null) return false;
	if (typeof value !== "string" && typeof value !== "number") return false;
	if (gameModeAliasToGameMode[value] === undefined) return false;
	return true;
};

const callback = defineCommandCallback((origin, arg0) => {
	const player = origin.sourceEntity;
	if (!(player instanceof mc.Player)) {
		return {
			status: mc.CustomCommandStatus.Failure,
			message: "Only a player can run this command.",
		};
	}

	const gameModeArg = arg0 as string | undefined;
	if (gameModeArg !== undefined && !isGameModeAlias(gameModeArg)) {
		return {
			status: mc.CustomCommandStatus.Failure,
			message: `Invalid game mode value: ${gameModeArg}`,
		};
	}

	const desiredGameMode = gameModeArg ? gameModeAliasToGameMode[gameModeArg] : undefined;

	mc.system.run(() => {
		const lastGameMode = player.getDynamicProperty("lastGameMode") as mc.GameMode | undefined;
		const nextGameMode: mc.GameMode = desiredGameMode ?? lastGameMode ?? mc.GameMode.Spectator;

		player.setGameMode(nextGameMode);
		player.playSound("random.pop", { location: player.location, pitch: 0.9 });
		player.onScreenDisplay.setActionBar(`Set game mode to ${nextGameMode.toUpperCase()}`);
	});
});

mc.system.beforeEvents.startup.subscribe(({ customCommandRegistry }) => {
	customCommandRegistry.registerEnum("n:gamemode", Object.keys(gameModeAliasToGameMode));
	customCommandRegistry.registerCommand(
		{
			name: "n:s",
			description: prefixCommandDescription("Smarter alternative to the /gamemode command"),
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
	if (e.fromGameMode === e.toGameMode) return;
	e.player.setDynamicProperty("lastGameMode", e.fromGameMode);
});
