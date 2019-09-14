import React from 'react';
import {
  Container,
  Minus,
  Plus,
  NumberInput
} from './styled';

const TimeSignatureField = ({
  value,
  onChange
}) => (
  <Container>
    <Minus onClick={() => onChange(Number(value) - 1)} />
    <NumberInput
      type="number"
      min="1"
      max="16"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <Plus onClick={() => onChange(Number(value) + 1)} />
  </Container>
);

export default TimeSignatureField;
