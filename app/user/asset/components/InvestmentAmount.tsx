import {
  InvestmentSummary,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
} from "@/app/user/asset/components/InvestmentAmount.Styled";

interface Props {
  investmentAmount: number;
  totalProfit: number;
  totalProfitRate: number;
  cash: number;
}

const InvestmentAmount = ({
  investmentAmount,
  totalProfit,
  totalProfitRate,
  cash,
}: Props) => {
  return (
    <InvestmentSummary>
      <SummaryRow>
        <SummaryLabel>투자 금액</SummaryLabel>
        <SummaryValue>{investmentAmount.toLocaleString()}원</SummaryValue>
      </SummaryRow>

      <SummaryRow>
        <SummaryLabel>총 평가손익</SummaryLabel>
        <SummaryValue $isPositive={totalProfit >= 0}>
          {totalProfit >= 0 ? "+" : ""}
          {totalProfit.toLocaleString()}원 ({totalProfitRate.toFixed(2)}%)
        </SummaryValue>
      </SummaryRow>

      <SummaryRow>
        <SummaryLabel>예수금</SummaryLabel>
        <SummaryValue>{cash.toLocaleString()}원</SummaryValue>
      </SummaryRow>
    </InvestmentSummary>
  );
};

export default InvestmentAmount;
