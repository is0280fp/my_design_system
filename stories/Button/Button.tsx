import React, { useMemo } from "react";
import { ButtonRoleHTMLTag, ButtonType } from "../util";
import { colors } from "../colors";
import styled from "styled-components";

interface ButtonProps {
  as?: ButtonRoleHTMLTag;
  type?: ButtonType;
  href?: string;
  openNewTab?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertialy";
  size?: "default" | "large" | "medium" | "small" | "tiny";
  width?: number | string;
  height?: number | string;
  color?: string;
  hoverColor?: string;
  borderColor?: string;
  textColor?: string;
  className?: string;
  shape?: "pill" | "rect";
}

interface StyledButtonProps extends ButtonProps {
  color: string;
  hoverColor: string;
  borderColor: string;
  borderRadius: string;
  width?: number | string;
  height?: number | string;
  disabled: boolean;
  padding: string;
}

type DisabledVariantProps = Pick<
  ButtonProps,
  "disabled" | "variant" | "textColor"
>;
type BorderProps = Pick<
  ButtonProps,
  "disabled" | "variant" | "borderColor" | "color"
>;
type BorderRadiusProps = Pick<ButtonProps, "size" | "shape">;

function getBgColor(props: DisabledVariantProps): string {
  const { disabled, variant } = props;

  if (disabled && variant === "tertialy") {
    return colors.TextAndIconsColor.Default.OnsurfaceTertiary;
  } else if (disabled && variant !== "tertialy") {
    return colors.SurfaceColor.Disabled.SurfaceDisabled;
  } else if (!disabled && variant === "primary") {
    return colors.SurfaceColor.Inverse.OnsurfaceInversePrimary;
  } else if (!disabled && variant === "secondary") {
    return colors.StaticColor.StaticWhite;
  } else {
    return "transparent";
  }
}

function getBorderColor(props: BorderProps): string {
  const { disabled, variant, borderColor, color } = props;
  if (disabled) {
    return colors.SurfaceColor.Disabled.SurfaceDisabled;
  } else if (!disabled && borderColor) {
    return borderColor;
  } else if (!disabled && !borderColor && color) {
    return color;
  } else {
    return variant === "primary" || variant === "secondary"
      ? colors.StaticColor.StaticBlack
      : "transparent";
  }
}

function getBorderRadius(props: BorderRadiusProps): string {
  const { size, shape } = props;
  if (shape === "rect") {
    return ["small", "tiny"].includes(size ?? "default") ? "4px" : "8px";
  } else {
    return "30px";
  }
}

function getTextColor(props: DisabledVariantProps): string {
  const { disabled, variant } = props;
  if (disabled) {
    return colors.TextAndIconsColor.Default.OnsurfaceTertiary;
  } else if (props.textColor) {
    return props.textColor;
  } else if (variant === "primary") {
    return colors.StaticColor.StaticWhite;
  } else if (variant === "tertialy") {
    return colors.TextAndIconsColor.Default.OnsurfacePrimary;
  } else {
    return colors.StaticColor.StaticBlack;
  }
}

function getPaddingSize(size: string): string {
  switch (size) {
    case "large":
      return "16.5px";
    case "medium":
      return "8px 16px";
    case "small":
      return "6px 12px";
    case "tiny":
      return "4px 10px";
    case "default":
    default:
      return "10.5px 67.5px";
  }
}

function getTextClass(size: string): string {
  switch (size) {
    case "default":
      return "text-default";
    case "medium":
      return "text-medium";
    case "small":
      return "text-small";
    case "tiny":
      return "text-tiny";
    default:
      return "text-default";
  }
}

// Styled components for button and text
const StyledButton = styled.button<StyledButtonProps>`
  background: ${(props) => props.color};
  width: ${(props) =>
    typeof props.width === "number"
      ? `${props.width * 4}px`
      : props.width || "100%"};
  height: ${(props) =>
    typeof props.height === "number"
      ? `${props.height * 4}px`
      : props.height || "fit-content"};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  padding: 8px 16px;
  border: ${(props) => `1px solid ${props.borderColor}`};
  border-radius: ${(props) => props.borderRadius};
  padding: ${(props) => props.padding};
  &:hover {
    background: ${(props) => props.hoverColor};
    box-shadow: inset 999px 999px 0px rgba(255, 255, 255, 0.2);
  }
  .text-default {
    font-size: 15px;
    line-height: 22px;
  }
  .text-medium {
    font-size: 13px;
    line-height: 20px;
  }
  .text-small {
    font-size: 12px;
    line-height: 18px;
  }
  .text-x-small {
    font-size: 12px;
    line-height: 16px;
  }
  .text-tiny {
    font-size: 9px;
    line-height: 13px;
  }
`;

const StyledText = styled.span<ButtonProps>`
  color: ${(props) => getTextColor(props)};
  white-space: nowrap;
  transition: color 250ms ease;
  font-weight: 600;
  flex: 1;
  text-align: center;
`;

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
    () => getBgColor({ disabled, variant }),
    [disabled, variant]
  );

  const hoverColor = useMemo(() => {
    if (disabled) {
      return bgColor;
    } else {
      return restProps.hoverColor || bgColor || "transparent";
    }
  }, [disabled, restProps.hoverColor]);

  const borderColor = useMemo(() => {
    return getBorderColor({
      disabled,
      variant,
      borderColor: restProps.borderColor,
      color: restProps.color,
    });
  }, [disabled, variant, restProps.borderColor, restProps.color]);

  const borderRadius = useMemo(() => {
    return getBorderRadius({
      size,
      shape: restProps.shape,
    });
  }, [size, restProps.shape]);

  const buttonClassName = useMemo(
    () => ["button", className].filter(Boolean).join(" "),
    [className]
  );

  const padding = useMemo(() => {
    return getPaddingSize(size);
  }, [size]);

  const textClass = useMemo(() => {
    return getTextClass(size);
  }, [size]);

  switch (as) {
    case "a":
      return (
        <a
          href={props.href}
          target={props.openNewTab ? "_blank" : ""}
          rel={props.openNewTab ? "noopener noreferrer" : ""}
        >
          anker
        </a>
      );
    case "button":
      return (
        <StyledButton
          className={buttonClassName}
          disabled={disabled}
          color={bgColor}
          hoverColor={hoverColor}
          borderColor={borderColor}
          borderRadius={borderRadius}
          width={restProps.width}
          height={restProps.height}
          padding={padding}
        >
          <StyledText
            className={textClass}
            disabled={disabled}
            variant={variant}
          >
            Button
          </StyledText>
        </StyledButton>
      );
      break;
  }
};
