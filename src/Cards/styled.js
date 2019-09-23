import styled from 'styled-components'

// scroll-behavior: smooth;
export const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
  overflow-x: hidden;
  padding: 24px;
`;

// min-width: calc(50% - 12px);
export const Card = styled.div`

  font-size: 1.5rem;
  background: white;

  height: 150px;
  min-width: 52%;
  @media (min-width: 420px) {
    height: 240px;
  }
  @media (min-width: 720px) {
    height: 280px;
  }
  @media (min-width: 1000px) {
    height: 220px;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.15s cubic-bezier(.25,.8,.25,1);
  &:last-child {
      margin-right: 192px;
  }
  box-shadow: 0 0.0625em 0.125em rgba(0, 0, 0, 0.15);
  border-radius: 0.25em;
  ${props => props.main ?
  'box-shadow: 0 2px 5px rgba(0,0,0,0.12), 0 2px 5px rgba(0,0,0,0.16) !important;' :
  'box-shadow: 0 1px 2px rgba(0,0,0,0.3), 0 1px 1px rgba(0,0,0,0.12);'}
  ${props => {
    switch (props.type) {
      case 'main':
        return `
          opacity: 1;
          transform: scale(1);
          span {
            font-size: 1.8rem;
          }
        `
      default:
        return `
          opacity: 0.6;
          transform: scale(0.80);
          span {
            opacity: 0.5;
          }
        `
    }}
  }
`;
