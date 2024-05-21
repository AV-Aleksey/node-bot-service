import { scenario, STAGES } from "@configs/scenario";

export const getSafeScenarioConfig = (name) => {
	if (name === STAGES.start) {
		return {
			...scenario[name],
		};
	}

	if (name === STAGES.registration) {
		const config = {
			...scenario[name],
		};

		const defaultTexts = {
			settings: {
				confirm: Boolean(config.settings?.confirm),
			},
			confirm: {
				confirm_question_text:
					config.confirm?.confirm_question_text ||
					"Необходимо сверить данные",
				confirm_question_button_text:
					config.confirm?.confirm_question_button_text ||
					"Давай сверим",
				confirm_show_data_text: "Верно ли введены данные ?",
				confirm_ok_button_text:
					config.confirm?.confirm_ok_button_text || "Подтвердить",
				confirm_cancel_button_text:
					config.confirm?.confirm_cancel_button_text || "Изменить",
				confirm_success_text: "Отлично! Можем идти дальше! Готов?",
				confirm_success_ok_button: "Всегда готов!",
			},
		};

		return { ...config, ...defaultTexts };
	}

	throw `Неудалось загрузить конфигурацию для ${name}, проверьте файл app/configs/scenario`;
};
