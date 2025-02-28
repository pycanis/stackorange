import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = ({ className, ...rest }: Props) => {
  return (
    <button
      className={`flex justify-center rounded-md bg-orange px-3 py-1.5 text-lg hover:not-disabled:cursor-pointer disabled:bg-gray-400 disabled:text-gray-200 text-neutral-50 shadow-xs hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2`.concat(
        " ",
        className || ""
      )}
      {...rest}
    />
  );
};
