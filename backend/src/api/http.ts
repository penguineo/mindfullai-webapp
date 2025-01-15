import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { pageBasedRouting } from "../util/pageBasedRouting";

let appRouterHTTP: { [key: string]: (res: ServerResponse) => void } = {};

const router = pageBasedRouting("../frontend/pages");

router.forEach((routes) => {
	const route = routes.route;
	const html = routes.html;

	appRouterHTTP[route] = (res: ServerResponse) => {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.write(html);
		res.end();
	};
});

console.log(appRouterHTTP);
export const serverHTTP = createServer(
	(req: IncomingMessage, res: ServerResponse) => {
		if (typeof req.url === "string") {
			const pathName: string = req.url;
			const handler = appRouterHTTP[pathName];

			if (handler) {
				handler(res);
			} else {
				res.statusCode = 404;
				res.write("<h1>404 Not Found</h1>");
				res.end();
			}
		} else {
			res.statusCode = 400;
			res.write("<h1>400 Bad Request</h1>");
			res.end();
		}
	},
);
