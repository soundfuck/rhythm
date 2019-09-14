import React from 'react';

import { Button } from './styled';

const StartStopButton = ({ startStop, playing }) => (
  <Button onClick={startStop} playing={playing}>
    {playing ? 'Stop' : 'Start'}
  </Button>
);

export default StartStopButton;
