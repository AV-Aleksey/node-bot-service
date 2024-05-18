import { Markup } from "telegraf";

export const createWizardQuestion = async (ctx, params, runNext = true) => {
	const { question, answers } = params;

	if (ctx.message && "text" in ctx.message) {
		await ctx.reply(
			question.text,
			Markup.inlineKeyboard(
				answers.map((data) =>
					Markup.button.callback(data.text, data.data),
				),
			),
		);

		if (question.stateKey) {
			ctx.wizard.state[question.stateKey] = ctx.message.text;
		}

		if (runNext) {
			return ctx.wizard.next();
		}
	}
};
