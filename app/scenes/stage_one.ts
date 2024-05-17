import { Scenes } from "telegraf";

export const step_one = new Scenes.WizardScene<Scenes.WizardContext>(
	"stage_1",
	async (ctx) => {
		await ctx.reply("stage_1 - Step 1");

		return ctx.wizard.next();
	},
	async (ctx) => {
		await ctx.reply("stage_1 - Step 3");

		return ctx.wizard.next();
	},
	async (ctx) => {
		await ctx.reply("stage_1 - Done");

		return await ctx.scene.leave();
	},
);
