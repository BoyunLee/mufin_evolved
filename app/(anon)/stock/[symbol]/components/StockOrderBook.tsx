import LoadingScreen from "@/app/(anon)/stock/[symbol]/components/LodingScreen";
import {
  OrderBar,
  OrderBookContainer,
  OrderBookTable,
  OrderDetails,
  OrderRow,
  Price,
  Volume,
} from "@/app/(anon)/stock/[symbol]/components/OrderBook.Styled";
import { marketOpen } from "@/utils/getMarketOpen";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { connectWs, sendWsMessage, onWsMessage, disconnectWs, createMessage } from "@/utils/websocketClient";
import { fetchApprovalKey } from "@/utils/fetchApprovalKey";
import { parseStockData } from "@/utils/parseStockData";
import { ApprovalKeyType } from "@/types/approvalKeyType";
import { REQUIRED_STOCK_ORDERBOOK_FIELD, STOCK_TRADE_ORDERBOOK_MAPPING } from "@/constants/realTimeStockMapping";

export interface StockOrderBookProps {
  symbol: string;
}

const StockOrderBook = ({ symbol }: StockOrderBookProps) => {
  const [data, setData] = useState<{
    askPrices: { [key: string]: string };
    bidPrices: { [key: string]: string };
    askVolumes: { [key: string]: string };
    bidVolumes: { [key: string]: string };
    totalAskVolume: string;
    totalBidVolume: string;
  } | null>(null);
  const [isMarketOpen, setIsMarketOpen] = useState<boolean>(marketOpen());

  const approvalKeyRef = useRef<string | null>(null);
  const usedApiKeyNameRef = useRef<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const isConnectedRef = useRef<boolean>(false);

  const currentType: ApprovalKeyType = "orderBook";

  const formatNumber = (num: number) => num.toLocaleString();

  // ✅ 1. 초기 데이터 설정 (API 요청하여 데이터 가져오기)
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`/api/stock/order_book?symbol=${symbol}`);
      const result = await response.json();
      if (response.ok) {
        setData(result);
      } else {
        console.error("Error fetching data:", result.message);
      }
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  }, [symbol]);

  // ✅ 2. WebSocket 연결 및 데이터 처리
  const initializeConnections = useCallback(async () => {
    if (!isMarketOpen || wsRef.current) return;

    try {
      const result = await fetchApprovalKey(currentType, "start");
      if (!result) throw new Error("Approval Key 없음");

      const { approvalKey, usedApiKeyName } = result as { approvalKey: string; usedApiKeyName: string };
      approvalKeyRef.current = approvalKey;
      usedApiKeyNameRef.current = usedApiKeyName;

      const ws = await connectWs("ws://ops.koreainvestment.com:31000/tryitout/H0STASP0");
      wsRef.current = ws;
      isConnectedRef.current = true;

      const subscribeMsg = createMessage(approvalKey, "1", "H0STASP0", symbol);

      if (wsRef.current) {
        sendWsMessage(wsRef.current, subscribeMsg);

        onWsMessage(wsRef.current, (data: string) => {
          try {
            const parsedData = parseStockData(data, STOCK_TRADE_ORDERBOOK_MAPPING, REQUIRED_STOCK_ORDERBOOK_FIELD);
            if (parsedData) {
              setData({
                askPrices: {
                  askp1: parsedData.stocks.askp1,
                  askp3: parsedData.stocks.askp3,
                  askp5: parsedData.stocks.askp5,
                  askp7: parsedData.stocks.askp7,
                  askp9: parsedData.stocks.askp9,
                  askp10: parsedData.stocks.askp10,
                },
                bidPrices: {
                  bidp1: parsedData.stocks.bidp1,
                  bidp3: parsedData.stocks.bidp3,
                  bidp5: parsedData.stocks.bidp5,
                  bidp7: parsedData.stocks.bidp7,
                  bidp9: parsedData.stocks.bidp9,
                  bidp10: parsedData.stocks.bidp10,
                },
                askVolumes: {
                  askpRsqn1: parsedData.stocks.askpRsqn1,
                  askpRsqn3: parsedData.stocks.askpRsqn3,
                  askpRsqn5: parsedData.stocks.askpRsqn5,
                  askpRsqn7: parsedData.stocks.askpRsqn7,
                  askpRsqn9: parsedData.stocks.askpRsqn9,
                  askpRsqn10: parsedData.stocks.askpRsqn10,
                },
                bidVolumes: {
                  bidpRsqn1: parsedData.stocks.bidpRsqn1,
                  bidpRsqn3: parsedData.stocks.bidpRsqn3,
                  bidpRsqn5: parsedData.stocks.bidpRsqn5,
                  bidpRsqn7: parsedData.stocks.bidpRsqn7,
                  bidpRsqn9: parsedData.stocks.bidpRsqn9,
                  bidpRsqn10: parsedData.stocks.bidpRsqn10,
                },
                totalAskVolume: parsedData.stocks.totalAskpRsqn,
                totalBidVolume: parsedData.stocks.totalBidpRsqn,
              });
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
  const cleanupConnection = useCallback(() => {
    if (wsRef.current && approvalKeyRef.current && usedApiKeyNameRef.current) {
      const unsubscribeMsg = createMessage(approvalKeyRef.current, "2", "H0STASP0", symbol);
      if (wsRef.current) {
        sendWsMessage(wsRef.current, unsubscribeMsg);
      }
      disconnectWs(wsRef.current);
      isConnectedRef.current = false;

      fetchApprovalKey(currentType, "stop", usedApiKeyNameRef.current).catch((error) =>
        console.error("Approval Key release 실패:", error)
      );
    }
  }, [symbol, currentType]);

  // ✅ 4. 시장이 열려 있을 때 WebSocket 실행
  // ✅ 5. 주식 시장 상태를 1분마다 체크
  useEffect(() => {
    fetchData();
    initializeConnections();
  
    const interval = setInterval(() => {
      const marketStatus = marketOpen();
      setIsMarketOpen(marketStatus);
    }, 60000);
  
    return () => {
      cleanupConnection();
      clearInterval(interval);
    };
  }, [symbol, fetchData, initializeConnections, cleanupConnection]);

  if (!data) {
    return <LoadingScreen />;
  }

  const askPrices = Object.values(data.askPrices).map((price) => parseInt(price) || 0);
  const bidPrices = Object.values(data.bidPrices).map((price) => parseInt(price) || 0);
  const totalAskVolume = parseFloat(data.totalAskVolume) || 0;
  const totalBidVolume = parseFloat(data.totalBidVolume) || 0;
  const askVolumes = Object.values(data.askVolumes).map((volume) => parseFloat(volume) || 0);
  const bidVolumes = Object.values(data.bidVolumes).map((volume) => parseFloat(volume) || 0);

  return (
    <>
      <OrderBookContainer>
        <OrderBookTable>
          {[...Array(12)].map((_, i) => (
            <OrderRow key={i}>
              {i < 6 ? (
                <>
                  <Price className="ask">{formatNumber(askPrices[5 - i])} 원</Price>
                  <OrderDetails>
                    <OrderBar
                      className="ask"
                      width={(askVolumes[5 - i] / totalAskVolume) * 100 || 0}
                    />
                    <Volume $className="ask">
                      {formatNumber(askVolumes[5 - i])}(
                      {((askVolumes[5 - i] / totalAskVolume) * 100).toFixed(2)}%)
                    </Volume>
                  </OrderDetails>
                </>
              ) : null}

              {i >= 6 ? (
                <>
                  <Price className="bid">{formatNumber(bidPrices[i - 6])} 원</Price>
                  <OrderDetails>
                    <OrderBar
                      className="bid"
                      width={(bidVolumes[i - 6] / totalBidVolume) * 100 || 0}
                    />
                    <Volume $className="bid">
                      {formatNumber(bidVolumes[i - 6])}(
                      {((bidVolumes[i - 6] / totalBidVolume) * 100).toFixed(2)}%)
                    </Volume>
                  </OrderDetails>
                </>
              ) : null}
            </OrderRow>
          ))}
        </OrderBookTable>
      </OrderBookContainer>
    </>
  );
};

export default StockOrderBook;
