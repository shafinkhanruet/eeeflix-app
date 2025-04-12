import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: ${props => props.theme.colors.backgroundDark};
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(67, 97, 238, 0.2);
  border-radius: 50%;
  border-top-color: ${props => props.theme.colors.accent};
  animation: ${spin} 1s ease-in-out infinite;
`;

const LoadingText = styled.p`
  margin-top: 20px;
  color: ${props => props.theme.colors.textPrimary};
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.2rem;
`;

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <div>
        <Spinner />
        <LoadingText>Loading EEEFlix...</LoadingText>
      </div>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
