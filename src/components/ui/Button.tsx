import styled from "styled-components";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  widthFull?: boolean;
  ghost?: boolean;
};

const StyledButton = styled.button<{ $widthFull: boolean; $ghost: boolean }>`
  height: ${({ $ghost }) => ($ghost ? "auto" : "40px")};
  background: ${({ $ghost }) => ($ghost ? "transparent" : "#5285ec")};
  border-radius: 8px;
  border: none;
  color: #ffffff;
  padding: ${({ $ghost }) => ($ghost ? "2px" : "11px 22px")};
  font: normal normal 500 14px/18px Montserrat;
  cursor: pointer;
  width: ${({ $widthFull }) => ($widthFull ? "100%" : "auto")};
`;

const Button = ({
  children,
  widthFull = true,
  ghost = false,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton $widthFull={widthFull} $ghost={ghost} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
