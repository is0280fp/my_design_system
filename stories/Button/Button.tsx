import React from "react";
import "./button.css";
import { ButtonRoleHTMLTag, ButtonType } from "../util";

interface ButtonProps {
  // /** Is this the principal call to action on the page? */
  // primary?: boolean;
  // /** What background color to use */
  // backgroundColor?: string;
  // /** How large should the button be? */
  // size?: "small" | "medium" | "large";
  // /** Button contents */
  // label: string;
  // /** Optional click handler */
  // onClick?: () => void;
  as?: ButtonRoleHTMLTag;
  type?: ButtonType;
  href?: string;
  openNewTab?: boolean;
  disabled?: boolean;
}

/** Primary UI component for user interaction */
export const Button: React.FC<ButtonProps> = ({
  // define default value
  ...props
}) => {
  switch (props.as) {
    case "a":
      return (
        <a
          // type="button"
          // className={[
          //   "storybook-button",
          //   `storybook-button--${size}`,
          //   mode,
          // ].join(" ")}
          // style={{ backgroundColor }}
          href={props.href}
          target={props.openNewTab ? "_blank" : ""}
          rel={props.openNewTab ? "noopener noreferrer" : ""}
          // {...props}
        >
          {/* {label} */}
        </a>
      );
      break;
    case "button":
      return (
        <button
          // type={props.type}
          // className={[
          //   "storybook-button",
          //   `storybook-button--${size}`,
          //   mode,
          // ].join(" ")}
          // style={{ backgroundColor }}
          // {...props}
          disabled={props.disabled}
        >
          {/* {label} */}
        </button>
      );
      break;
  }
};
