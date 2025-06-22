import { StockChartDto } from '@/application/usecases/kis/dtos/StockChartDto';

interface WorkerMessage {
  symbol: string;
  activePeriod: string;
}

interface CandlestickDataItem {
  x: Date;
  o: number;
  h: number;
  l: number;
  c: number;
}

const parseDate = (dateStr: string, timeStr?: string): Date => {
  const year = parseInt(dateStr.substring(0, 4), 10);
  const month = parseInt(dateStr.substring(4, 6), 10) - 1;
  const day = parseInt(dateStr.substring(6, 8), 10);
  if (timeStr) {
    const hours = parseInt(timeStr.substring(0, 2), 10);
    const minutes = parseInt(timeStr.substring(2, 4), 10);
    const seconds = parseInt(timeStr.substring(4, 6), 10);
    return new Date(year, month, day, hours, minutes, seconds);
  }
  return new Date(year, month, day);
};

const createCandlestickItem = (item: StockChartDto, activePeriod: string): CandlestickDataItem => {
  const date = parseDate(item.stckBsopDate, activePeriod === '1m' ? item.stckCntgHour : undefined);
  return {
    x: date,
    o: Number(item.stckOprc),
    h: Number(item.stckHgpr),
    l: Number(item.stckLwpr),
    c: Number(activePeriod === '1m' ? item.stckPrpr : item.stckClpr),
  };
};

self.addEventListener('message', async (event) => {
  const { symbol, activePeriod } = event.data as WorkerMessage;
  console.log('[worker] 메시지 수신:', { symbol, activePeriod });

  try {
    const baseUrl = self.origin || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/stock/${symbol}?activePeriod=${activePeriod}`);
    console.log('[worker] fetch 응답 상태:', response.status);

    const data: StockChartDto[] = await response.json();
    console.log('[worker] JSON 파싱 후 데이터:', data);

    const candlestickData = data.map(item => createCandlestickItem(item, activePeriod));
    console.log('[worker] 변환된 캔들차트 데이터:', candlestickData);

    self.postMessage({ candlestickData });
  } catch (error) {
    console.error('[worker] 오류 발생:', error);
    self.postMessage({ error: (error as Error).message });
  }
});
