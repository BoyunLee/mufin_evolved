import Image from "next/image";
import { SearchBar } from "@/app/components/search/SearchBar";
import { Container, TopSection, ImageWrapper, InvestmentSection, InvestmentHeader, TitleBox, } from "@/app/components/home/Home.Styled";
import ServerStockList from "@/app/components/home/ServerStockList";
import StockCategory from "@/app/components/home/StockCategory";
import HomeQuiz from "@/app/components/home/HomeQuiz";

export default function Home() {
  return (
    <Container>
      <TopSection>
        <ImageWrapper>
          <Image
            src="/character.png"
            alt="character"
            width={135}
            height={136}
            priority
          />
        </ImageWrapper>
        <HomeQuiz />
      </TopSection>
      <InvestmentSection>
        <InvestmentHeader>
          <h2>모의 투자</h2>
          <p>모의투자로 투자 감각을 키워보세요</p>
        </InvestmentHeader>
        <SearchBar />
        <TitleBox>인기종목</TitleBox>
        <ServerStockList />
        <TitleBox>카테고리로 보기</TitleBox>
        <StockCategory /> {/* 카테고리 리스트*/}
      </InvestmentSection>
    </Container>
  );
}
