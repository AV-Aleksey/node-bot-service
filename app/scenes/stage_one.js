import { Scenes } from "telegraf";
import { getMinioFileUrl } from "@configs/minio";
import path from "path";
import { downloadFile } from "@configs/axios";
import fs from "fs";

export const step_one = new Scenes.WizardScene(
	"stage_1",
	async (ctx) => {
		// "Тут нужно забрать файл из видео о отправить в кружочке"

		const url = await getMinioFileUrl(
			"aleksey",
			"IMG_5343 (video-converter.com).mp4",
		);

		const downloadPath = path.join(
			__dirname,
			"IMG_5343 (video-converter.com).mp4",
		);

		await downloadFile(url, downloadPath);

		await ctx.sendVideoNote({ source: fs.createReadStream(downloadPath) });

		return ctx.wizard.next();
	},
	async (ctx) => {
		await ctx.reply("Готово!");

		return await ctx.scene.leave();
	},
);
