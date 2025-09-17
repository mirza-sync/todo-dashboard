// LoadingOverlay.tsx
import React from "react";
import styled, { keyframes } from "styled-components";

type LoadingOverlayProps = {
  visible?: boolean;
  message?: string;
};

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0; /* top:0; right:0; bottom:0; left:0; */
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  z-index: 9999;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  padding: 20px 28px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.25); /* semi-transparent box */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 6px solid rgba(255, 255, 255, 0.18);
  border-top-color: #ffffff;
  animation: ${spin} 1s linear infinite;
`;

const Message = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
`;

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible = false,
  message,
}) => {
  if (!visible) return null;

  return (
    <Overlay role="status" aria-busy="true" aria-label={message ?? "Loading"}>
      <Panel>
        <Spinner />
        <Message>{message ?? "Loading..."}</Message>
      </Panel>
    </Overlay>
  );
};

export default LoadingOverlay;
