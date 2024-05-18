import { bot } from "@app/functions/telegraf";

import config from "@configs/config";

import { bot_config } from "@configs/bot_config";

import { launchPolling, launchWebhook } from "./launcher";

const start = async () => {
	bot.start(async (ctx) => {
		await ctx.reply(bot_config.start.welcome_message);

		// if (ctx.payload === "paid") {
		// 	await ctx.reply(
		// 		`Тебе предстоит узнать много нового! Пользователь с id = ${ctx.from.id}`,
		// 	);
		//
		// 	return ctx.scene.enter("init");
		// }
		//
		// return ctx.reply("Похоже что вы еще не оплатили доступ.");

		return ctx.scene.enter("init");
	});
};

const launch = async () => {
	const mode = config.mode;
	if (mode === "webhook") {
		launchWebhook();
	} else {
		launchPolling();
	}
};

export { launch, start };
export default launch;
