import React from 'react';
import { Textarea } from './styled';

const CardsValuesField = ({ value, onChange }) => (
  <Textarea
    value={value}
    onChange={onChange}
  />
);

export default CardsValuesField;
