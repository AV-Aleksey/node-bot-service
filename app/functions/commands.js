import { bot } from "@app/functions/telegraf";

import config from "@configs/config";

import { scenario } from "@configs/bot_config";

import { launchPolling, launchWebhook } from "./launcher";

import { send } from "@app/lib/send";

const start = async () => {
	bot.start(async (ctx) => {
		if (scenario.start.init.length) {
			for (const element of scenario.start.init) {
				await send(ctx, element.type, element.payload, element?.extra);
			}
		}

		if (ctx.payload !== "paid") {
			for (const element of scenario.start.failed) {
				await send(ctx, element.type, element.payload, element?.extra);
			}
		} else {
			for (const element of scenario.start.success) {
				await send(ctx, element.type, element.payload, element?.extra);
			}

			return ctx.scene.enter("init");
		}
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
