import React from 'react';

import { CardsContainer, Card } from './styled';

const Cards = ({ cards, count }) => (
  <CardsContainer id="cards-container">
    {cards.map((card, index) => (
      <Card
        className="card"
        type={index === count ? 'main' : 'default'}
        key={index}
      >
        <span>{card}</span>
      </Card>
    ))}
  </CardsContainer>
);


export default Cards;
