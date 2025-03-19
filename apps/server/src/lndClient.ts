import fs from "node:fs";
// import https from "node:https";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import type { ProtoGrpcType } from "./protos/generated/router";

const LND_MACAROON_PATH = process.env.LND_MACAROON_PATH as string;
const LND_TLS_PATH = process.env.LND_TLS_PATH as string;
// const LND_REST_ENDPOINT = process.env.LND_REST_ENDPOINT as string;
const LND_GRPC_ENDPOINT = process.env.LND_GRPC_ENDPOINT as string;

const tlsCert = fs.readFileSync(LND_TLS_PATH);
const sslCreds = grpc.credentials.createSsl(tlsCert);
const macaroon = fs.readFileSync(LND_MACAROON_PATH).toString("hex");

const macaroonCreds = grpc.credentials.createFromMetadataGenerator(
	(_args, callback) => {
		const metadata = new grpc.Metadata();
		metadata.add("macaroon", macaroon);
		callback(null, metadata);
	},
);

const creds = grpc.credentials.combineChannelCredentials(
	sslCreds,
	macaroonCreds,
);

// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });

// export const lndRestClient = axios.create({
//   baseURL: LND_REST_ENDPOINT,
//   httpsAgent: agent,
//   headers: {
//     "Content-Type": "application/json",
//     "Grpc-Metadata-macaroon": macaroon,
//   },
// });

const packageDefinition = protoLoader.loadSync(
	["src/protos/lightning.proto", "src/protos/router.proto"],
	{
		longs: String,
		enums: String,
		defaults: true,
		oneofs: true,
	},
);

const loadedDefinitions = grpc.loadPackageDefinition(
	packageDefinition,
) as unknown as ProtoGrpcType;

export const lnGrpcClient = new loadedDefinitions.lnrpc.Lightning(
	LND_GRPC_ENDPOINT,
	creds,
);
export const routerGrpcClient = new loadedDefinitions.routerrpc.Router(
	LND_GRPC_ENDPOINT,
	creds,
);

export const promisifyGrpc = <T, U>(
	grpcCall: (
		request: T,
		cb: (error: grpc.ServiceError | null, response: U) => void,
	) => void,
	request: T,
): Promise<U> =>
	new Promise((resolve, reject) =>
		grpcCall(request, (err, val) => (err ? reject(err) : resolve(val))),
	);
