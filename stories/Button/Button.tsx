import React, { useMemo } from "react";
import "./button.css";
import { ButtonRoleHTMLTag, ButtonType } from "../util";
import { colors } from "../colors";

interface ButtonProps {
  as?: ButtonRoleHTMLTag;
  type?: ButtonType;
  href?: string;
  openNewTab?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertialy";
  size?: "default" | "medium" | "small" | "tiny" | "large";
  color?: string;
  hoverColor?: string;
  borderColor?: string;
  textColor?: string;
}

type DisabledVariantProps = Pick<ButtonProps, "disabled" | "variant">;

function getBgColor(props: DisabledVariantProps): string {
  const { disabled, variant } = props;

  if (disabled && variant === "tertialy") {
    return colors.TextAndIconsColor.Default.OnsurfaceTertiary;
  } else if (disabled && variant !== "tertialy") {
    return colors.SurfaceColor.Disabled.SurfaceDisabled;
  } else if (!disabled && variant === "primary") {
    return colors.SurfaceColor.Inverse.OnsurfaceInversePrimary;
  } else if (!disabled && variant === "secondary") {
    return colors.TextAndIconsColor.Default.OnsurfacePrimary;
  } else if (!disabled && variant === "tertialy") {
    return "transparent";
  }
  return "transparent"; // Default case, or handle more variants here if needed
}

/** Primary UI component for user interaction */
export const Button: React.FC<ButtonProps> = ({
  // define default value
  ...props
}) => {
  const bgColor = useMemo(
    () => getBgColor({ disabled: props.disabled, variant: props.variant }),
    // what to feed for this?
    []
  );
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
