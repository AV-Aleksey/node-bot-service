import { Markup, Scenes } from "telegraf";

export const init = new Scenes.WizardScene<Scenes.WizardContext>(
	"init",
	async (ctx) => {
		await ctx.reply("Напишите ваше имя");

		return ctx.wizard.next();
	},
	async (ctx) => {
		if (ctx.message && "text" in ctx.message) {
			await ctx.reply(
				`Подтвердите ваше имя: ${ctx.message.text} ?`,
				Markup.inlineKeyboard([
					Markup.button.callback("Подтвердить", "confirm"),
					Markup.button.callback("Изменить", "change"),
				]),
			);
			return ctx.wizard.next();
		}
	},
	async (ctx) => {
		await ctx.editMessageReplyMarkup({ inline_keyboard: [] });

		if (
			ctx.callbackQuery &&
			"data" in ctx.callbackQuery &&
			ctx.callbackQuery.data === "confirm"
		) {
			await ctx.reply("Приятно познакомится!");
			return ctx.wizard.next();
		}

		await ctx.reply("Уточните ваше имя");

		return ctx.wizard.back();
	},
	async (ctx) => {
		await ctx.reply("Укажите ваш пол");

		return ctx.wizard.next();
	},
	async (ctx) => {
		await ctx.reply("Done");
		ctx.scene.enter("stage_1");

		return await ctx.scene.leave();
	},
);
