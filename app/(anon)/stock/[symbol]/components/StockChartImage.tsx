"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';

import StockModalContainer from '@/app/(anon)/stock/[symbol]/components/StockModalContainer';
import DraggableScrollContainer from '@/app/(anon)/stock/[symbol]/components/DraggableScrollContainer';
import { ChartImageContainer, ChartSection } from '@/app/(anon)/stock/[symbol]/components/StockDetail.Styled';
import LoadingScreen from '@/app/(anon)/stock/[symbol]/components/LodingScreen';
import ErrorScreen from '@/app/(anon)/stock/[symbol]/components/ErrorScreen';

ChartJS.register(CategoryScale, LinearScale, CandlestickController, TimeScale, CandlestickElement, Tooltip, Legend);

interface StockChartImageProps {
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

interface ChartData {
  datasets: {
    label: string;
    data: CandlestickDataItem[];
    barThickness?: number;
  }[];
}

interface WorkerRequest {
  symbol: string;
  activePeriod: string;
}

interface WorkerResponse {
  candlestickData?: CandlestickDataItem[];
  error?: string;
}

const StockChartImage: React.FC<StockChartImageProps> = ({ symbol, activePeriod }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Worker를 한 번만 생성
    if (!workerRef.current) {
      workerRef.current = new Worker(new URL('@/workers/stockChartWorker.ts', import.meta.url));
    }
    const worker = workerRef.current;

    setLoading(true);
    setError(null);

    const handleMessage = (event: MessageEvent<WorkerResponse>) => {
      const { candlestickData, error } = event.data;

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }
      if (candlestickData) {
        setChartData({
          datasets: [
            {
              label: `${symbol} 봉 차트`,
              data: candlestickData,
              barThickness: 7,
            },
          ],
        });
        setLoading(false);
      }
    };

    worker.addEventListener('message', handleMessage);

    const message: WorkerRequest = { symbol, activePeriod };
    worker.postMessage(message);

    return () => {
      worker.removeEventListener('message', handleMessage);
    };
  }, [symbol, activePeriod]);

  console.log('chartData', chartData);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;

  if (!chartData) return <ErrorScreen />;

  return (
    <ChartImageContainer>
      <StockModalContainer isOpen={false} onClose={() => {}} />
      <DraggableScrollContainer>
        <ChartSection>
          <Chart
            type="candlestick"
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                tooltip: {
                  enabled: true,
                  position: 'average',
                  yAlign: 'bottom',
                  displayColors: false,
                  callbacks: {
                    label: (context) => {
                      const raw = context.raw as CandlestickDataItem;
                      return [
                        `시가: ${raw.o}`,
                        `고가: ${raw.h}`,
                        `저가: ${raw.l}`,
                        `종가: ${raw.c}`,
                      ];
                    },
                  },
                },
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  type: 'time',
                  offset: false,
                },
                y: {
                  position: 'right',
                },
              },
              interaction: {
                mode: 'point',
                intersect: false,
              },
            }}
          />
        </ChartSection>
      </DraggableScrollContainer>
    </ChartImageContainer>
  );
};

export default StockChartImage;
