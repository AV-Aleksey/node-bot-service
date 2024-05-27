import { Markup, Scenes } from "telegraf";

import fs from "fs";

import { ASSETS_PATH } from "@app/consts/paths";

import { removeButtons } from "@app/scenes/lib/removeButtons";

const BUTTONS = {
	success: { text: "Погнали!", data: "success" },
	error: { text: "Перезапустить!", data: "error" },
};

export const stage = new Scenes.WizardScene(
	"stage_1",
	async (ctx) => {
		const stream = fs.createReadStream(`${ASSETS_PATH}/IMG_5343.mp4`);

		stream.on("error", async () => {
			await ctx.reply(
				"Проблемы с загрузкой :(",
				Markup.inlineKeyboard([
					Markup.button.callback(
						BUTTONS.error.text,
						BUTTONS.error.data,
					),
				]),
			);
		});

		stream.on("ready", async () => {
			await ctx.sendVideoNote({ source: stream });

			await ctx.reply(
				"Дай знать как будешь готов идти дальше",
				Markup.inlineKeyboard([
					Markup.button.callback(
						BUTTONS.success.text,
						BUTTONS.success.data,
					),
				]),
			);
		});

		ctx.wizard.state.onNext = async (_ctx) => {
			const key = _ctx.callbackQuery?.data;

			await removeButtons(_ctx);

			await ctx.sendMessage(`💬: ${BUTTONS[key]?.text}`);

			return key !== "error";
		};

		return ctx.wizard.next();
	},
	async (ctx) => {
		const shouldStartNext = await ctx.wizard.state.onNext(ctx);

		if (!shouldStartNext) {
			return await ctx.scene.reenter();
		} else {
			return await ctx.scene.leave();
		}
	},
);
