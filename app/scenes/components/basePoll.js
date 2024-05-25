import { Markup } from "telegraf";

export const basePoll = (question, answers, key) => {
	return async (ctx) => {
		await ctx.reply(
			question,
			Markup.inlineKeyboard(
				answers.map(({ text, data }) =>
					Markup.button.callback(text, data),
				),
				{
					columns: 1,
				},
			),
		);

		ctx.wizard.state.onNext = async (data) => {
			ctx.wizard.state[key] = answers.find((item) => item.data === data);
		};

		await ctx.wizard.next();
	};
};
