import styled from "styled-components";

export const LoginContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  height: 100vh;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  background: white;
  border-radius: 10px;
  h1 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    align-items: center;
  }
  p {
    width: 90%;
    margin-top: 10px;
    text-align: right;

    display: flex;
    justify-content: flex-end;
    align-items: center; 
    gap: 2px; 
    color: var(--gray-700);
  } 
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--disabled-color);
  border-radius: 10px;
  font-size: 1rem;
  height: 3rem;
  text-align: left;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: var(--primary-color);
  color: white;
  font-size: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
`;

