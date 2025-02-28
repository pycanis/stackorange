import type { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

type Props = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export const Textarea = ({ className, ...rest }: Props) => {
  return (
    <textarea
      className={"w-full rounded-md bg-amber-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6".concat(
        " ",
        className || ""
      )}
      {...rest}
    ></textarea>
  );
};
