import Link from "next/link";
import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin: 0.75rem 0 10px;

    @media (max-width: 485px) {
        gap: 1.5rem;
    }

    @media (max-width: 390px) {
        gap: 1rem;
    }
`;


export const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

export const CategoryName = styled.span`
    font-size: var(--font-size-base);
    font-weight: bold;
    margin-top: 5px; /* 위 간격 조정 */
    cursor: default; 
`;

export const CategoryCard = styled(Link)<{ color: string }>`
    width: 6.5rem;
    height: 6.5rem;

    @media (max-width: 485px) {
        width: 6rem;
        height: 6rem;
    }

    @media (max-width: 380px) {
        width: 5rem;
        height: 5rem;
    }

    background-color: ${({ color }) => color};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    transition: filter 0.2s;

    &:hover {
        filter: brightness(90%);
    }
`;