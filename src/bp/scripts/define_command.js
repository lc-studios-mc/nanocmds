import * as mc from "@minecraft/server";

/**
 * @callback CommandCallback
 * @param {mc.CustomCommandOrigin} origin
 * @param {...any} args
 * @returns {mc.CustomCommandResult|undefined}
 */

/**
 * Defines a command callback function.
 * @param {CommandCallback} callback - The callback function to define.
 * @returns {CommandCallback} The same callback function.
 */
export const defineCommandCallback = (callback) => callback;
