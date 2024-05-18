import { Scenes } from "telegraf";
import { createWizardQuestion } from "@app/scenes/lib/createWizardQuestion";

export const init = new Scenes.WizardScene(
	"init",
	async (ctx) => {
		await ctx.reply("Напишите ваше имя");

		return ctx.wizard.next();
	},
	...[1, 2].map((i) => {
		if (i === 1) {
			return async (ctx) => {
				await createWizardQuestion(ctx, {
					question: {
						text: `Подтвердите ваше имя ?`,
						stateKey: "name",
					},
					answers: [
						{ text: "Подтвердить", data: "confirm" },
						{ text: "Изменить", data: "refused" },
					],
				});
			};
		}

		if (i === 2) {
			return async (ctx) => {
				await ctx.editMessageReplyMarkup({ inline_keyboard: [] });

				if (ctx.callbackQuery?.data === "confirm") {
					await ctx.reply(
						`Приятно познакомится! ${ctx.wizard.state["name"]}`,
					);

					return ctx.wizard.next();
				}

				await ctx.reply("Уточните ваше имя");

				return ctx.wizard.back();
			};
		}
	}),

	async (ctx) => {
		await ctx.reply("Done");
		ctx.scene.enter("stage_1");

		return await ctx.scene.leave();
	},
);

// const x = {
// 	meta: {
//
// 	},
// 	stages: {
// 		intro: [{ text: "Привет, давай познакомимся!" }],
// 		action: [{ text: "Как тебя зовут ?", key: "name" }],
// 		question: {
// 			text: "Верно ли указано имя?",
// 			answers: [
// 				{ text: "Да, все верно!", key: "confirm" },
// 				{ text: "Нет", key: "refused" },
// 			],
// 		},
// 		final: [{ text: "Приятно познакомится! Поехали дальше!" }],
// 	},
// };
