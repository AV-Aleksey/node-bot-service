/**
 * Node Module
 * =====================
 *
 * Show hello world text
 *
 * @contributors: Aleksey Aleshnikov
 *
 * @license: MIT License
 *
 */
import type { ModuleInterface, ModuleResponseInterface } from "@app/types/module.type";

/**
 * Hello World
 * =====================
 *
 * Print hello-world
 *
 * @interface [ModuleInterface ModuleResponseInterface](https:///blob/main/app/types/module.type.ts)
 *
 * @param {string} {text} - input string
 *
 * @return {Promise<ModuleResponseInterface>} (async) app() function that return string
 *
 */
const m = async ({ text }: ModuleInterface): Promise<ModuleResponseInterface> => {
	const app = () => text;

	return {
		app,
	};
};

export default m;
