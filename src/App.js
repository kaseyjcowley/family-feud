import React, {Component} from 'react';
import data from './data';
import './App.css';
import {
  Container,
  TotalPoints,
  Panel,
  Panels,
  Board,
  Strikes,
  Strike,
  Question,
  Header,
  Round,
  Points,
  Divider,
  GlobalStyle,
} from './components/UI';

const X_KEY = 88;
const N_KEY = 78;
const R_KEY = 82;
const MAX_STRIKES = 3;

class App extends Component {
  state = {
    round: 1,
    strikes: 0,
    team1Points: 0,
    team2Points: 0,
    earnedPoints: 0,
    flippedCards: [1],
  };

  componentDidMount() {
    document.addEventListener('keydown', e => {
      if (e.which === X_KEY) {
        if (this.state.strikes < 3) {
          document.getElementById('ff-strike').play();
        }

        this.setState(prev => ({
          strikes: ++prev.strikes % (MAX_STRIKES + 1),
        }));
      }

      if (
        e.which >= 48 &&
        e.which <= 57 &&
        !(document.activeElement instanceof HTMLInputElement)
      ) {
        const number = Number(String.fromCharCode(e.keyCode));
        const {answers} = data[this.state.round];
        const answerIndex = number === 0 ? 10 : number - 1;

        document.getElementById('ff-clang').play();

        this.setState(prev => ({
          flippedCards: prev.flippedCards.concat(number),
          earnedPoints: prev.earnedPoints + answers[answerIndex].points,
        }));
      }

      if (e.which === R_KEY) {
        this.setState({
          strikes: 0,
          flippedCards: [],
          earnedPoints: 0,
        });
      }

      if (e.which === N_KEY && this.state.round < 20) {
        this.setState(prev => ({
          round: ++prev.round % data.length,
          strikes: 0,
          flippedCards: [],
          earnedPoints: 0,
        }));
      }
    });
  }

  render() {
    const {question, answers} = data[this.state.round - 1];

    return (
      <Container>
        <GlobalStyle />
        <Header>
          <Round>
            Round {this.state.round}
            <Points>
              Team 1: {this.state.team1Points}
              <Divider />
              Team 2: {this.state.team2Points}
            </Points>
          </Round>

          <Question>{question}</Question>

          <Strikes>
            {[1, 2, 3].map(totalStrikes => (
              <Strike
                key={totalStrikes}
                red={this.state.strikes >= totalStrikes}
              >
                X
              </Strike>
            ))}
          </Strikes>
        </Header>

        <Board>
          <TotalPoints>{this.state.earnedPoints}</TotalPoints>

          <Panels>
            {answers.slice(0, 5).map((answer, i) => (
              <Panel key={i} flipped={this.state.flippedCards.includes(i + 1)}>
                <Panel.Front>{i + 1}</Panel.Front>
                <Panel.Back>
                  <Panel.Answer>{answers[i].answer}</Panel.Answer>
                  <Panel.Points>{answers[i].points}</Panel.Points>
                </Panel.Back>
              </Panel>
            ))}

            {answers.slice(5, 10).map((answer, i) => (
              <Panel key={i} flipped={this.state.flippedCards.includes(i + 6)}>
                <Panel.Front>{i + 6}</Panel.Front>
                <Panel.Back>{answers[i + 6].answer}</Panel.Back>
              </Panel>
            ))}
          </Panels>
        </Board>

        <audio src="ff-strike.wav" type="audio/wav" id="ff-strike" />
        <audio src="ff-clang.wav" type="audio/wav" id="ff-clang" />
        <audio src="ff-bankroll.wav" type="audio/wav" id="ff-bankroll" />
      </Container>
    );
  }
}

export default App;
