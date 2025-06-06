"use client"
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const StockWrapper = styled.section`
    width: 100%;
    margin-bottom: 1rem;
    padding: 0 0.625rem;
`;

export const StockItemBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const StockLink = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    width: 100%;

    padding: 0.5rem;
    
    color: inherit;

    cursor: pointer;

    &:hover {
        background-color: var(--background-color);
    }
`;

export const StockInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const StockLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
`;

export const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 2.5rem;
    height: 2.5rem;

    border-radius: 50%;
    overflow: hidden;
`;

export const StockImage = styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const StockName = styled.div`
    display: flex;
    font-size: var(--font-size-lg);
    color: var(--black-color);
    font-weight: 500;
    flex-wrap: wrap;
    word-wrap: break-word;
`;


export const StockRight = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-end;

    text-align: end;
`;

export const StockPrice = styled.p`
    font-size: var(--font-size-lg);
    font-weight: bold;
    
    white-space: nowrap;
`;

export const StockChange = styled.p<{ $isPositive: boolean }>`
    font-size: var(--font-size-md);
    color: ${(props) => (props.$isPositive ?   "var(--second-color)" : "var(--primary-color)")};
`;