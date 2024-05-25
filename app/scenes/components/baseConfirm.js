import { objToStringF } from "@app/lib/objToStringF";

import { createWizardQuestion } from "@app/scenes/lib/createWizardQuestion";

import { removeButtons } from "@app/scenes/lib/removeButtons";

export const baseConfirm = (question, key) => {
	return async (ctx) => {
		await removeButtons(ctx);

		ctx.wizard.state[key] = ctx.message?.text;

		const message = objToStringF({ [key]: ctx.message?.text }, question);

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
};
