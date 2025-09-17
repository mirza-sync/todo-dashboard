import type { PropsWithChildren } from "react";
import styled from "styled-components";

type TitleProps = {};

const StyledTitle = styled.h2`
  margin: 0;
  font: normal normal 500 20px/24px Montserrat;
  letter-spacing: 0px;
  color: #537178;
`;

const Title = ({ children }: PropsWithChildren<TitleProps>) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default Title;
