import { Scenes } from "telegraf";

import { STAGES, getSafeScenarioConfig } from "@configs/scenario";

import { send } from "@app/lib/send";

import { createWizardQuestion } from "@app/scenes/lib/createWizardQuestion";

import { objToStringF } from "@app/lib/objToStringF";

import { removeButtons } from "@app/scenes/lib/removeButtons";

const config = getSafeScenarioConfig(STAGES.registration);

const stepInit = async (ctx) => {
	for (const element of config?.init) {
		await send(ctx, element.type, element.payload);
	}

	const firstQuestion = config.questions?.[0];

	await send(ctx, firstQuestion.type, firstQuestion.text);

	return ctx.wizard.next();
};

const stepQuestions = config.questions.slice(1).map((question, index) => {
	return async (ctx) => {
		await send(ctx, question.type, question.text);

		const key = config.questions?.[index]?.key;

		if (typeof key === "string" && ctx.message?.text) {
			ctx.wizard.state[key] = ctx.message.text;
		}

		ctx.wizard.next();
	};
});

const stepConfirm = config.settings.confirm
	? [
			async (ctx) => {
				const key = config.questions.at(-1)?.key;

				if (typeof key === "string" && ctx.message?.text) {
					ctx.wizard.state[key] = ctx.message.text;
				}

				await createWizardQuestion(ctx, {
					question: {
						text: config.confirm.confirm_question_text,
					},
					answers: [
						{
							text: config.confirm.confirm_question_button_text,
							data: "confirm",
						},
					],
				});

				ctx.wizard.next();
			},
			async (ctx) => {
				await removeButtons(ctx);

				await createWizardQuestion(ctx, {
					question: {
						text: objToStringF(
							ctx.wizard.state,
							config.confirm.confirm_show_data_text,
						),
					},
					answers: [
						{
							text: config.confirm.confirm_ok_button_text,
							data: "success",
						},
						{
							text: config.confirm.confirm_cancel_button_text,
							data: "refused",
						},
					],
				});

				ctx.wizard.next();
			},
	  ]
	: [
			async (ctx) => {
				const key = config.questions.at(-1)?.key;

				if (typeof key === "string" && ctx.message?.text) {
					ctx.wizard.state[key] = ctx.message.text;
				}

				await createWizardQuestion(ctx, {
					question: {
						text: config.confirm.confirm_success_text,
					},
					answers: [
						{
							text: config.confirm.confirm_success_ok_button,
							data: "success",
						},
					],
				});

				ctx.wizard.next();
			},
	  ];

const stepFinish = async (ctx) => {
	await removeButtons(ctx);

	if (ctx.callbackQuery?.data === "refused") {
		await ctx.scene.leave();

		return ctx.scene.enter(STAGES.registration);
	}

	await ctx.scene.leave();

	return ctx.scene.enter(STAGES.verification, { payload: ctx.wizard.state });
};

export const registration = new Scenes.WizardScene(
	STAGES.registration,
	stepInit,
	...stepQuestions,
	...stepConfirm,
	stepFinish,
);
