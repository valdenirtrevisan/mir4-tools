import { HTMLProps } from "react";

type Props = HTMLProps<HTMLInputElement>;

const Input = (props: Props) => {
  return (
    <input {...props} className="rounded bg-gray-800 border-gray-100 border p-2 w-full" />
  )
}

export default Input
