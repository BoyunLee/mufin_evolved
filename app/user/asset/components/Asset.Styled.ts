import styled from "styled-components";

/* ================= Page Background ================= */

export const Container = styled.div`
  background: var(--gray-50);
  display: flex; 
  flex-direction: column; 
  gap: 1rem; 
  width: 100%; 
  margin: 0 auto; 
  padding: 1rem;
`;

/* ================= White Section ================= */

export const Section = styled.div`
  background: var(--white-color);
  border-radius: 12px;
  padding: 1.25rem;
`;

/* ================= 투자 목표 ================= */

export const InvestmentGoal = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const GoalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GoalText = styled.span`
  font-size: var(--font-size-base);
  color: var(--gray-800);
  font-weight: 600;
`;

export const GoalAmount = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
`;

export const ChangeButton = styled.button`
  background: none;
  border: none;
  font-size: 0.85rem;
  color: var(--primary-color);
  cursor: pointer;
`;

/* Progress */

export const ProgressBarContainer = styled.div`
  height: 4px;
  width: 100%;
  background: var(--gray-200);
  border-radius: 999px;
  overflow: hidden;
`;

export const Progress = styled.div<{ $progress: number }>`
  width: ${({ $progress }) => $progress}%;
  height: 100%;
  background: var(--primary-color);
`;

/* ================= 총 자산 ================= */

export const TotalSummaryCard = styled.div`
  background: var(--white-color);
  border-radius: 1.25rem;
  padding: 1.25rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TotalHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const TotalText = styled.span`
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--gray-800);
`;

export const TotalValue = styled.span`
  font-size: var(--font-size-2xl);
  font-weight: 700;
`;


/* ================= 계좌 ================= */

export const AccountSection = styled(Section)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const AccountTitle = styled.span`
  font-size: var(--font-size-base);
  color: var(--gray-800);
`;

export const AccountValue = styled.span`
  font-size: var(--font-size-xl);
  font-weight: 700;
`;

export const TransferButton = styled.button`
  background: var(--primary-color);
  border: none;
  border-radius: 6px;
  padding: 0.6rem 0.9rem;

  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--white-color);

  cursor: pointer;
  line-height: 1;
  white-space: nowrap;
`;


/* ================= Modal ================= */
export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 1rem;
  border: 1px solid var(--disabled-color);
  border-radius: 0.5rem;
  font-size: var(--font-size-base);
`;

export const Button = styled.button`
  margin-top: 1.2rem;
  padding: 0.5rem;
  background: var(--primary-color);
  color: var(--white-color);
  font-size: var(--font-size-base);
  font-weight: bold;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  width: 100%;
`;

