import { SEND_TYPES } from "@configs/bot_config";

export const send = async (ctx, type, payload, extra = {}) => {
	if (type === SEND_TYPES.message) {
		await ctx.reply(payload);
	}

	if (type === SEND_TYPES.photo) {
		await ctx.replyWithPhoto(payload, extra);
	}

	if (type === SEND_TYPES.video) {
		await ctx.replyWithVideo(payload, extra);
	}
};
