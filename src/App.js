import React, { Component } from 'react';

import Metronome from './Metronome/Metronome';
import CardsValuesField from './CardsValuesField/CardsValuesField';
import TimeSignatureField from './TimeSignatureField/TimeSignatureField';
import Cards from './Cards/Cards';
import StartStopButton from './Button/Button';

import click1 from './assets/sounds/click1.wav';
import click2 from './assets/sounds/click2.wav';

import { shuffle } from './helper';

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
      bpm: 180,
      clicksCount: 0,

      cards: [],
      cardsValues:
        `F♯, B♭, G, D♭, E, A♯, F♯, B♭, G, D♭, E, A♯ F♯, B♭, G, D♭, E,
        F♯, B♭, G, D♭, E, A♯, F♯, B♭, G, D♭, E, A♯ F♯, B♭, G, D♭, E,
        F♯, B♭, G, D♭, E, A♯, F♯, B♭, G, D♭, E, A♯ F♯, B♭, G, D♭, E,
        F♯, B♭, G, D♭, E, A♯, F♯, B♭, G, D♭, E, A♯ F♯, B♭, G, D♭, E,
        F♯, B♭, G, D♭, E, A♯, F♯, B♭, G, D♭, E, A♯ F♯, B♭, G, D♭, E`
      ,
      // cardsValues: 'a,b,c,d,e,d,g,o',
      cardsCount: 0,

      clicksBeforeNextValue: 2,
    }
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  componentDidMount() {
    this.getCards();
  }

  changeClicksBeforeNextValue = (newValue) => {
    this.setState({ clicksBeforeNextValue: newValue });
  }

  onCardsValuesChange = (e) => {
    this.setState({ cardsValues: e.target.value }, this.getCards);
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
    const cards = shuffle(cardsValues.split(','));
    this.setState({ cards });
  }

  playClick = () => {
    const {
      clicksCount,
      cardsCount,
      clicksBeforeNextValue,
      cards
    } = this.state;

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
        document.getElementById("cards-container").scrollLeft = 0;
      } else {
        // Else jump to next card
        newCardsCount += 1;
        const newCard = document.getElementsByClassName('card')[0];
        const cardWidth = newCard.offsetWidth;
        document.getElementById("cards-container").scrollLeft = cardWidth * newCardsCount;
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
      clicksBeforeNextValue,
      cards,
    } = this.state;

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
            Values, separated by coma (eg G, F♯, B♭)
          </Label>
          <CardsValuesField
            value={cardsValues}
            onChange={this.onCardsValuesChange}
          />

          <Label>
            Change card on every {clicksBeforeNextValue} click
          </Label>
          <TimeSignatureField
            value={clicksBeforeNextValue}
            onChange={this.changeClicksBeforeNextValue}
          />

          <Cards
            cards={[...cards, cards[0], cards[1]]}
            count={cardsCount}
          />

          <StartStopButton
            startStop={() => this.startStop()}
            playing={playing}
          />

        </Container>
      </Outer>
    );
  }
}
