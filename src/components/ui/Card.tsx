import type { PropsWithChildren } from "react";
import styled from "styled-components";

type CardProps = {
  padding?: string;
};

const StyledCard = styled.div<{ $padding: string }>`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000000a;
  /* max-height: 158px; */
  padding-top: 24px;
  padding-bottom: 28px;
  padding-inline: 32px;
  width: -webkit-fill-available;
  padding: ${({ $padding }) => $padding};

  @media (min-width: 769px) {
    border-radius: 12px;
    padding-inline: 24px;
  }
`;

const Card = ({ children, padding = "" }: PropsWithChildren<CardProps>) => {
  return <StyledCard $padding={padding}>{children}</StyledCard>;
};

export default Card;
