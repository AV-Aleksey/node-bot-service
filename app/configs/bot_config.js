export const SEND_TYPES = {
	message: "message",
	photo: "photo",
	video: "video",
};

export const scenario = {
	start: {
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
};
