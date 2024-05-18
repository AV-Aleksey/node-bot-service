import { Markup } from "telegraf";

export const createWizardQuestion = async (ctx, params, runNext = true) => {
	const { question, answers } = params;

	await ctx.reply(
		question.text,
		Markup.inlineKeyboard(
			answers.map((data) => Markup.button.callback(data.text, data.data)),
		),
	);

	if (runNext) {
		return ctx.wizard.next();
	}
};
