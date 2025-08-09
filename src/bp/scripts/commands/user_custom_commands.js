import * as mc from "@minecraft/server";
import { prefixCommandDescription } from "../utils/misc.js";
import { Vec3 } from "../utils/vec3.js";

const MAX_USER_DEFINED_COMMANDS = 9;

/**
 * @param {number} index
 * @returns {string|undefined}
 */
const validateUserCustomCommandIndex = (index) => {
	const floored = Math.floor(index);
	const isOutOfBounds = floored < 0 || floored > MAX_USER_DEFINED_COMMANDS;

	if (isOutOfBounds)
		return `Index (${index}) is out of bounds. Valid range is 0 to ${MAX_USER_DEFINED_COMMANDS}.`;
};

/**
 * @param {number} index
 * @param {string} [command]
 * @returns {void}
 */
const setUserCustomCommand = (index, command) => {
	const indexValidationErrorMsg = validateUserCustomCommandIndex(index);
	if (indexValidationErrorMsg !== undefined) {
		throw new Error(indexValidationErrorMsg);
	}

	mc.world.setDynamicProperty(`userCustomCommand_${index}`, command?.trim());
};

/**
 * @param {number} index
 * @returns {string|undefined}
 */
const getUserCustomCommand = (index) => {
	const indexValidationErrorMsg = validateUserCustomCommandIndex(index);
	if (indexValidationErrorMsg !== undefined) {
		throw new Error(indexValidationErrorMsg);
	}

	const value = mc.world.getDynamicProperty(`userCustomCommand_${index}`);

	return typeof value !== "string" ? undefined : value;
};

/**
 * @param {string} command
 * @param {{ sourceBlock?: mc.Block; sourceEntity?: mc.Entity }} origin
 * @returns {void}
 */
const runUserCustomCommand = (command, origin) => {
	if (origin.sourceBlock !== undefined) {
		const locString = Vec3.stringify(origin.sourceBlock.center(), 1);
		const actualCommand = `execute positioned ${locString} run ${command}`;
		origin.sourceBlock.dimension.runCommand(actualCommand);
		return;
	}

	if (origin.sourceEntity !== undefined) {
		origin.sourceEntity.runCommand(command);
		return;
	}

	const fallbackDimension = mc.world.getDimension("overworld");
	fallbackDimension.runCommand(command);
};

/**
 * @param {string} command
 * @param {{ sourceBlock?: mc.Block; sourceEntity?: mc.Entity }} origin
 * @returns {void}
 */
const runUserCustomCommandSafe = (command, origin) => {
	try {
		runUserCustomCommand(command, origin);
	} catch (error) {
		// @ts-expect-error
		console.error(error);

		if (origin.sourceEntity instanceof mc.Player) {
			origin.sourceEntity.sendMessage(`§c${error}`);
		}
	}
};

mc.system.beforeEvents.startup.subscribe(({ customCommandRegistry }) => {
	customCommandRegistry.registerCommand(
		{
			name: `n:q`,
			description: prefixCommandDescription(`Runs a user custom command.`),
			permissionLevel: mc.CommandPermissionLevel.Any,
			cheatsRequired: true,
			mandatoryParameters: [
				{
					name: "index",
					type: mc.CustomCommandParamType.Integer,
				},
			],
		},
		(origin, /** @type {number} */ index) => {
			const indexValidationErrorMsg = validateUserCustomCommandIndex(index);
			if (indexValidationErrorMsg !== undefined) {
				return {
					status: mc.CustomCommandStatus.Failure,
					message: indexValidationErrorMsg,
				};
			}

			const command = getUserCustomCommand(index);

			if (command === undefined) {
				return {
					status: mc.CustomCommandStatus.Failure,
					message: `Command ${index} is undefined.`,
				};
			}

			mc.system.run(() => {
				runUserCustomCommandSafe(command, origin);
			});

			return {
				status: mc.CustomCommandStatus.Success,
				message: `Sent a request to run command ${index} '${command}'`,
			};
		},
	);

	customCommandRegistry.registerCommand(
		{
			name: `n:qs`,
			description: prefixCommandDescription(
				`Sets a user custom command. You can remove one by leaving the parameter 'command' unspecified.`,
			),
			permissionLevel: mc.CommandPermissionLevel.Any,
			cheatsRequired: true,
			mandatoryParameters: [
				{
					name: "index",
					type: mc.CustomCommandParamType.Integer,
				},
			],
			optionalParameters: [
				{
					name: "command",
					type: mc.CustomCommandParamType.String,
				},
			],
		},
		(
			origin,
			/** @type {number} */ index,
			/** @type {string|undefined} */ command,
		) => {
			const indexValidationErrorMsg = validateUserCustomCommandIndex(index);
			if (indexValidationErrorMsg !== undefined) {
				return {
					status: mc.CustomCommandStatus.Failure,
					message: indexValidationErrorMsg,
				};
			}

			command = command?.trim();

			setUserCustomCommand(index, command);

			let message;
			if (command === undefined || command === "") {
				message = `Removed user custom command ${index}.`;
			} else {
				message = `Set user custom command ${index} to: '${command}'`;
			}

			return {
				status: mc.CustomCommandStatus.Success,
				message,
			};
		},
	);

	customCommandRegistry.registerCommand(
		{
			name: `n:qxx`,
			description: prefixCommandDescription(`Clears all user custom commands.`),
			permissionLevel: mc.CommandPermissionLevel.Any,
			cheatsRequired: true,
		},
		(origin) => {
			for (let i = 0; i <= MAX_USER_DEFINED_COMMANDS; i++) {
				setUserCustomCommand(i, undefined);
			}

			return {
				status: mc.CustomCommandStatus.Success,
				message: "Removed all user custom commands.",
			};
		},
	);

	customCommandRegistry.registerCommand(
		{
			name: `n:ql`,
			description: prefixCommandDescription(
				`Logs a user custom command. You can list all entries by leaving the parameter 'index' unspecified.`,
			),
			permissionLevel: mc.CommandPermissionLevel.Any,
			cheatsRequired: true,
			optionalParameters: [
				{
					name: "index",
					type: mc.CustomCommandParamType.Integer,
				},
			],
		},
		(origin, /** @type {number|undefined} */ index) => {
			if (index === undefined) {
				let message = "";

				for (let i = 0; i <= MAX_USER_DEFINED_COMMANDS; i++) {
					const command = getUserCustomCommand(i);
					if (message !== "") message += "\n";
					message += `§7${i}: §f${command}`;
				}

				return {
					status: mc.CustomCommandStatus.Success,
					message,
				};
			}

			const indexValidationErrorMsg = validateUserCustomCommandIndex(index);
			if (indexValidationErrorMsg !== undefined) {
				return {
					status: mc.CustomCommandStatus.Failure,
					message: indexValidationErrorMsg,
				};
			}

			const command = getUserCustomCommand(index);

			const message = `§7${index}: §f${command}`;

			return {
				status: mc.CustomCommandStatus.Success,
				message,
			};
		},
	);
});
