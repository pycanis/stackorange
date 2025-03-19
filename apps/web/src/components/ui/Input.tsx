import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  error?: string;
};

export const Input = ({ className, error, ...rest }: Props) => {
  return (
    <>
      <input
        className={`w-full rounded-lg bg-background px-3 py-1.5 outline-1 -outline-offset-1 ${
          error ? "outline-red-400" : "outline-white-muted/50"
        } placeholder:text-white-muted focus:outline-2 focus:-outline-offset-2 focus:outline-orange text-sm transition-all duration-100`.concat(
          " ",
          className || ""
        )}
        {...rest}
      ></input>

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </>
  );
};
