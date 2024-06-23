import * as command from "@app/functions/commands";

(async () => {
	await command.start();
	await command.launch();
})();
