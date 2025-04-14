import StockListUI from "./StockListUI";

export default async function ServerStockList() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/home`, {
    cache: "no-store",
  });
  const data = await res.json();

  return <StockListUI data={data} />;
}
