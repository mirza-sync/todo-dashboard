import type { PropsWithChildren } from "react";
import styled from "styled-components";

type InfoWrapperProps = {};

const Style = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  @media (min-width: 769px) {
    display: flex;
    flex-direction: row;
    column-gap: 24px;
  }
`;

const InfoWrapper = ({ children }: PropsWithChildren<InfoWrapperProps>) => {
  return <Style>{children}</Style>;
};

export default InfoWrapper;
