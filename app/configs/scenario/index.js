export { getSafeScenarioConfig } from "./lib/getSafeScenarioConfig";

export const SEND_TYPES = {
	message: "message",
	photo: "photo",
	video: "video",
};

export const STAGES = {
	start: "start",
	registration: "registration",
};

export const scenario = {
	[STAGES.start]: {
		init: [
			{
				type: "message",
				payload: "Привет тебе от бота!",
			},
		],
		success: [
			{
				type: "message",
				payload: "Давай знакомится!",
			},
		],
		failed: [
			{
				type: "message",
				payload: "Извини но похоже тебе нужно оплатить доступ :(",
			},
		],
	},
	[STAGES.registration]: {
		init: [
			{
				type: "message",
				payload: "Заполни инфу о себе)",
			},
		],
		questions: [
			{
				key: "name",
				type: "message",
				text: "Как тебя зовут ?",
			},
			{
				key: "age",
				type: "message",
				text: "Какой возраст ?",
			},
		],
		confirm: {
			confirm_question_text: "Отлично! Теперь давай сверим данные",
			confirm_question_button_text: "Давай сверим",
			confirm_ok_button_text: "Подтвердить",
			confirm_cancel_button_text: "Изменить",
		},
		settings: {
			confirm: false,
		},
	},
};
