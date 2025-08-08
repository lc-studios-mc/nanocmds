import type {
	CustomCommandOrigin,
	CustomCommandResult,
} from "@minecraft/server";

type CommandCallback = (
	origin: CustomCommandOrigin,
	...args: any[]
) => CustomCommandResult | undefined;

declare const defineCommandCallback: (
	callback: CommandCallback,
) => CommandCallback;
