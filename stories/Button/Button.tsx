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
  width?: number | string;
  height?: number | string;
  color?: string;
  hoverColor?: string;
  borderColor?: string;
  textColor?: string;
  className?: string;
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
  } else {
    return "transparent";
  }
}

function getTextColor(props: DisabledVariantProps): string {
  const { disabled, variant } = props;
  if (disabled) {
    return colors.TextAndIconsColor.Default.OnsurfaceTertiary;
  } else if (variant === "primary") {
    return colors.TextAndIconsColor.Inverse.OnsurfaceInversePrimary;
  } else {
    return colors.TextAndIconsColor.Default.OnsurfacePrimary;
  }
}

export const Button: React.FC<ButtonProps> = ({
  // define default value
  as = "button",
  disabled = false,
  variant = "primary",
  size = "default",
  ...props
}) => {
  const { className, ...restProps } = props;

  const bgColor = useMemo(
    () => getBgColor({ disabled: disabled, variant: variant }),
    [disabled, variant]
  );
  const textColor = useMemo(
    () => getTextColor({ disabled: disabled, variant: variant }),
    [disabled, variant]
  );
  const buttonClassName = useMemo(
    () => ["button", className].filter(Boolean).join(" "),
    [className]
  );
  const width = useMemo(() => {
    if (typeof props?.width === "number") return `${props.width * 4}px`;
    return props?.width ?? "100%";
  }, [props.width]);

  const height = useMemo(() => {
    if (typeof props?.height === "number") return `${props.height * 4}px`;
    return props?.height ?? "fit-content";
  }, [props.height]);

  const btnStyle = (bgColor: string, width, height) => ({
    background: bgColor,
    width: width,
    height: height,
  });

  const textStyle = (textColor) => ({
    color: textColor,
  });

  switch (as) {
    case "a":
      return (
        <a
          href={props.href}
          target={props.openNewTab ? "_blank" : ""}
          rel={props.openNewTab ? "noopener noreferrer" : ""}
          // {...props}
        >
          {/* {label} */}
          anker
        </a>
      );
      break;
    case "button":
      return (
        <button
          {...restProps}
          className={buttonClassName}
          disabled={disabled}
          style={btnStyle(bgColor, width, height)}
        >
          {/* {label} */}
          <span style={textStyle(textColor)}>Button</span>
        </button>
      );
      break;
  }
};
