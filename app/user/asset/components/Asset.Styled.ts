import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
`;

export const InvestmentGoal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  background-color: var(--primary-light );
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

export const GoalText = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

export const GoalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GoalAmount = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 1.5rem;
  background: var(--white-color);
  border-radius: 0.75rem;
  overflow: hidden;
`;

export const Progress = styled.div<{ $progress: number }>`
  width: ${({ $progress }) => $progress}%;
  height: 100%;
  background: var(--second-300);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  transition: width 0.3s ease;
`;

export const ChangeButton = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 0.875rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    text-decoration: underline;
  }
`;

export const TotalAssetsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid var(--disabled-color);
  padding: 0.8rem;
`;

export const TotalText = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
`;

export const TotalValue = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`;

export const AccountSection = styled.div`
  width: 100%;
  background: #f0f4ff;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const AccountTitle = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

export const AccountValue = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`;

export const TransferButton = styled.button`
  padding: 0.5rem 0.75rem;
  background: #6366f1;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #4f46e5;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
`;

export const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem;
  background: #0070f3;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: #0366d6;
  }
`;