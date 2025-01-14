import { Server, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

export var serverGRPC = new Server();
export const protoDefinition = loadSync("./src/api/proto/user-message.proto");
export const protoObject = loadPackageDefinition(protoDefinition);
