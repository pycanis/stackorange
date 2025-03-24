type Props = {
	text: string;
};

export const PaymentWait = ({ text }: Props) => {
	return (
		<>
			<div className="mb-2 grid w-full grid-cols-3 gap-2">
				<div
					className="h-2 animate-pulse rounded-full bg-white"
					style={{ animationDelay: "0ms" }}
				/>
				<div
					className="h-2 animate-pulse rounded-full bg-white"
					style={{ animationDelay: "200ms" }}
				/>
				<div
					className="h-2 animate-pulse rounded-full bg-white"
					style={{ animationDelay: "400ms" }}
				/>
			</div>

			<p className="text-center text-white-muted">{text}</p>
		</>
	);
};
