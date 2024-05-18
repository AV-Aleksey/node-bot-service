import { Telegraf, Scenes, session } from "telegraf";

import configs from "@configs/config";

import { stages } from "@app/scenes";

const bot = new Telegraf(configs.telegram.token);

bot.use(session());

bot.use(stages.middleware());

export { bot };

export default bot;
