import * as command from "@app/functions/commands";
import * as hears from "@app/functions/hears";

(async () => {
	await command.start();
	await hears.text();
	await command.launch();
})();
