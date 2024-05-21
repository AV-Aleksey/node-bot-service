import { Markup } from "telegraf";

export const removeButtons = (ctx) => {
	try {
		return ctx.editMessageReplyMarkup(Markup.inlineKeyboard([]));
	} catch (e) {
		console.log("неудалось удалить кнопки", e);
	}
};
