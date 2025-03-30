import { useCallback, useMemo, useState } from "react";
import { debounce } from "./debounce";

export const useCopyToClipboard = (payload: string) => {
	const [copied, setCopied] = useState(false);

	const handleCopyToClipboard = useCallback(() => {
		navigator.clipboard.writeText(payload).then(() => {
			setCopied(true);

			debounce(() => {
				setCopied(false);
			}, 3000);
		});
	}, [payload]);

	return useMemo(
		() => ({
			isCopied: copied,
			handleCopyToClipboard,
		}),
		[copied, handleCopyToClipboard],
	);
};
