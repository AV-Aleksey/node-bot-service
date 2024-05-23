import { Scenes } from "telegraf";
import { STAGES } from "@configs/scenario";
import { createWizardQuestion } from "@app/scenes/lib/createWizardQuestion";
import { objToStringF } from "@app/lib/objToStringF";
import { removeButtons } from "@app/scenes/lib/removeButtons";

const stepInit = async (ctx) => {
	await ctx.reply(
		"Присылай свою электронную почту, на которую был сделан заказ, — найду тебя в своей базе",
	);
	ctx.wizard.next();
};

const stepConfirm = async (ctx) => {
	ctx.wizard.state["email"] = ctx.message?.text;

	const message = objToStringF(
		{ email: ctx.message?.text },
		"Проверь, все ли верно?",
	);

	await createWizardQuestion(ctx, {
		question: { text: message },
		answers: [
			{
				text: "Все в порядке",
				data: "success",
			},
			{
				text: "Изменить",
				data: "refused",
			},
		],
	});

	ctx.wizard.next();
};

const stepFinish = async (ctx) => {
	await removeButtons(ctx);

	const success = true;

	if (ctx.callbackQuery?.data === "refused") {
		await ctx.scene.leave();

		return ctx.scene.enter(STAGES.verification, {
			payload: ctx.wizard.state?.payload,
		});
	}

	if (success) {
		const payload = {
			id: 1,
			...ctx.wizard.state?.payload,
			email: ctx.wizard.state?.email,
		};

		await ctx.reply("Отлично! Все получилось, приступаем к стажировке.");

		return ctx.scene.leave();
	} else {
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
