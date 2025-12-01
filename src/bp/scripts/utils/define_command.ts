import * as mc from "@minecraft/server";

export type CommandCallback = (
	origin: mc.CustomCommandOrigin,
	...args: any[]
) => mc.CustomCommandResult | undefined;

/**
 * Defines a command callback function.
 * @param callback - The callback function to define.
 * @returns The same callback function.
 */
export const defineCommandCallback = (callback: CommandCallback) => callback;
