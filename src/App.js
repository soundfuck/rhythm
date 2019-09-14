import React, { Component } from 'react';

import Metronome from './Metronome/Metronome';
import CardsValuesField from './CardsValuesField/CardsValuesField';
import TimeSignatureField from './TimeSignatureField/TimeSignatureField';
import Cards from './Cards/Cards';
import StartStopButton from './Button/Button';

import click1 from './assets/sounds/click1.wav';
import click2 from './assets/sounds/click2.wav';

import {
  Outer,
  Container,
  BPM,
  Label
} from './styled';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      bpm: 120,
      clicksCount: 0,

      cards: [],
      cardsValues: 'a, b, c, d, e',
      cardsCount: 0,


      clicksBeforeNextValue: 1,
    }
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  changeClicksBeforeNextValue = (newValue) => {
    this.setState({ clicksBeforeNextValue: newValue });
  }

  onCardsValuesChange = (e) => {
    this.setState({ cardsValues: e.target.value });
  }

  onBpmChange = (e) => {
    const { playing } = this.state;
    const bpm = e.target.value;

    if (playing) {
      // Stop the old timer and start a new one
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      // Set the new BPM, and reset the beat counter
      this.setState({
        clicksCount: 0,
        bpm
      });
    } else {
      this.setState({ bpm });
    }
  }

  getCards = () => {
    const { cardsValues } = this.state;
    const cards = cardsValues.split(',');
    return cards;
  }

  playClick = () => {
    const {
      clicksCount,
      cardsCount,
      clicksBeforeNextValue,
    } = this.state;

    // Get Cards
    const cards = this.getCards();

    let newClicksCount = clicksCount + 1;
    let newCardsCount = cardsCount;
    // eslint-disable-next-line eqeqeq
    if (newClicksCount == clicksBeforeNextValue) {
      // Reset clicks
      newClicksCount = 0;
      this.click2.play();
      if (cardsCount === cards.length - 1) {
        // If last card reset count
        newCardsCount = 0;
        // document.getElementById("cards-container").scrollLeft = 0;
        document.getElementById('cards-container').scrollTo({
          left: 0,
          behavior: 'auto'
        });
      } else {
        // Else jump to next card
        newCardsCount += 1;
        // document.getElementById("cards-container").scrollLeft = 191 * newCardsCount;
        document.getElementById('cards-container').scrollTo({
          left: 192 * newCardsCount,
          behavior: 'smooth'
        });
      }
    } else {
      this.click1.play();
    }

    this.setState({
      clicksCount: newClicksCount,
      cardsCount: newCardsCount
    });
  }

  startStop = () => {
    const { playing, bpm } = this.state;
    if (playing) {
      clearInterval(this.timer);
      document.getElementById('cards-container').scrollTo({
        left: 0,
        behavior: 'auto'
      });
      this.setState({
        clicksCount: 0,
        cardsCount: 0,
        playing: false
      });
    } else {
      this.timer = setInterval(
        this.playClick, (60 / bpm) * 1000
      );

      this.setState({
        clicksCount: 0,
        cardsCount: 0,
        playing: true
      }, this.playClick)
    }
  } 

  render() {
    const {
      bpm,
      cardsCount,
      cardsValues,
      playing,
      clicksBeforeNextValue
    } = this.state;
    const cards = this.getCards();

    return (
      <Outer>
        <Container>

          <BPM>
            {`BPM: `}
            <span>{bpm}</span>
          </BPM>
          <Metronome
            bpm={bpm}
            playing={playing}
            onChange={this.onBpmChange}
          />

          <Label>
            Type values separated by comma
          </Label>
          <CardsValuesField
            value={cardsValues}
            onChange={this.onCardsValuesChange}
          />

          <Label>
            Specify clicks before card change
          </Label>
          <TimeSignatureField
            value={clicksBeforeNextValue}
            onChange={this.changeClicksBeforeNextValue}
          />

          <Cards
            cards={[...cards, cards[0]]}
            count={cardsCount}
          />

          <StartStopButton
            startStop={this.startStop}
            playing={playing}
          />

        </Container>
      </Outer>
    );
  }
}
