import React, {Component} from 'react';
import cx from 'classnames';
import data from './data';
import './App.css';

const X_KEY = 88;
const N_KEY = 78;
const R_KEY = 82;

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
        if (this.state.strikes < 3) {
          document.getElementById('ff-strike').play();
        }

        this.setState(prev => ({
          strikes: ++prev.strikes,
        }));
      }

      if (e.which >= 48 && e.which <= 57 && !(document.activeElement instanceof HTMLInputElement)) {
        const number = Number(String.fromCharCode(e.keyCode))
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

  componentDidUpdate() {
    if (this.state.strikes > 3) {
      this.setState({strikes: 0});
    }
  }

  addToTeam1 = e => {
    e.preventDefault();

    document.getElementById('ff-bankroll').play();

    this.setState(prev => ({
      team1Points: prev.team1Points + Number(this.team1.value),
    }));
  };

  addToTeam2 = e => {
    e.preventDefault();

    document.getElementById('ff-bankroll').play();

    this.setState(prev => ({
      team2Points: prev.team2Points + Number(this.team2.value),
    }));
  };

  render() {
    const {question, answers} = data[this.state.round];

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
                    {answers[i].answer} ({answers[i].points})
                  </div>
                </div>
              )}
            </div>

            <div className="App__panel2">
              {answers.slice(5, 9).map((answer, i) =>
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
                    {answers[i + 5].answer} ({answers[i + 5].points})
                  </div>
                </div>
              )}

              {answers.length >= 10 && (
                <div
                  key={10}
                  className={cx(
                    'App__panel',
                    this.state.flippedCards.includes(0) &&
                    'App__panel--flipped'
                  )}
                >
                  <div className="App__face App__face--front">10</div>
                  <div className="App__face App__face--back">
                    {answers[10].answer} ({answers[10].points})
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="App__footer">
          <div style={{position: 'absolute', bottom: 70, fontSize: 18}}>
            <form onSubmit={this.addToTeam1}>
              <label>Team 1:</label>&nbsp;<input type="text" ref={node => this.team1 = node} placeholder="points" />
            </form>
            <form onSubmit={this.addToTeam2}>
              <label>Team 2:</label>&nbsp;<input type="text" ref={node => this.team2 = node} placeholder="points" />
            </form>
          </div>
          <div className="App__team1-points">
            Team 1: {this.state.team1Points}
          </div>
          <div className="App__divider" />
          <div className="App__team2-points">
            Team 2: {this.state.team2Points}
          </div>
        </div>

        <audio src="ff-strike.wav" type="audio/wav" id="ff-strike" />
        <audio src="ff-clang.wav" type="audio/wav" id="ff-clang" />
        <audio src="ff-bankroll.wav" type="audio/wav" id="ff-bankroll" />
      </div>
    );
  }
}

export default App;
