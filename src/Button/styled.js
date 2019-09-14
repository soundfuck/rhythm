import styled from 'styled-components'

export const Button = styled.button`
  width: 100%;

  background: #8dffb3;
  color: #14862f;

  border: 1px solid hsl(140, 91%, 74%);
  border-radius: 50px;

  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.3px;

  padding: 16px 0;
  outline: none;
  ${props => props.playing && `
    background: #ff8e8e;
    color: #a03333;
    border: 1px solid #fba1a1;
  `}
`;

