import React, { useMemo } from "react";
import "./button.css";
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
  size?: "default" | "medium" | "small" | "tiny" | "large";
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
}

type DisabledVariantProps = Pick<ButtonProps, "disabled" | "variant">;
type BorderProps = Pick<
  ButtonProps,
  "disabled" | "variant" | "borderColor" | "color"
>;
type BorderRadiusProps = Pick<ButtonProps, "size" | "shape">;

function getBgColor(props: DisabledVariantProps): string {
  const { disabled, variant } = props;
  // console.log(disabled);
  // console.log(variant);

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

function getBorderColor(props: BorderProps): string {
  const { disabled, variant, borderColor, color } = props;
  // console.log(disabled);
  // console.log(variant);
  // console.log(borderColor);
  // console.log(color);
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
  console.log(size);
  console.log(shape);
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
  } else if (variant === "primary") {
    return colors.TextAndIconsColor.Inverse.OnsurfaceInversePrimary;
  } else {
    return colors.TextAndIconsColor.Default.OnsurfacePrimary;
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
  border: ${(props) => props.borderColor};
  border-radius: ${(props) => props.borderRadius};

  &:hover {
    background: ${(props) => props.hoverColor};
    box-shadow: inset 999px 999px 0px rgba(255, 255, 255, 0.2);
  }
`;

const StyledText = styled.span<ButtonProps>`
  color: ${(props) => getTextColor(props)};
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
      return props.hoverColor || bgColor || "transparent";
    }
  }, [disabled, props.hoverColor]);

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
          {...restProps}
          className={buttonClassName}
          disabled={disabled}
          color={bgColor}
          hoverColor={hoverColor}
          borderColor={borderColor}
          borderRadius={borderRadius}
          width={props.width}
          height={props.height}
        >
          <StyledText disabled={disabled} variant={variant}>
            Button
          </StyledText>
        </StyledButton>
      );
      break;
  }
};
