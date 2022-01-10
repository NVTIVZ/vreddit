import styled from 'styled-components';

export const Form = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #35858b;
  border-radius: 5px;
`;

export const Title = styled.p`
  margin: 30px auto 20px auto;
  font-size: 36px;
  color: #aefeff;
`;

export const Label = styled.label`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  height: 75px;
  font-weight: 600;
`;
export const Text = styled.p`
  color: ${(props) => props.color || '#4d4d4d'};
  font-size: 12px;
`;

export const Input = styled.input`
  width: 350px;
  height: 35px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-top: auto;
`;

export const Button = styled.button`
  width: 100px;
  border: none;
  font-weight: 700;
  border-radius: 5px;
  cursor: pointer;
  background: #4fbdba;
  height: 40px;
  margin-top: 20px;
`;
