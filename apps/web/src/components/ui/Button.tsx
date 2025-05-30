import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
	variant?: keyof typeof buttonVariants;
};

const buttonVariants = {
	primary: "text-white bg-orange hover:bg-orange/90",
	secondary: "text-white bg-background hover:bg-background/10 border border-white-muted/50",
	danger: "text-red-500 border border-red-500/50 hover:bg-red-500/10",
	group: "hover:not-disabled:text-white",
	text: "hover:bg-white-muted/30",
};

export const Button = ({ className, variant = "primary", ...rest }: Props) => {
	return (
		<button
			className={"flex justify-center rounded-lg px-3 py-1.5 transition-all duration-100 hover:not-disabled:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2".concat(
				" ",
				buttonVariants[variant],
				" ",
				className || "",
			)}
			{...rest}
		/>
	);
};
