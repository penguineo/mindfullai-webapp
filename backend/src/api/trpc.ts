import { initTRPC } from "@trpc/server";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { chatRouterTRPC } from "./router/chat";

export const createRouterTRPC = initTRPC.create().router;
export const publicProcedure = initTRPC.create().procedure;

const appRouterTRPC = createRouterTRPC({
	chat: chatRouterTRPC,
});
export const serverTRPC = createHTTPServer({
	router: appRouterTRPC,
});
