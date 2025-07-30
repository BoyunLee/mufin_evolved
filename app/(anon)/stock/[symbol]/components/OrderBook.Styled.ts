import styled from "styled-components";

export const OrderBookContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.75rem 0.9375rem;
  margin-left: 0.625rem;
  margin-top: auto;
  display: flex; 
  flex-direction: column; 
  flex-grow: 1; 
`;

export const OrderBookTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.78rem;
  margin-top: auto;
  margin-bottom: auto;
`;

export const OrderRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Price = styled.span`
  width: 6rem;
  text-align: right;
  font-size: 0.75rem;
  padding-right: 0.625rem;
`;

export const OrderDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  position: relative;
  flex: 1;
  padding-left: 0.625rem;
  border-left: 1px solid var(--disabled-color);
`;

export const OrderBar = styled.div.attrs<{ width: number; $className: string }>(props => ({
  style: {
    width: `${props.width}%`,
    backgroundColor: props.$className === "ask" ? "#abdfdf" : "#ffb3c2",
  },
}))`
  height: 0.9rem;
  border-radius: 0.2rem;
`;

export const Volume = styled.span<{ $className: "ask" | "bid" }>`
  font-size: 0.75rem;
  color: ${({ $className }) => ($className === "ask" ? "var(--primary-color)" : "var(--second-color)")};
`;