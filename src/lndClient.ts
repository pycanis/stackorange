import axios from "axios";
import fs from "fs";
import https from "https";

const LND_MACAROON_PATH = process.env.LND_MACAROON_PATH as string;
const LND_REST_API_ENDPOINT = process.env.LND_REST_API_ENDPOINT as string;

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const lndClient = axios.create({
  baseURL: LND_REST_API_ENDPOINT,
  httpsAgent: agent,
  headers: {
    "Content-Type": "application/json",
    "Grpc-Metadata-macaroon": fs.readFileSync(LND_MACAROON_PATH).toString("hex"),
  },
});
