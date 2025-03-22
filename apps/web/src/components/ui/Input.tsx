import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
	error?: string;
};

export const Input = ({ className, error, ...rest }: Props) => {
	return (
		<>
			<input
				className={`-outline-offset-1 w-full rounded-lg bg-background px-3 py-1.5 outline-1 ${
					error ? "outline-red-400" : "outline-white-muted/50"
				} focus:-outline-offset-2 text-sm transition-all duration-100 placeholder:text-white-muted focus:outline-2 focus:outline-orange`.concat(
					" ",
					className || "",
				)}
				{...rest}
			/>

			{error && <p className="text-red-400 text-sm">{error}</p>}
		</>
	);
};
