import { ServerCredentials } from "@grpc/grpc-js";
import { serverGRPC } from "./api/grpc";
import { serverHTTP } from "./api/http";

const portGRPC: string = process.env.PORT_GRPC.toString();
const portHTTP: number = process.env.PORT_HTTP;
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
