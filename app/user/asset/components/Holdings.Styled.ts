import styled from "styled-components";
import Link from "next/link";

/* 카드 컨테이너 */
export const Container = styled.div`
  width: 100%;
  background: var(--white-color);
  border-radius: 1.25rem;
  padding: 1.25rem;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

/* 헤더 */
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: 700;
`;

export const HistoryButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  padding: 0.35rem 0.6rem;
  font-size: var(--font-size-base);
  font-weight: 600;

  color: var(--primary-color);
  background: var(--primary-50);
  border-radius: 0.5rem;
`;

/* 리스트형 테이블 */
export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

/* 테이블 헤더 */
export const TableHeader = styled.th`
  font-size: var(--font-size-base);
  color: var(--gray-800);
  padding: 0.5rem 0;
  text-align: left;
`;

/* 행 */
export const TableRow = styled.tr`
  font-size: 0.875rem;

  &:not(:last-child) td {
    border-bottom: 1px solid var(--gray-50);
  }
`;

export const TableCell = styled.td`
  padding: 0.75rem 0;
  vertical-align: middle;
`;

/* 종목 정보 */
export const StockInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StockImage = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
`;

/* 수익 텍스트 */
export const ProfitText = styled.p<{ $isPositive: boolean }>`
  margin-top: 0.15rem;
  font-size: var(--font-size-md);
  color: ${({ $isPositive }) => ($isPositive ? "var(--second-color)" : "var(--primary-color)")};
`;
