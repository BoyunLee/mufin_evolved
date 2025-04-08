"use client";

import { useEffect, useState } from "react";
import { StockListResponseDto } from "@/application/usecases/home/dtos/StockListResponseDto";
import {
  LogoWrapper, StockChange, StockImage, StockItemBox,
  StockLeft, StockLink, StockName, StockPrice, StockRight,
} from "@/app/components/home/StockList.Styled";

interface StockListProps {
  categoryId?: string;
}

export default function StockList({ categoryId }: StockListProps) {
  const [stocks, setStocks] = useState<StockListResponseDto[]>([]);

  const path = categoryId ? `/api/category?c=${categoryId}` : `/api/home`;

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await fetch(path, { cache: "no-store" });
        const data = await res.json();
        setStocks(data);
      } catch (error) {
        console.error("fetch error", error);
      }
    };
    fetchStocks();
  }, [path]);

  return (
    <StockItemBox>
      {stocks.length > 0 &&
        stocks.map(({ index, stockCode, stockImage, stockId, stockName, currentPrice }) => {
          const isPositive = !currentPrice.prdyVrss.startsWith("-");
          const formattedVrss =
            currentPrice.prdyVrss === "0"
              ? "0"
              : isPositive
              ? `+${Number(currentPrice.prdyVrss).toLocaleString()}`
              : Number(currentPrice.prdyVrss).toLocaleString();

          const formattedCtrt =
            currentPrice.prdyCtrt === "0"
              ? "0%"
              : isPositive
              ? `+${currentPrice.prdyCtrt}%`
              : `${currentPrice.prdyCtrt}%`;

          return (
            <StockLink href={`/stock/${stockCode}`} key={stockId}>
              <StockLeft>
                {index && <span>{index}.</span>}
                <LogoWrapper>
                  <StockImage
                    src={`/stock/${stockImage || "DEFAULT"}.png`}
                    alt={stockName}
                    width={40}
                    height={40}
                  />
                </LogoWrapper>
                <StockName>{stockName}</StockName>
              </StockLeft>
              <StockRight>
                <StockPrice>
                  {Number(currentPrice.stckPrpr).toLocaleString()} 원
                </StockPrice>
                <StockChange $isPositive={isPositive}>
                  {formattedVrss}원 ({formattedCtrt})
                </StockChange>
              </StockRight>
            </StockLink>
          );
        })}
    </StockItemBox>
  );
}
