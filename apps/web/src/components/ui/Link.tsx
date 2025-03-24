import { ExternalLink } from "lucide-react";
import type { DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
	isExternal?: boolean;
};

export const Link = ({ children, isExternal = false, ...rest }: Props) => (
	<a className="flex items-center gap-2 text-orange hover:underline" {...rest}>
		{children}

		{isExternal && <ExternalLink size={16} />}
	</a>
);
