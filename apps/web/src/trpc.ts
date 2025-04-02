import { QueryClient } from "@tanstack/react-query";
import {
	createTRPCClient,
	httpLink,
	httpSubscriptionLink,
	loggerLink,
	splitLink,
} from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type { AppRouter } from "../../server/src/routers";
import { API_URL } from "./constants";

export const queryClient = new QueryClient();

const ENDPOINT_URL = `${API_URL}/api`;

const trpcClient = createTRPCClient<AppRouter>({
	links: [
		loggerLink({ enabled: () => !import.meta.env.PROD }),
		splitLink({
			condition: (op) => op.type === "subscription",
			true: httpSubscriptionLink({
				url: ENDPOINT_URL,
			}),
			false: httpLink({ url: ENDPOINT_URL }),
		}),
	],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
	client: trpcClient,
	queryClient,
});
