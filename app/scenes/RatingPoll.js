import { Scenes } from "telegraf";
import { basePoll } from "@app/scenes/components/basePoll";
import { removeButtons } from "@app/scenes/lib/removeButtons";

export const ratingPoll = new Scenes.WizardScene(
	"ratingPoll",
	basePoll(
		"Полезный сегодня был день. А ты что думаешь?",
		[
			{
				text: "⚡️⚡️⚡️⚡️⚡️",
				data: "5",
			},
			{
				text: "⚡️⚡️⚡️⚡️",
				data: "4",
			},
			{
				text: "⚡️⚡️⚡️️",
				data: "3",
			},
			{
				text: "⚡️️️️⚡️️",
				data: "2",
			},
			{
				text: "⚡️",
				data: "1",
			},
		],
		"rating",
	),
	async (ctx) => {
		await ctx.wizard.state.onNext(ctx.callbackQuery?.data);

		await removeButtons(ctx);

		await ctx.reply(`💬: ${ctx.wizard.state["rating"].text}`);

		await ctx.scene.leave();
	},
);
