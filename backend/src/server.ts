import { ServerCredentials } from "@grpc/grpc-js";
import { serverGRPC } from "./api/grpc";
import { serverHTTP } from "./api/http";
import { serverTRPC } from "./api/trpc";

const portGRPC: string = process.env.PORT_GRPC.toString();
const portHTTP: number = process.env.PORT_HTTP;
const portTRPC: number = process.env.PORT_TRPC;
const cred = ServerCredentials.createInsecure();

serverGRPC.bindAsync(`localhost:${portGRPC}`, cred, (error, port) => {
	if (error) {
		console.error("Error binding gRPC server:", error);
		return;
	}
	console.log(`gRPC Server Listening on port: ${port}`);
});

serverHTTP.listen(portHTTP, "localhost", () => {
	console.log(`HTTP Server Listening on port: ${portHTTP}`);
});

try {
	serverTRPC.listen(portTRPC, "localhost");
	console.log(`tRPC Server Listening on port: ${portTRPC}`);
} catch (error) {
	console.error("Error starting tRPC server:", error);
	process.exit(1);
}
