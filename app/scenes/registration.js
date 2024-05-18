import { Scenes } from "telegraf";

import { getSafeScenarioConfig, STAGES } from "@configs/bot_config";

import { send } from "@app/lib/send";

import { createWizardQuestion } from "@app/scenes/lib/createWizardQuestion";

const config = getSafeScenarioConfig(STAGES.registration);

export const registration = new Scenes.WizardScene(
	STAGES.registration,
	async (ctx) => {
		for (const element of config?.init) {
			await send(ctx, element.type, element.payload);
		}

		const firstQuestion = config.questions?.[0];

		await send(ctx, firstQuestion.type, firstQuestion.text);

		return ctx.wizard.next();
	},
	...config.questions.slice(1).map((question, index) => {
		return async (ctx) => {
			await send(ctx, question.type, question.text);

			const key = config.questions?.[index]?.key;

			if (typeof key === "string" && "text" in ctx.message) {
				ctx.wizard.state[key] = ctx.message.text;
			}

			ctx.wizard.next();
		};
	}),
	async (ctx) => {
		const key = config.questions.at(-1)?.key;

		if (typeof key === "string" && "text" in ctx.message) {
			ctx.wizard.state[key] = ctx.message.text;
		}

		const shouldConfirm = config.questions.some(
			(item) => item.confirm === true,
		);

		const params = shouldConfirm
			? {
					question: {
						text: "Отлично! Теперь давай сверим данные :)",
					},
					answers: [{ text: "Давай сверим", data: "confirm" }],
			  }
			: {
					question: {
						text: "Отлично! Можем идти дальше! Готов?",
					},
					answers: [{ text: "Всегда готов!", data: "next" }],
			  };

		await createWizardQuestion(ctx, params);
	},
	async (ctx) => {
		if (ctx.callbackQuery?.data === "confirm") {
			const formattedString = Object.entries(ctx.wizard.state)
				.map(([key, value]) => `${key}: ${value}`)
				.join("\n");

			await createWizardQuestion(ctx, {
				question: {
					text: `
					Верно ли введены данные ?
					${formattedString}
					`,
				},
				answers: [
					{ text: "Подтвердить", data: "success" },
					{ text: "Изменить", data: "refused" },
				],
			});
		}
	},
	async (ctx) => {
		if (ctx.callbackQuery?.data === "refused") {
			await ctx.scene.leave();
			await ctx.scene.enter(STAGES.registration);
		} else {
			await ctx.reply("Сохранение данных...");

			return await ctx.scene.leave();
		}
	},
);
