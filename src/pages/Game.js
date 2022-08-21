import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Header from '../component/Header';
import { playerScore, playerHits } from '../redux/actions';

const correctAnswer = 'correct-answer btn btn-success';

class Game extends React.Component {
  state = {
    contador: 0,
    correct: '',
    wrong: '',
    timer: 31,
    disabled: false,
    score: 0,
    hitCounter: 0,
    activateNext: false,
    list: [],
    playersScore: [],
    activatePlayer: true,
  }

  componentDidMount() {
    this.handleTimer();
    const ONE_SECOND = 1000;
    setInterval(this.handleTimer, ONE_SECOND);
    this.setState({ list: this.randomNumber() });
  }

  componentDidUpdate() {
    const { activatePlayer } = this.state;
    if (activatePlayer === true) {
      this.handlePlayers();
    }
  }

    handlePlayers = () => {
      this.setState((prevState) => ({
        playersScore: [...prevState.playersScore, {
          nome: localStorage.getItem('nome'),
          imagem: localStorage.getItem('imagem'),
          score: localStorage.getItem('score'),
        }],
        activatePlayer: false,
      }));
    }

    handleTimer = () => {
      const { timer } = this.state;
      const ZERO_SECOND = 0;
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      if (timer === ZERO_SECOND) {
        this.setState({ timer: 30, disabled: true });
      }
    }

  countIndex = () => {
    const { contador } = this.state;
    const { history } = this.props;
    const quatro = 4;
    if (contador < quatro) {
      this.setState((prevState) => ({
        contador: prevState.contador + 1,
        wrong: '',
        correct: '',
        disabled: false,
        timer: 30,
        list: this.randomNumber(),
      }));
    } else {
      this.setState({ contador: 4, list: this.randomNumber() },
        history.push('/feedback'));
    }
  }

  diffFunc = () => {
    const { questions } = this.props;
    const { contador } = this.state;
    const three = 3;
    if (questions[contador].difficulty === 'easy') {
      return 1;
    }
    if (questions[contador].difficulty === 'medium') {
      return 2;
    }
    if (questions[contador].difficulty === 'hard') {
      return three;
    }
  }

  changeClass = (event) => {
    const { timer } = this.state;
    const { dispatch } = this.props;
    const difficulty = this.diffFunc();
    const ten = 10;
    this.setState({ correct: correctAnswer,
      wrong: 'wrong-answer btn btn-danger',
      activateNext: true,
      activatePlayer: true,
      disabled: true });
    if (event.target.id === correctAnswer) {
      this.setState((previous) => (
        dispatch(playerScore((previous.score + (ten + (timer * difficulty)))))
        && dispatch(playerHits((previous.hitCounter + 1)))
      && { score: previous.score + (ten + (timer * difficulty)),
        disabled: true,
        hitCounter: previous.hitCounter + 1,
      }));
    }
  }

  randomNumber = () => {
    // https://www.horadecodar.com.br/2020/10/26/gerar-varios-numeros-aleatorios-sem-repeticao-em-javascript/
    const maxNumbers = 4;
    const list = [];
    for (let i = 0; i < maxNumbers; i += 1) {
      list[i] = i + 1;
    }
    let randomNumber;
    let tmp;
    for (let i = list.length; i;) {
      randomNumber = Math.floor(Math.random() * (i -= 1) || 0);
      tmp = list[randomNumber];
      // troca o número aleatório pelo atual
      list[randomNumber] = list[i];
      // troca o atual pelo aleatório
      list[i] = tmp;
    }

    return list;
  }

  render() {
    const { questions } = this.props;
    const { contador, correct, wrong, timer,
      disabled, activateNext, list, playersScore } = this.state;
    const quests = questions.length > 0 && [questions[contador].correct_answer,
      questions[contador].incorrect_answers[0],
      questions[contador].incorrect_answers[1],
      questions[contador].incorrect_answers[2]];
    const { score } = this.state;
    localStorage.setItem('score', score);
    localStorage.setItem('newPlayerRankink', JSON
      .stringify(playersScore[playersScore.length - 1]));
    return (
      <div className="gamePai">
        <Header />
        { questions.length === 0 && <Redirect to="/" /> }
        { questions.length > 0 && (
          // {timer === 30 && (
          <div className="div-game">
            <div className="game-body shadow p-3 mb-5 rounded">
              <h1 data-testid="game-title">Game</h1>
              <p data-testid="question-category">{questions[contador].category}</p>
              <h2
                data-testid="question-text"
                className="question-text"
              >
                {questions[contador].question}
              </h2>
              <div data-testid="answer-options" className="answer-options">
                { quests && quests.map((_, index) => {
                  let testID = '';
                  let classe = '';
                  const item = quests[list[index] - 1];
                  if (item && item === questions[contador].correct_answer) {
                    testID = correctAnswer;
                    classe = correct;
                  } else {
                    testID = 'wrong-answer';
                    classe = wrong;
                  }
                  return (
                    item && (
                      <button
                        type="button"
                        key={ index }
                        onClick={ this.changeClass }
                        id={ testID }
                        data-testid={ testID }
                        className={ `btn btn-primary ${classe}` }
                        disabled={ disabled }
                      >
                        {item}
                      </button>
                    )
                  );
                }) }
              </div>
            </div>
            <div className="timerAndButton shadow p-3 mb-5 rounded">
              <p className="timer p-3 mb-5 rounded">{timer}</p>
              {activateNext && (
                <button
                  data-testid="btn-next"
                  type="button"
                  disabled={ !disabled }
                  onClick={ this.countIndex }
                  className="btn btn-light"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        // )}
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.api.questions,
});

Game.propTypes = {
  questions: PropTypes.oneOfType([PropTypes.array,
    PropTypes.string]).isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
