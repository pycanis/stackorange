import { Button } from "./ui/Button";

type Props = {
	link: string;
	name: string;
	description: string;
};

export const WalletLink = ({ description, link, name }: Props) => {
	return (
		<Button
			variant="secondary"
			className="flex-col items-start"
			onClick={() => window.open(link, "_blank")}
		>
			<span className="font-bold">{name}</span>
			<span className="text-sm text-white-muted">{description}</span>
		</Button>
	);
};
