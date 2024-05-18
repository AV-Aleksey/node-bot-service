export const SEND_TYPES = {
	message: "message",
	photo: "photo",
	video: "video",
};

export const STAGES = {
	start: "start",
	registration: "registration",
};

export const getSafeScenarioConfig = (name) => {
	if (!scenario?.[name]) {
		throw `Неудалось загрузить конфигурацию для ${name}, проверьте файл app/configs/bot_config.js`;
	} else {
		return scenario[name];
	}
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
				confirm: true,
			},
			{
				key: "age",
				type: "message",
				text: "Какой возраст ?",
				confirm: true,
			},
		],
	},
};
