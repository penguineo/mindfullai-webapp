import { ServerCredentials } from "@grpc/grpc-js";
import { serverGRPC } from "./api/grpc";

const portGRPC: string = process.env.PORT_GRPC.toString();
const cred = ServerCredentials.createInsecure();

serverGRPC.bindAsync(`localhost:${portGRPC}`, cred, (error, port) => {
	if (error) {
		console.error("Error binding gRPC server:", error);
		return;
	}
	console.log(`gRPC Server Listening on port: ${port}`);
});
