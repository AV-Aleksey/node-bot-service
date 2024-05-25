import axios from "axios";
import fs from "fs";

export async function downloadFile(url, downloadPath) {
	const writer = fs.createWriteStream(downloadPath);

	const response = await axios({
		url,
		method: "GET",
		responseType: "stream",
	});

	response.data.pipe(writer);

	return new Promise((resolve, reject) => {
		writer.on("finish", resolve);
		writer.on("error", reject);
	});
}
