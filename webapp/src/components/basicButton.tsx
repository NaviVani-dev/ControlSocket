import { useButton, type AriaButtonProps } from "@react-aria/button";
import { useRef } from "react";

interface ButtonProps extends AriaButtonProps<"button"> {
  className?: string;
}

export function Button(props: ButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { buttonProps } = useButton(props, ref);
  const { children } = props;

  return (
    <button className={props.className} {...buttonProps} ref={ref}>
      {children}
    </button>
  );
}

//thx adobe, but fuck u
