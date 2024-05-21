export const objToStringF = (obj, prefix = "") => {
	return Object.entries(obj).reduce((acc, [, value]) => {
		const row = `🔸 ${value}\n`;
		return acc + row;
	}, `${prefix ? `${prefix}\n` : ""}`);
};
