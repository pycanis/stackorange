import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
	variant?: keyof typeof buttonVariants;
};

const buttonVariants = {
	// todo: disabled
	primary: "text-white bg-orange hover:bg-orange/90",
	secondary: "text-white bg-background hover:bg-white-muted/30 border border-white-muted/50",
	group: "",
	text: "hover:bg-white-muted/30",
};

export const Button = ({ className, variant = "primary", ...rest }: Props) => {
	return (
		<button
			className={"flex justify-center rounded-lg px-3 py-1.5 hover:not-disabled:cursor-pointer transition-all duration-100 focus-visible:outline-2 focus-visible:outline-offset-2".concat(
				" ",
				buttonVariants[variant],
				" ",
				className || "",
			)}
			{...rest}
		/>
	);
};
