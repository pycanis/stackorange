import { ExternalLink } from "lucide-react";
import type { DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
	variant?: keyof typeof linkVariants;
	showExternalIcon?: boolean;
};

const linkVariants = {
	primary: "text-orange hover:underline",
	button: "rounded-lg px-3 py-1.5 text-white-muted hover:text-white hover:bg-white-muted/30",
};

export const Link = ({
	children,
	className,
	variant = "primary",
	showExternalIcon = false,
	...rest
}: Props) => (
	<a
		className={"inline-flex items-center gap-2 transition-all duration-100".concat(
			" ",
			linkVariants[variant],
			" ",
			className || "",
		)}
		{...rest}
	>
		{children}

		{showExternalIcon && <ExternalLink size={16} />}
	</a>
);
