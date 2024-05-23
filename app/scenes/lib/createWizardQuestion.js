import { Markup } from "telegraf";

export const createWizardQuestion = async (ctx, params) => {
	const { question, answers } = params;

	await ctx.reply(
		question.text,
		Markup.inlineKeyboard(
			answers.map((data) => Markup.button.callback(data.text, data.data)),
		),
	);
};
