import { ASSETS_PATH } from "@app/consts/paths";

import bot from "@app/functions/telegraf";

import fs from "fs";

export const uploadVideo = async (chatId, fileName) => {
	try {
		const path = `${ASSETS_PATH}/${fileName}`;

		const file = fs.createReadStream(path);

		const sentVideo = await bot.telegram.sendVideo(chatId, {
			source: file,
		});

		return sentVideo.video.file_id;
	} catch (err) {
		console.error("Error sending video:", err);
	}
};
