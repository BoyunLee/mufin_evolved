import {
  LogoWrapper, StockChange, StockImage, StockItemBox,
  StockLeft, StockLink, StockName, StockPrice, StockRight,
} from "@/app/components/home/StockList.Styled";
import { StockListResponseDto } from "@/application/usecases/home/dtos/StockListResponseDto";

export default function StockListUI({ data }: { data: StockListResponseDto[] }) {
  return (
    <StockItemBox>
      {data.map(({ index, stockCode, stockImage, stockId, stockName, currentPrice }) => {
        const isPositive = !currentPrice.prdyVrss.startsWith("-");
        const formattedVrss = isPositive
          ? `+${Number(currentPrice.prdyVrss).toLocaleString()}`
          : Number(currentPrice.prdyVrss).toLocaleString();
        const formattedCtrt = isPositive
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
              <StockPrice>{Number(currentPrice.stckPrpr).toLocaleString()} 원</StockPrice>
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
