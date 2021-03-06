import styled from 'styled-components';

export const Form = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #f8f0df;
  border-radius: 5px;
`;

export const Title = styled.p`
  margin: 30px auto 20px auto;
  font-size: 36px;
`;

export const Label = styled.label`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  height: 80px;
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
  margin-top: auto;
  margin-bottom: 5px;
  background: #ededed;
  transition: background 0.6s ease-in-out;
  &:focus,
  &:hover {
    outline: none;
    background: white;
  }
`;

export const Button = styled.button`
  width: 100px;
  margin: 0 auto;
  border: none;
  color: white;
  font-weight: 700;
  border-radius: 5px;
  cursor: pointer;
  background: #4b6587;
  height: 40px;
  margin-top: 20px;
`;

export const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: #99ccff;
  font-size: 12px;
`;
