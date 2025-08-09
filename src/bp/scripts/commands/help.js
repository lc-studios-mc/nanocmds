import * as mc from "@minecraft/server";
import { defineCommandCallback } from "../utils/define_command.js";
import { prefixCommandDescription } from "../utils/misc.js";
import { ActionFormData } from "@minecraft/server-ui";

/** @param {mc.Player} player */
const showHelpMenu = async (player) => {
	const formData = new ActionFormData();

	formData.body(`Thank you for downloading NanoCmds. I hope you'll like it!`);

	formData.title("NanoCmds");

	formData.header("Prerequisites");

	formData.label(`- Cheats are enabled in this world.
- You have operator permissions.`);

	formData.header("Basics");

	formData.label(
		`Type §b/n:§f in the chat, you should see many commands available.
§eNote: You don't have to type 'n:' before commands.`,
	);

	formData.label(
		`As an exercise, run §b/v§f. You will receive an infinite night vision effect.
Run it again and the effect is gone.`,
	);

	formData.label(`Try some other commands like §b/s§f, §b/f§f, etc.`);

	formData.label(`Short and useful, right? :)`);

	formData.header("Custom Commands");

	formData.label(
		`You can use the command §b/qs§f to set up to 10 (0~9) custom commands.`,
	);

	formData.label(`For example, run §b/qs 0 "say Hello World"§f.
Then, run §b/q 0§f, and you will say Hello World in the chat!`);

	formData.label(`To list all custom commands, run §b/ql§f.`);

	formData.label(
		`To remove a custom command, run §b/qs <index>§f (replace '<index>' with the index of the command you want to remove).`,
	);

	formData.label(`To clear all custom commands, run §b/qxx§f.`);

	formData.button("Have fun");

	await formData.show(player);
};

const callback = defineCommandCallback((origin) => {
	const player = origin.sourceEntity;
	if (!(player instanceof mc.Player)) {
		return {
			status: mc.CustomCommandStatus.Failure,
			message: "Only a player can run this command.",
		};
	}

	mc.system.run(() => {
		showHelpMenu(player);
	});
});

mc.system.beforeEvents.startup.subscribe(({ customCommandRegistry }) => {
	customCommandRegistry.registerCommand(
		{
			name: "n:nanocmds_help",
			description: prefixCommandDescription("Display help menu."),
			permissionLevel: mc.CommandPermissionLevel.Any,
			cheatsRequired: false,
		},
		callback,
	);
});
