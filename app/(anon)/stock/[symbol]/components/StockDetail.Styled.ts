"use client";

import styled from "styled-components";

// 주식 페이지
export const StockContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.25rem 1.25rem 1.25rem;  
  flex: 1;
  overflow-y: auto;
  justify-content: space-between;
  gap: 0.5rem;
`;

// 주식 페이지 헤더
export const StockTitleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  margin-bottom: 0.5rem; 
  gap: 0.25rem;
`;

export const StockName = styled.h1`
  font-size: var(--font-size-2xl);
`;

export const StockPrice = styled.h2`
  font-size: var(--font-size-2xl);
`;

export const StockDiff = styled.p`
  font-size: var(--font-size-md);
  color: var(--gray-700);

  span {
    color: rgb(13, 0, 255);
    font-weight: bold;
  }
`;


// 주식 페이지 탭 컨텐츠
export const StockRenderTabContent = styled.section`
  display: flex;
  flex-direction: column;
  flex : 1;
  min-height: 24rem;
`;

// 탭 중 그래프
export const PeriodSelector = styled.div`
  display: flex;
  justify-content: center;
`;

export const PeriodItem = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  font-size: var(--font-size-base); 
  padding: 0.5rem 1.5rem; 
  color: ${({ $active }) =>
    $active ? 'var(--black-color)' : 'var(--gray-900)'};
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
`;

export const DraggableScrollWepper = styled.div<{ $isDragging: boolean }>`
  overflow-x: auto;
  cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'grab')};
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const ChartSection = styled.div`
  width: 36rem;
  min-height: 19rem;
  height: 100%;
`;

export const ChartImageContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`;

// 탭 중 주식정보
export const Table = styled.table`
  margin-top: 10px;
  width: 90%;
  border-collapse: collapse;
  border: 0.6px solid var(--disabled-color);
  margin-left: auto;
  margin-right : auto;
`;

export const TableCell1 = styled.td`
  padding: 10px;
  text-align: left;
  border: 0.6px solid var(--disabled-color);
  background-color: var(--primary-light);
`;

export const TableCell2 = styled.td`
  padding: 10px;
  text-align: left;
  border: 0.6px solid var(--disabled-color);
`;

// 거래하기 버튼
export const ButtonComponenet = styled.div`
  text-align: center;
  border: none;
  background-color: var(--white-color);
`;

// 장 마감 모달
export const StockErrorModal = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--white-color);
  border: none;
  height: 10rem;
  gap: 0.5rem;
  margin: 0 auto; /* 수평 중앙 정렬 */
`;

// 에러, 로딩 페이지
export const ScreenSection = styled.section`
  display: flex;
  flex-direction: column;
  flex : 1;
  justify-content: center;
  align-items: center;
  max-height: 30rem;
`;
