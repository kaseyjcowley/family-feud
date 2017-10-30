import React, {Component} from 'react';
import cx from 'classnames';
import data from './data';
import './App.css';

const X_KEY = 88;

class App extends Component {
  state = {
    round: 0,
    strikes: 0,
    team1Points: 0,
    team2Points: 0,
    earnedPoints: 0,
    flippedCards: [],
  };

  componentDidMount() {
    document.addEventListener('keydown', e => {
      if (e.which === X_KEY) {
        this.setState(prev => ({
          strikes: ++prev.strikes,
        }));
      }

      if (e.which >= 48 && e.which <= 57) {
        this.setState(prev => ({
          flippedCards: prev.flippedCards.concat(
            Number(String.fromCharCode(e.keyCode))
          ),
        }));
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.state.strikes > 3) {
      this.setState({strikes: 0});
    }
  }

  render() {
    const {question, answers} = data[this.state.round];

    console.log(this.state.flippedCards);

    return (
      <div className="App">
        <div className="App__header">
          <div className="App__round">
            Round {this.state.round + 1}
          </div>
          <div className="App__strikes">
            <div
              className={cx(
                'App__strike',
                this.state.strikes >= 1 && 'App__strike--strike'
              )}
            >
              X
            </div>
            <div
              className={cx(
                'App__strike',
                this.state.strikes >= 2 && 'App__strike--strike'
              )}
            >
              X
            </div>
            <div
              className={cx(
                'App__strike',
                this.state.strikes >= 3 && 'App__strike--strike'
              )}
            >
              X
            </div>
          </div>
        </div>

        <div className="App__question">
          {question}
        </div>

        <div className="App__board">
          <div className="App__points">
            {this.state.earnedPoints}
          </div>

          <div className="App__panels">
            <div className="App__panel1">
              {answers.slice(0, 5).map((answer, i) =>
                <div
                  key={i}
                  className={cx(
                    'App__panel',
                    this.state.flippedCards.includes(i + 1) &&
                      'App__panel--flipped'
                  )}
                >
                  <div className="App__face App__face--front">
                    {i + 1}
                  </div>
                  <div className="App__face App__face--back">
                    {answers[i].answer}
                  </div>
                </div>
              )}
            </div>

            <div className="App__panel2">
              {answers.slice(5, 10).map((answer, i) =>
                <div
                  key={i}
                  className={cx(
                    'App__panel',
                    this.state.flippedCards.includes(i + 6) &&
                      'App__panel--flipped'
                  )}
                >
                  <div className="App__face App__face--front">
                    {i + 6}
                  </div>
                  <div className="App__face App__face--back">
                    {answers[i + 6].answer}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="App__footer">
          <div className="App__team1-points">
            Team 1: {this.state.team1Points}
          </div>
          <div className="App__divider" />
          <div className="App__team2-points">
            Team 2: {this.state.team2Points}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
