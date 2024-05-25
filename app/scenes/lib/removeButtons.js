import { Markup } from "telegraf";

export const removeButtons = async (ctx) => {
	try {
		const keyboard = Markup.inlineKeyboard([]);

		await ctx?.editMessageReplyMarkup(keyboard);
	} catch (e) {
		console.log("неудалось удалить кнопки", e);
	}
};
