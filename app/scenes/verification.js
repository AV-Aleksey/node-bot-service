import { Scenes } from "telegraf";

import { STAGES } from "@configs/scenario";

import { removeButtons } from "@app/scenes/lib/removeButtons";

import { baseConfirm } from "@app/scenes/components/baseConfirm";

const stepInit = async (ctx) => {
	await ctx.reply(
		"Присылай свою электронную почту, на которую был сделан заказ, — найду тебя в своей базе",
	);
	ctx.wizard.next();
};

const stepConfirm = baseConfirm("Проверь, все ли верно?", "email");

const stepFinish = async (ctx) => {
	await removeButtons(ctx);

	if (ctx.callbackQuery?.data === "refused") {
		await ctx.scene.leave();

		return ctx.scene.enter(STAGES.verification, {
			payload: ctx.wizard.state?.payload,
		});
	}

	try {
		/* Тут вызываем запрос к базе данных*/
		const success = true;

		if (success) {
			const payload = {
				id: ctx.from.id,
				...ctx.wizard.state?.payload,
				email: ctx.wizard.state?.email,
			};

			console.log("query to db", payload);

			await ctx.reply(
				"Отлично! Все получилось, приступаем к стажировке.",
			);

			return ctx.scene.leave();
		}
	} catch (e) {
		await ctx.reply("Что-то не вижу твой e-mail в базе 🙁");

		await ctx.scene.leave();

		return ctx.scene.enter(STAGES.registration, { ...ctx.state });
	}
};

export const verification = new Scenes.WizardScene(
	STAGES.verification,
	stepInit,
	stepConfirm,
	stepFinish,
);
