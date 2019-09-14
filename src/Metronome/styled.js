import styled from 'styled-components'

export const MetronomeInput = styled.input`
-webkit-appearance: none !important;
  max-height: 2px;
  position: relative;
  border-radius: 2px;
  width: 100%;
  margin: 24px 0;
  background: #d2d2d2;
  outline: none;

  ::-webkit-slider-thumb {
    position: relative;
    top: -1px;
    -webkit-appearance: none;
    border: 1px solid #b5b5b5;
    height: 32px;
    width: 32px;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
    box-shadow: 0 0.0625em 0.125em rgba(0, 0, 0, 0.15);
  }
`;
