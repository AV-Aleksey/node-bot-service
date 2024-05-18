import { Scenes } from "telegraf";

export const step_one = new Scenes.WizardScene(
	"stage_1",
	async (ctx) => {
		await ctx.reply("Привет! Начнем наше обучение!");

		ctx.wizard.state.timeoutId = setTimeout(() => {
			ctx.reply("Извините но время вышло :(");
			ctx.scene.leave();
			ctx.scene.enter("stage_1");
		}, 1000000);

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
