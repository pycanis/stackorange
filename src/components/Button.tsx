import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = ({ className, ...rest }: Props) => {
  return (
    <button
      className={`flex justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm/6 font-semibold hover:cursor-pointer text-neutral-100 shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600`.concat(
        " ",
        className || ""
      )}
      {...rest}
    />
  );
};
