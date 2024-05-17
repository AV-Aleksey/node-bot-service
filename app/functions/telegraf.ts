import { Telegraf, Scenes, session } from "telegraf";

import configs from "@configs/config";

import { init, step_one } from "@app/scenes";

const bot = new Telegraf<Scenes.WizardContext>(configs.telegram.token);

const stage = new Scenes.Stage([init, step_one]);

bot.use(session());

bot.use(stage.middleware());

export { bot };
export default bot;
