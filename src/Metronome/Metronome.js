import React, {Component} from 'react';
import { MetronomeInput } from './styled'

class Metronome extends Component {

  render(){
    const { bpm, onChange } = this.props;

    return (
      <MetronomeInput
        type='range'
        min='10'
        max='230'
        value={bpm}
        onChange={onChange}
      />
    )
  }
}

export default Metronome
