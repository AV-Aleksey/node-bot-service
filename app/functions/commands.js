import { bot } from "@app/functions/telegraf";

import config from "@configs/config";

import { getSafeScenarioConfig, scenario, STAGES } from "@configs/scenario";

import { launchPolling, launchWebhook } from "./launcher";

import { send } from "@app/lib/send";

const start = async () => {
	const config = getSafeScenarioConfig(STAGES.start);

	bot.start(async (ctx) => {
		if (config.init.length) {
			for (const element of config.init) {
				await send(ctx, element.type, element.payload, element?.extra);
			}
		}

		if (false && ctx.payload !== "paid") {
			for (const element of config.failed) {
				await send(ctx, element.type, element.payload, element?.extra);
			}
		} else {
			for (const element of config.success) {
				await send(ctx, element.type, element.payload, element?.extra);
			}

			return ctx.scene.enter(STAGES.registration);
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
