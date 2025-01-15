import * as fs from "fs";
import * as path from "path";

export const pageBasedRouting = (pathName: string) => {
	const routes: { route: string; html: string }[] = [];

	try {
		const dir = fs.readdirSync(pathName);

		dir.forEach((file) => {
			const filePath = path.join(pathName, file);

			try {
				if (fs.statSync(filePath).isFile() && file.endsWith(".html")) {
					const route = "/" + file.replace(".html", "");
					const html = fs.readFileSync(filePath, "utf-8");
					routes.push({ route, html });
				}
			} catch (err) {
				console.error(`Error processing file ${file}:`, err);
			}
		});
	} catch (err) {
		console.error("Error reading directory:", err);
		return [];
	}

	return routes;
};
