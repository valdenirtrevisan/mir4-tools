import { HTMLProps } from "react";

type Props = HTMLProps<HTMLButtonElement> & {
  type?: "button" | "submit" | "reset";
};

const Button = ({ children, ...props }: Props) => {
  return (
    <button
      {...props} className="p-2 text-sm border rounded hover:text-gray-400 hover:border-gray-400 transition-colors">

      {children}
    </button>
  );
};

export default Button;
