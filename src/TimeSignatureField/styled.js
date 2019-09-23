import styled from 'styled-components'

  // -webkit-appearance: textfield;
  // -moz-appearance: textfield;
  // appearance: textfield;


  // ::-webkit-inner-spin-button,
  // ::-webkit-outer-spin-button {
  //   -webkit-appearance: none;
  // }

export const Container = styled.div`
  border: 1px solid #d2d2d2;
  display: inline-flex;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }
`;

const Button = styled.button`
  outline:none;
  -webkit-appearance: none;
  background-color: transparent;
  border: none;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  margin: 0;
  position: relative;

  &::after,
  &::before {
    display: inline-block;
    position: absolute;
    content: '';
    width: 1rem;
    height: 2px;
    background-color: #212121;
    transform: translate(-50%, -50%);
  }
`;

export const Minus = styled(Button)`
`;

export const Plus = styled(Button)`
  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
`;

export const NumberInput = styled.input`
  max-width: 3rem;
  padding: .4rem;
  text-align: center;
  border: solid #d2d2d2;
  border-width: 0 1px;
  font-size: 1.2rem;
  height: 2.5rem;
  font-weight: 500;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none; 
    margin: 0; 
  }
`;
