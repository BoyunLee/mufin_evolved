import StockClientPage from "@/app/(anon)/stock/[symbol]/components/StockClient";

interface StockDetailProps {
  params: { symbol: string };
}

const StockDetailPage = async ({ params }: StockDetailProps) => {
  const { symbol } = await params; // 비동기적으로 params를 처리

  if (!symbol) {
    return <p>잘못된 요청입니다.</p>;
  }

  return (
    <StockClientPage
      symbol={symbol}
    />
  );
};

export default StockDetailPage;
