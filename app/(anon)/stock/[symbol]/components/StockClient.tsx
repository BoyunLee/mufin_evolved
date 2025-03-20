"use client"

import { useEffect, useRef, useState, useCallback } from "react";
import StockDetailTitle from "@/app/(anon)/stock/[symbol]/components/StockDetailTitle";
import StockDetailTabs from "@/app/(anon)/stock/[symbol]/components/StockDetailTabs";
import { StockContainer } from "@/app/(anon)/stock/[symbol]/components/StockDetail.Styled";
import { marketOpen } from "@/utils/getMarketOpen";
import {
  connectWs,
  sendWsMessage,
  onWsMessage,
  disconnectWs,
  createMessage,
} from "@/utils/websocketClient";
import { fetchApprovalKey } from "@/utils/fetchApprovalKey";
import { parseStockData } from "@/utils/parseStockData";
import { REQUIRED_STOCK_FIELD, STOCK_TRADE_MAPPING } from "@/constants/realTimeStockMapping";

interface StockClientProps {
  symbol: string;
  initialStockData: {
    stockPrice: string;
    prdyVrss: string;
    prdyCtrt: string;
  };
}

const StockClientPage: React.FC<StockClientProps> = ({ symbol, initialStockData }) => {
  const [stockPrice, setStockPrice] = useState(initialStockData.stockPrice);
  const [prdyVrss, setPrdyVrss] = useState(initialStockData.prdyVrss);
  const [prdyCtrt, setPrdyCtrt] = useState(initialStockData.prdyCtrt);
  const [isMarketOpen, setIsMarketOpen] = useState<boolean>(marketOpen());
  
  const approvalKeyRef = useRef<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const currentType = "currentPrice";

  // ✅ 1. 초기 데이터 설정
  useEffect(() => {
    setStockPrice(initialStockData.stockPrice);
    setPrdyVrss(initialStockData.prdyVrss);
    setPrdyCtrt(initialStockData.prdyCtrt);
  }, [initialStockData, stockPrice, prdyVrss, prdyCtrt]);

  // ✅ 2. WebSocket 연결 함수
  const initializeWebSocket = useCallback(async () => {
    if (!isMarketOpen || wsRef.current) return;

    try {
      const result = await fetchApprovalKey(currentType, "start");
      if (!result) throw new Error("Approval Key 없음");

      const { approvalKey } = result as { approvalKey: string };
      approvalKeyRef.current = approvalKey;

      const ws = await connectWs("ws://ops.koreainvestment.com:21000/tryitout/H0STCNT0");
      wsRef.current = ws;

      const subscribeMsg = createMessage(approvalKey, "1", "H0STCNT0", symbol);
      if (wsRef.current) {
        sendWsMessage(wsRef.current, subscribeMsg);

        onWsMessage(wsRef.current, (data: string) => {
          try {
            const parsedData = parseStockData(data, STOCK_TRADE_MAPPING, REQUIRED_STOCK_FIELD);
            if (parsedData) {
              setStockPrice(parsedData.stocks.stckPrpr);
              setPrdyVrss(parsedData.stocks.prdyVrss);
              setPrdyCtrt(parsedData.stocks.prdyCtrt);
            }
          } catch (error) {
            console.log("❌ 데이터 파싱 실패:", error);
          }
        });
      }
    } catch (error) {
      console.log("WebSocket 초기화 에러:", error);
    }
  }, [isMarketOpen, symbol]);

  // ✅ 3. WebSocket 종료 함수
  const cleanupWebSocket = useCallback(() => {
    if (wsRef.current && approvalKeyRef.current) {
      const unsubscribeMsg = createMessage(approvalKeyRef.current, "2", "H0STCNT0", symbol);
      sendWsMessage(wsRef.current, unsubscribeMsg);
      disconnectWs(wsRef.current);
      wsRef.current = null;
    }
  }, [symbol]);

  // ✅ 4. 시장이 열려 있을 때 WebSocket 실행
  // ✅ 5. 주식 시장 상태를 1분마다 체크
  useEffect(() => {
  const interval = setInterval(() => {
    const marketStatus = marketOpen();
    setIsMarketOpen(marketStatus);
    if (marketStatus) {
      initializeWebSocket();
    } else {
      cleanupWebSocket();
    }
  }, 60000); 

  return () => {
    clearInterval(interval);  
    cleanupWebSocket(); 
  };
  }, [symbol, initializeWebSocket, cleanupWebSocket]);

  return (
    <>
      <StockContainer>
        <StockDetailTitle
          symbol={symbol}
          initialPrice={stockPrice}
          prdyVrss={prdyVrss}
          prdyCtrt={prdyCtrt}
        />
        <StockDetailTabs symbol={symbol} initialPrice={stockPrice} />
      </StockContainer>
    </>
  );
};

export default StockClientPage;
