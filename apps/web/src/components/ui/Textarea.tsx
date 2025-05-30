import type { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

type Props = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
	error?: string;
};

export const Textarea = ({ className, error, ...rest }: Props) => {
	return (
		<>
			<textarea
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
