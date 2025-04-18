
import { CategoryContainer } from "@/app/(anon)/category/components/Category.Styled";
import StockList from "@/app/components/home/StockList";

interface CategoryProps {
  categoryId: string; // 부모에서 이미 문자열로 확정해서 넘겨줌
}
export default async function Category({ categoryId }: CategoryProps) {

  return (
    <CategoryContainer>
      <StockList categoryId={categoryId} />
    </CategoryContainer>
  );  
}
