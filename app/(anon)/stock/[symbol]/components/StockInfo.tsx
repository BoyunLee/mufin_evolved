'use client';

import { useState, useEffect } from 'react';
import { Table, TableCell1, TableCell2 } from '@/app/(anon)/stock/[symbol]/components/StockDetail.Styled';
import LoadingScreen from '@/app/(anon)/stock/[symbol]/components/LodingScreen';
import ErrorScreen from '@/app/(anon)/stock/[symbol]/components/ErrorScreen'; // ErrorScreen 컴포넌트 추가

interface StockInfoProps {
  symbol: string;
}

interface StockInfoData {
  stockCode: string;
  stockName: string;
  stockOpen: string;
  faceValue: number;
  totalShare: bigint;
}

const StockInfo = ({ symbol }: StockInfoProps) => {
  const [stockData, setStockData] = useState<
    Array<{ label: string; value: string | number }>
  >([]);
  const [loading, setLoading] = useState(true);  // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`/api/stock/stock-info?symbol=${symbol}`);
        if (!response.ok) {
          throw new Error('주식 정보를 불러오는 데 실패했습니다.');
        }
        const data: StockInfoData = await response.json();
        
        const transformedData = [
          { label: '주식이름', value: data.stockName },
          { label: '주식코드', value: data.stockCode },
          { label: '상장일', value: data.stockOpen },
          { label: '상장 주수', value: data.totalShare.toString() },
          { label: '액면가', value: `${data.faceValue}원`},
        ];

        setStockData(transformedData);
        setLoading(false); // 데이터 로딩 완료 후 로딩 상태 false로 변경
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError('주식 정보를 불러오는 데 실패했습니다.');
        setLoading(false); // 에러 발생 시 로딩 완료 처리
      }
    };

    fetchStockData();
  }, [symbol]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;

  return (
    <>
      <Table>
        <tbody>
          {stockData.map((row, index) => (
            <tr key={index}>
              <TableCell1>{row.label}</TableCell1>
              <TableCell2>{row.value}</TableCell2>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default StockInfo;
