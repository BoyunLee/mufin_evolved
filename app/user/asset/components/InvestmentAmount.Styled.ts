import styled from "styled-components";

export const Section = styled.div`
  background: var(--white-color);
`;

export const InvestmentSummary = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SummaryLabel = styled.span`
  font-size: var(--font-size-base);
  color: var(--gray-800);
`;

export const SummaryValue = styled.span<{ $isPositive?: boolean }>`
  font-size: var(--font-size-base);
  font-weight: 600;
  color: ${({ $isPositive }) =>
    $isPositive === undefined
      ? "var(--black-color)"
      : $isPositive
      ? "var(--second-color)"
      : "var(--primary-color)"};
`;